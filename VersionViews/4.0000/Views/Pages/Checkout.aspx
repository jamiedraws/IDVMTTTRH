<%@ Page Language="C#" MasterPageFile="~/VersionViews/4.0000/Views/Layouts/InternalLayout.master" Inherits="System.Web.Mvc.ViewPage<OrderPageViewData>" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server"></asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<%
    var subTotal = DtmContext.ShoppingCart.SubTotal.ToString("C");
    var shoppingCartItems = DtmContext.ShoppingCart.Items.Where(i => i.CampaignProduct.ProductTypeId == 1 || i.CampaignProduct.ProductTypeId == 2).ToList();
    var hasItems = (shoppingCartItems.Count() > 0) ? true : false;
    
    if (!hasItems)
    {
        var shoppingCartPageUrl = String.Format("/{0}/{1}/ShoppingCart{2}", DtmContext.OfferCode, DtmContext.Version, DtmContext.ApplicationExtension);
        Response.Redirect(shoppingCartPageUrl);
    }
%>
<main aria-labelledby="checkout-title" data-defer-event="load" class="defer defer--from-top view main section">
    <div id="account" class="view__anchor"></div>

    <div class="defer__progress view__in section__in">
        <div class="section__block checkout account account--checkout">
            <h1 id="checkout-title" class="checkout__banner">Checkout</h1>
            <form action="/<%=DtmContext.OfferCode %>/<%=DtmContext.Version %>/<%=DtmContext.PageCode %><%= DtmContext.ApplicationExtension %>" method="post">

                <%
                    var implementAccount = false;
                    
                    if (implementAccount) {
                %>
                <% if (Model.CurrentCustomer == null || Model.CurrentCustomer.StoreCustomerID == Guid.Empty) { %>
                    <div class="account__copy">
                        <h2 class="account__header">Account Information</h2>
                        <div>Already have an account? <a href="/<%= DtmContext.OfferCode %>/<%= DtmContext.Version %>/Account/Login" class="account__link">Login</a></div>
                    </div>
                <% } else { %>
                    <div class="account__copy">
                        <div class="account__header">Welcome back, <%= Model.CurrentCustomer.FirstName %></div>
                        <div>Sign into a different account? <a href="/<%= DtmContext.OfferCode %>/<%= DtmContext.Version %>/Account/LogOut" class="account__link">Logout</a></div>
                    </div>
                <% } } %>

                <div class="view form">
                    <div id="errors" class="view__anchor error_scrollTo"></div>
                    <div data-vse-scroll="custom" class="form__error c-brand--form vse">
                        <%= Html.ValidationSummary("The following errors have occurred:") %>
                    </div>
                </div>

                <div class="account__group">
                    <div class="account__checkout">
                        <div class="view__scroll checkout account__copy">

                            <%-- Order Review --%>
                            <h2 class="account__header">Review Your Order</h2>
                            <div class="c-brand--form order-table reviewTable">
                                <% Html.RenderPartial("OrderFormReviewTable"); %>
                            </div>
                            
                            <hr />

                            <% 
                                var promoCode = DtmContext.ShoppingCart.Where(sc => DtmContext.PromoCodeRules.Any(p => p.ProductCode == sc.ProductCode)).Select(sc => sc.ProductCode).FirstOrDefault();
                            %>
                            <%-- Promotional Code --%>
                            <div class="form message">
                                <div class="form__field-label form__field-button-label">
                                    <!-- // Promo Validation Message -->
                                    <div class="promo-message center-text top-margin" style="display:none;">
                                        <div class="container bg--white u-vw--100 no-margin">
                                            <i class="icon-checkmark"></i> <p id="promoMessage" class="message__in column-block no-margin">Thank you! Your promo code was applied.</p>
                                        </div>
                                    </div>
                                    <input type="text" name="promoCode" id="promoCode" placeholder="Enter Promo Code" class="form__field ddlPromo dtm__restyle" value="<%=promoCode ?? String.Empty %>">
                                    <label for="promoCode" class="message__group">
                                        <span class="message__label">Promotional Code</span>
                                    </label>
                                    <div class="message__group" role="alert">
                                        <span class="message__invalid">Please enter a valid promo code.</span>
                                        <span class="message__valid">Thank you!</span>
                                    </div>
                                    <button type="button" class="button button--second ddlPromoButton" onclick="_firstRun = false; handleCartChange();">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="account__form account__copy form message">
                        <fieldset class="account__copy">
                            <h2 class="account__header">Select Payment Type</h2>

                            <!-- Card Type -->
                            <div class="form__take-row form message">
                                <div class="payment payment--form">
                                    <div id="cc" class="payment__group"></div>
                                </div>
                                <%
                                    var cardTypeMessage = Html.ValidationMessageFor(m => m.CardType);
                                    var cardTypeIsInvalid = cardTypeMessage != null;
                                %>
                                <div id="CardTypeCt" class="form__field-label">
                                    <div class="form form--select">
                                        <div class="form__contain">
                                            <%= Html.DropDownList("CardType", new[]
                                                {
                                                    new SelectListItem { Text = "Visa", Value = "V"},
                                                    new SelectListItem { Text = "Mastercard", Value = "M"},
                                                    new SelectListItem { Text = "Discover", Value = "D"},
                                                    new SelectListItem { Text = "American Express", Value= "AX"}
                                                }, new { @class = "form__field dtm__restyle" })
                                            %>
                                            <span class="form__field form__button">
                                                <svg class="icon icon--combobox">
                                                    <use href="#icon-chevron"></use>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    <label class="message__group" for="CardType" role="alert">
                                        <span class="message__label">
                                            <span class="form__error">* </span>Card Type
                                        </span>
                                        <span class="message__invalid">
                                            <% if (cardTypeIsInvalid) { %>
                                                <%= cardTypeMessage %>
                                            <% } else { %>
                                                Please choose a card type.
                                            <% } %>
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div class="form__group"  id="paymentInformation">
                                <!-- Card Number -->
                                <div class="form__take-row form message">
                                    <%
                                        var cardNumberMessage = Html.ValidationMessageFor(m => m.CardNumber);
                                        var cardNumberIsInvalid = cardNumberMessage != null;
                                    %>
                                    <div class="form__field-label">
                                        <input type="tel" name="CardNumber" id="CardNumber" placeholder="Card Number" data-required="true" data-validationtype="card" class="dtm__restyle form__field <%= cardNumberIsInvalid ? "message__is-invalid" : string.Empty %>" value="<%= ViewData["CardNumber"] %>">
                                        <label for="CardNumber" class="message__label">
                                            <span class="form__error">* </span>Card Number
                                        </label>
                                        <span class="message__group" role="alert">
                                            <span class="message__invalid">
                                                <% if (cardNumberIsInvalid) { %>
                                                    <%= cardNumberMessage %>
                                                <% } else { %>
                                                    Please enter a valid card number.
                                                <% } %>
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                <!-- Card Expiration Month -->
                                <div class="form message">
                                    <%
                                        var cardExpirationMonthMessage = Html.ValidationMessageFor(m => m.CardExpirationMonth);
                                        var cardExpirationMonthIsInvalid = cardExpirationMonthMessage != null;
                                    %>
                                    <div class="form__field-label">
                                        <div class="form form--select">
                                            <div class="form__contain">
                                                <%= Html.CardExpirationMonth("CardExpirationMonth", new { @id="CardExpirationMonth", @class = "form__field dtm__restyle", @data_required="true", @data_validationtype="cardExp", @data_parent="CardExpirationCt" }) %>
                                                <span class="form__field form__button">
                                                    <svg class="icon icon--combobox">
                                                        <use href="#icon-chevron"></use>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                        <label for="CardExpirationMonth" class="message__label">
                                            <span class="form__error">* </span>Card Expiration Month
                                        </label>
                                        <span class="message__group" role="alert">
                                            <span class="message__invalid">
                                                <% if (cardExpirationMonthIsInvalid) { %>
                                                    <%= cardExpirationMonthMessage %>
                                                <% } else { %>
                                                    Please choose an expiration month.
                                                <% } %>
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                <!-- Card Expiration Year -->
                                <div class="form message">
                                    <%
                                        var cardExpirationYearMessage = Html.ValidationMessageFor(m => m.CardExpirationYear);
                                        var cardExpirationYearIsInvalid = cardExpirationYearMessage != null;
                                    %>
                                    <div class="form__field-label">
                                        <div class="form form--select">
                                            <div class="form__contain">
                                                <%= Html.NumericDropDown("CardExpirationYear", DateTime.Now.Year, DateTime.Now.Year + 10, ViewData["CardExpirationYear"], new { @id="CardExpirationYear", @class = "form__field dtm__restyle" }) %>
                                                <span class="form__field form__button">
                                                    <svg class="icon icon--combobox">
                                                        <use href="#icon-chevron"></use>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                        <label for="CardExpirationYear" class="message__label">
                                            <span class="form__error">* </span>Card Expiration Year
                                        </label>
                                        <span class="message__group" role="alert">
                                            <span class="message__invalid">
                                                <% if (cardExpirationYearIsInvalid) { %>
                                                    <%= cardExpirationYearMessage %>
                                                <% } else { %>
                                                    Please enter an expiration year.
                                                <% } %>
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                <!-- Card CVV2 -->
                                <div class="form__take-row form message">
                                    <%
                                        var cardCVV2Message = Html.ValidationMessageFor(m => m.CardCvv2);
                                        var cardCVV2IsInvalid = cardCVV2Message != null;
                                    %>
                                    <div class="form__field-label form__cvv">
                                        <input type="text" name="CardCvv2" id="CardCvv2" placeholder="CVV2" data-required="true" data-validationtype="cvv" class="dtm__restyle form__field <%= cardCVV2IsInvalid ? "message__is-invalid" : string.Empty %>" value="<%= ViewData["CardCvv2"] %>">
                                        <label for="CardCvv2" class="message__label">
                                            <span class="form__error">* </span>CVV2
                                        </label>
                                        <span class="message__group" role="alert">
                                            <span class="message__invalid">
                                                <% if (cardCVV2IsInvalid) { %>
                                                    <%= cardCVV2Message %>
                                                <% } else { %>
                                                    Please enter a CVV number.
                                                <% } %>
                                            </span>
                                        </span>
                                        <a data-fancybox="" data-type="ajax" href="/shared/cvv.html" title="Learn What is CVV2" id="cvv2" class="account__link form__link">What is CVV2?</a>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <%
                        ViewDataDictionary billingAddressViewData;
                        ViewDataDictionary shippingAddressViewData;
                        if (Model.CurrentCustomer != null && Model.CurrentCustomer.StoreCustomerID != Guid.Empty)
                        {
                            var addresses = Model.CurrentCustomer.StoreCustomerAddresses;

                            var billingAddress = addresses
                                .Where(a => a.IsDefault.HasValue
                                && a.IsDefault.Value
                                && (!a.IsShipping.HasValue || (a.IsShipping.HasValue && !a.IsShipping.Value)))
                                .FirstOrDefault()
                                ??
                                addresses
                                .Where(a => (!a.IsShipping.HasValue || (a.IsShipping.HasValue && !a.IsShipping.Value)))
                                .FirstOrDefault()
                                ?? new StoreCustomerAddress();

                            var shippingAddress = addresses
                                .Where(a => a.IsDefault.HasValue
                                && a.IsDefault.Value
                                && a.IsShipping.HasValue
                                && a.IsShipping.Value)
                                .FirstOrDefault()
                                ??
                                addresses
                                .Where(a => a.IsShipping.HasValue
                                && a.IsShipping.Value)
                                .FirstOrDefault()
                                ?? new StoreCustomerAddress();


                            billingAddressViewData = new ViewDataDictionary {
                                    {"BillingStreet", billingAddress.Street},
                                    {"BillingStreet2", billingAddress.Street2},
                                    { "BillingFirstName", billingAddress.FirstName },
                                    { "BillingLastName", billingAddress.LastName},
                                    { "BillingZip", billingAddress.Zip },
                                    { "BillingCountry", billingAddress.Country },
                                    { "Email", Model.CurrentCustomer.Email },
                                    { "Phone", Model.CurrentCustomer.Phone },
                                    { "BillingState", billingAddress.State },
                                    { "BillingCity", billingAddress.City }
                                };
                            shippingAddressViewData = new ViewDataDictionary {
                                    {"ShippingStreet", shippingAddress.Street},
                                    {"ShippingStreet2", shippingAddress.Street2},
                                    { "ShippingFirstName", shippingAddress.FirstName },
                                    { "ShippingLastName", shippingAddress.LastName},
                                    { "ShippingZip", shippingAddress.Zip },
                                    { "ShippingCountry", shippingAddress.Country },
                                    { "ShippingState", shippingAddress.State },
                                    { "ShippingCity", shippingAddress.City }
                                };

                        }
                        else
                        {
                            var order = Model.Order ?? new Order();

                            billingAddressViewData = new ViewDataDictionary {
                                    {"BillingStreet", order.BillingStreet},
                                    {"BillingStreet2", order.BillingStreet2},
                                    { "BillingFirstName", order.BillingFirstName },
                                    { "BillingLastName", order.BillingLastName},
                                    { "BillingZip", order.BillingZip },
                                    { "BillingCountry", order.BillingCountry },
                                    { "Email", order.Email },
                                    { "Phone", order.Phone },
                                    { "BillingState", order.BillingState },
                                    { "BillingCity", order.BillingCity }
                                };

                            shippingAddressViewData = new ViewDataDictionary {
                                    {"ShippingStreet", order.ShippingStreet},
                                    {"ShippingStreet2", order.ShippingStreet2},
                                    { "ShippingFirstName", order.ShippingFirstName },
                                    { "ShippingLastName", order.ShippingLastName},
                                    { "ShippingZip", order.ShippingZip },
                                    { "ShippingCountry", order.ShippingCountry},
                                    { "ShippingState", order.ShippingState},
                                    { "ShippingCity", order.ShippingCity }
                                };
                        }
                            Html.RenderPartial("BillingInfo", Model, billingAddressViewData);
                            Html.RenderPartial("ShippingInfo", Model, shippingAddressViewData);
                        %>


                        <div>

                            <div id="klaviyoDiv" class="klaviyo-fieldset" data-express-checkout-order-type="card paypal"></div>
                            
                            <button type="submit" id="AcceptOfferButton" name="acceptOffer" class="button button--second button--express-checkout orderbtn form_validation_required" data-state="card" data-order-type='{ "PayPalEC" : "Continue with PayPal", "CARD" : "Process Order" }'>
                                <span>Process Order</span>
                            </button>
                        </div>
                        <p id="disclaimerText" class="form__is-hidden">By clicking Process Order, your credit card will be charged the amount above. Click only once.</p>

                        <div class="checkout checkout--offer-details">
                            <% Html.RenderSnippet("OFFERDETAILS"); %>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    </div>
</main>

</asp:Content>
