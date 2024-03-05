using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dtm.Framework.Base.Models;
using Dtm.Framework.ClientSites.Web;
using Dtm.Framework.ClientStores.Models;
using Dtm.Framework.Models;

namespace IDVMTTTRH.PromoCodeHelper
{
    public class PromoCodeViewer
    {
        /// <summary>
        /// Holds the current server time
        /// </summary>
        private readonly DateTime _currentTime = DateTime.Now;

        /// <summary>
        /// Contains the query string parameter to force-activate the promo code functionality on dtmstage.com
        /// </summary>
        private readonly string _promoCodeTest = HttpContext.Current.Request["testPromoCode"] ?? string.Empty;


        /// <summary>
        /// Contains the Promo code rule found for the promo code provided
        /// </summary>
        private readonly PromoCodeRule _promoCodeRule;

        /// <summary>
        /// Contains the user-provided promo code
        /// </summary>
        public readonly string PromoCode;

        /// <summary>
        /// Determines whether the promo code is currently active based on the current Eastern Standard Time
        /// </summary>
        public bool IsActive { 
            get {
                return (_promoCodeRule != null && _currentTime >= _promoCodeRule.StartDate && _currentTime <= _promoCodeRule.EndDate)
                 || (DtmContext.IsStage && _promoCodeTest.Equals(PromoCode));
            } 
        }

        /// <summary>
        /// Returns the promo product CampaignProductView type
        /// </summary>
        public CampaignProductView PromoProduct { 
            get {
                if (_promoCodeRule != null) {
                    return DtmContext.CampaignProducts.FirstOrDefault(cp => cp.ProductCode == _promoCodeRule.ProductCode)
                    ?? DtmContext.CampaignProducts.FirstOrDefault(cp => cp.ProductCode == _promoCodeRule.PromoCode)
                    ?? new CampaignProductView();
                }

                return new CampaignProductView();
            } 
        }

        /// <summary>
        /// Returns a list of product codes that are assigned to the promo code
        /// </summary>
        public List<string> ProductCodes {
            get
            {
                if (_promoCodeRule != null)
                {
                    var productCodes = PromoCodeItems.AllowedItems[_promoCodeRule.PromoCode];
                    if (!productCodes.Any())
                        productCodes = PromoCodeItems.AllowedItems[_promoCodeRule.ProductCode];

                    return productCodes;
                }

                return new List<string>();
            }
        }

        /// <summary>
        /// Takes a promo code string and syncrhonizes with the application's promo code rules. Other capabilities include accessing the promo CampaignProductView, retrieving the list of product codes that are assigned to the promo code, etc.
        /// </summary>
        /// <param name="promoCode"></param>
        public PromoCodeViewer(string promoCode = null)
        {
            PromoCode = promoCode ?? string.Empty;
            _promoCodeRule = DtmContext.PromoCodeRules.FirstOrDefault(r => r.PromoCode == promoCode);
        }

        /// <summary>
        /// Takes a product property name and attempts to return the value from the property that's assigned to the promo product
        /// </summary>
        /// <param name="propertyName"></param>
        /// <returns></returns>
        public string GetPropertyFromPromoProduct(string propertyName)
        {
            return PromoProduct.PropertyIndexer != null ? PromoProduct.PropertyIndexer[propertyName, string.Empty] : string.Empty;
        }
    }
}