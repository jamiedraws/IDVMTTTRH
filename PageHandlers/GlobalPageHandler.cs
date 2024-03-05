using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Dtm.Framework.ClientSites.Web;
using Dtm.Framework.Models;
using Dtm.Framework.Services.DtmApi;
using IDVMTTTRH.PromoCodeHelper;

namespace IDVMTTTRH.PageHandlers
{
    public class GlobalPageHandler : PageHandler
    {

        #region " Overrides... "
        private readonly PromoCodeManager promoCodeManager = new PromoCodeManager();

        public override void PageLoaded(HttpRequestBase request, HttpResponseBase response)
        {
            // PROMO CODES ONLY ALLOWED ONE USE PER EMAIL
            var errors = new List<string>();

            if (DtmContext.PageCode == "ProcessPayment" && DtmContext.ShoppingCart.Where(s => PromoCodeItems.OneTimeOnlyPromoCodes.Contains(s.ProductCode)).Sum(s => s.Quantity) > 0)
            {
                var cardType = DtmContext.Order.CardType ?? string.Empty;
                var promoCode = PromoCodeItems.OneTimeOnlyPromoCodes.Where(p => DtmContext.ShoppingCart.Any(oi => oi.ProductCode == p)).FirstOrDefault();

                if (cardType.ToString().ToUpper() == "PAYPALEC" && promoCodeManager.IsDuplicateHouseholdOrder(out errors, promoCode, DtmContext.Order.Email))
                {
                    OrderManager.SetProductQuantity(promoCode, 0);
                    foreach (var error in errors)
                    {
                        AddModelStateError("PromoCode", error);
                    }

                    request.RequestContext.HttpContext.Session["HasOneTimePromoError"] = true;
                    Response.Redirect(DtmContext.Domain.FullDomainOfferVersionUrl("Checkout"));
                }
            }

            if (DtmContext.PageCode == "Confirmation" && DtmContext.Order.OrderItems.Where(oi => PromoCodeItems.OneTimeOnlyPromoCodes.Contains(oi.CachedProductInfo.ProductCode)).Sum(oi => oi.Quantity) > 0)
            {
                var promoCode = PromoCodeItems.OneTimeOnlyPromoCodes.Where(p => DtmContext.Order.OrderItems.Any(oi => oi.CachedProductInfo.ProductCode == p)).FirstOrDefault();
                if (!promoCodeManager.IsDuplicateHouseholdOrder(out errors, promoCode, DtmContext.Order.Email))
                {
                    promoCodeManager.AddHouseholdOrder(DtmContext.Order.OrderID);
                }
            }

            if(string.Equals(DtmContext.PageCode, "Checkout"))
            {
                var hasError = request.RequestContext.HttpContext.Session["HasOneTimePromoError"] as bool?;

                if(hasError.HasValue && hasError.Value)
                {
                    request.RequestContext.HttpContext.Session.Remove("HasOneTimePromoError");
                    foreach (var promo in PromoCodeItems.OneTimeOnlyPromoCodes)
                    {
                        OrderManager.SetProductQuantity(promo, 0);
                    }
                    AddModelStateError("PromoCode", "Promo Code Removed, only allowed for one time use per Email");
                }
            }
        }

        public override void PostValidate(ModelStateDictionary modelState)
        {
            base.PostValidate(modelState);

            if (string.Equals(DtmContext.PageCode, "Checkout", StringComparison.InvariantCultureIgnoreCase) && !string.Equals("PayPalEC", Form["OrderType"], StringComparison.InvariantCultureIgnoreCase))
            {
                var onePerEmailPromoQty = ActionItems.Where(data => PromoCodeItems.OneTimeOnlyPromoCodes.Contains(data.Key)).Sum(d => d.Value);
                var errors = new List<string>();
                var promoCode = PromoCodeItems.OneTimeOnlyPromoCodes.Where(p => ActionItems.Keys.Contains(p)).FirstOrDefault();
                if (onePerEmailPromoQty >= 1 && promoCodeManager.IsDuplicateHouseholdOrder(out errors, promoCode, Form["param_" + "Email"] ?? Form["Email"] ?? string.Empty))
                {
                    OrderManager.SetProductQuantity(promoCode, 0);
                    AddModelStateError("Form", "Promo Code Removed, only allowed for one time use per Email");
                }
            }

        }

        public override void OnProcessPromoCode(SafeDictionary postData)
        {
            var newPromoCode = Form["promoCode"] ?? "";

            if (!string.IsNullOrWhiteSpace(newPromoCode))
            {
                if (newPromoCode.ToUpper() == "TRIMPRO20")
                {
                    OrderManager.SetProductQuantity("TRIMPRO20", 1);
                }
                else if (newPromoCode.ToUpper() == "GROOM10")
                {
                    OrderManager.SetProductQuantity("GROOM10", 1);
                }
                else if (newPromoCode.ToUpper() == "OUTSIDERS10")
                {
                    OrderManager.SetProductQuantity("OUTSIDERS10", 1);
                }
                else
                {
                    OrderManager.SetProductQuantity("GROOM10", 0);
                    OrderManager.SetProductQuantity("TRIMPRO20", 0);
                    OrderManager.SetProductQuantity("OUTSIDERS10", 0);
                }
            }
        }

        public override void OnProcessCustomPromoCode(PromoCodeRule promoCodeAction, SafeDictionary postData) 
        {
            var promoCode = promoCodeAction.PromoCode;
            var validPromoItems = new List<string>();
            switch (promoCode) 
            {
                case "MT4TH":
                    {
                        validPromoItems.AddRange(new List<string>() { "ROVOR", "T2", "ST2" });
                        var discountedCartTotal = DtmContext.ShoppingCart.Where(sc => validPromoItems.Contains(sc.ProductCode)).Sum(sc => sc.Price * sc.Quantity);
                        var discount = -(discountedCartTotal * .2M);
                        OrderManager.SetProductQuantity(promoCode, 1);
                        DtmContext.ShoppingCart[promoCode].Price = discount;
                        var discountRounded = Math.Round((decimal)discount, 2, MidpointRounding.AwayFromZero);
                        Order.Items[promoCode].Price = discountRounded;
                        ViewData["promoCodeTarget"] = promoCode;
                        OrderManager.AddOrderCode(discountRounded.ToString(), promoCodeAction.PromoCode + "TransactionFee");

                        break;
                    }
                case "TRIM30":
                    {
                        validPromoItems.AddRange(new List<string>() { "T2" });
                        var discountedCartTotal = DtmContext.ShoppingCart.Where(sc => validPromoItems.Contains(sc.ProductCode)).Sum(sc => sc.Price * sc.Quantity);
                        var discount = -(discountedCartTotal * .3M);
                        OrderManager.SetProductQuantity(promoCode, 1);
                        DtmContext.ShoppingCart[promoCode].Price = discount;
                        var discountRounded = Math.Round((decimal)discount, 2, MidpointRounding.AwayFromZero);
                        Order.Items[promoCode].Price = discountRounded;
                        ViewData["promoCodeTarget"] = promoCode;
                        OrderManager.AddOrderCode(discountRounded.ToString(), promoCodeAction.PromoCode + "TransactionFee");

                        break;
                    }
                default:
                    break;
            }
        }

        public override bool OnValidatePromoCodeAction(PromoCodeRule promoCodeAction)
        {
            var excludedCodes = DtmContext.CampaignProducts.Where(cp => cp.ProductType == "Shipping" || cp.ProductType == "Promo")
                .Select(cp => cp.ProductCode)
                .ToList();
            var totalPrice = DtmContext.ShoppingCart.Where(x => !excludedCodes.Contains(x.ProductCode) && x.Price.HasValue).Sum(i => i.Price.Value * i.Quantity);
            bool validPromo = true;
            var hasValidProduct = false;
            var validPromoProducts = new List<string>();

            switch (promoCodeAction.PromoCode)
            {
                case "PRESDAY23":
                case "SPRING23":
                    if (totalPrice <= 50)
                    {
                        OrderManager.SetProductQuantity(promoCodeAction.ProductCode, 0);
                        AddModelStateError("PromoCode", "Your order must be more than $50 to use promo code "+promoCodeAction.ProductCode+".");
                        validPromo = false;
                    }
                    break;
                case "MT4TH":
                    validPromoProducts.AddRange(new List<string>() { "ROVOR", "T2", "ST2" });
                    hasValidProduct = DtmContext.ShoppingCart.Any(sc => validPromoProducts.Contains(sc.ProductCode));

                    if (!hasValidProduct)
                    {
                        OrderManager.SetProductQuantity(promoCodeAction.ProductCode, 0);
                        AddModelStateError("PromoCode", "Promo code MT4TH only valid with MicroTouch® Titanium® ROVOR™, MicroTouch® Titanium® Trim™, and MicroTouch® SOLO Titanium offers.");
                        validPromo = false;
                    }
                    break;
                case "TRIM30":
                    hasValidProduct = DtmContext.ShoppingCart.Any(sc => sc.ProductCode == "T2");

                    if (!hasValidProduct)
                    {
                        OrderManager.SetProductQuantity(promoCodeAction.ProductCode, 0);
                        AddModelStateError("PromoCode", "Promo code TRIM30 only valid with MicroTouch® Titanium® Trim™ offer.");
                        validPromo = false;
                    }
                    break;
                    break;
            }

            return validPromo;
        }

        public override void PostProcessPageActions()
        {


            //Checking for the pages code based on the main order pages array on line ten.
            if (DtmContext.Page.IsStartPageType)
            {
                OnProcessPromoCode(PostData);
                ApplyPromoCodeRules();


                if (DtmContext.Version == 1)
                {

                    if (DtmContext.ShoppingCart["T2"].Quantity > 0 && DtmContext.ShoppingCart["REPLACE"].Quantity > 0)
                    {
                        OrderManager.SetProductQuantity("SHIP", 1);
                        OrderManager.SetProductQuantity("SHIPP", 0);
                    }
                    else if (DtmContext.ShoppingCart["REPLACE"].Quantity > 0)
                    {
                        OrderManager.SetProductQuantity("SHIPP", 1);
                        OrderManager.SetProductQuantity("SHIP", 0);
                    }
                    else
                    {
                        OrderManager.SetProductQuantity("SHIPP", 0);
                        OrderManager.SetProductQuantity("SHIP", 0);
                    }
                }
                else if (DtmContext.Version >= 4)
                {
                    var excludedItems = new List<string>() { "ADDSHIP", "SHIP", "SHIPP" };
                    var totalPrice = DtmContext.ShoppingCart
                        .Where(i => !excludedItems.Contains(i.ProductCode))
                        .Sum(io => io.Quantity * io.Price);
                    var shippingFeeQuantity = (totalPrice >= 50) ? 0 : 1;
                    var freeShippingQuantity = (totalPrice >= 50) ? 1 : 0;
                    OrderManager.SetProductQuantity("SHIP", shippingFeeQuantity);

                    //OrderManager.SetProductQuantity("FRSHIP", freeShippingQuantity);
                    //if ((DtmContext.ShoppingCart["REPLACE"].Quantity > 0 || DtmContext.ShoppingCart["SREPLACE"].Quantity > 0)
                    //    && !(DtmContext.ShoppingCart["T2"].Quantity > 0 || DtmContext.ShoppingCart["ST2"].Quantity > 0 || DtmContext.ShoppingCart["MAX"].Quantity > 0))
                    //{
                    //    OrderManager.SetProductQuantity("SHIPP", 1);
                    //    OrderManager.SetProductQuantity("SHIP", 0);
                    //}
                    //else if (DtmContext.ShoppingCart["T2"].Quantity > 0 || DtmContext.ShoppingCart["ST2"].Quantity > 0 || DtmContext.ShoppingCart["MAX"].Quantity > 0)
                    //{
                    //    OrderManager.SetProductQuantity("SHIP", 1);
                    //    OrderManager.SetProductQuantity("SHIPP", 0);
                    //}
                    //else
                    //{
                    //    OrderManager.SetProductQuantity("SHIPP", 0);
                    //    OrderManager.SetProductQuantity("SHIP", 0);
                    //}

                    //if (totalPrice >= 50)
                    //{
                    //    OrderManager.SetProductQuantity("SHIPP", 0);
                    //    OrderManager.SetProductQuantity("SHIP", 0);
                    //}

                }

            }
        }
        #endregion
    }
}
