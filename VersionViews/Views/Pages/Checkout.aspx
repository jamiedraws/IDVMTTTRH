<%@ Page Language="C#" MasterPageFile="~/VersionViews/2.0000/Views/Layouts/InternalLayout.master" Inherits="System.Web.Mvc.ViewPage<OrderPageViewData>" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server"></asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<main aria-labelledby="checkout-title" data-defer-event="load" class="defer defer--from-top view main section">
    <div id="account" class="view__anchor"></div>

    <div class="defer__progress view__in section__in">
        <div class="section__block checkout account account--checkout">
            <h1 id="checkout-title" class="checkout__banner">Checkout</h1>
            <form action="/<%=DtmContext.OfferCode %>/<%=DtmContext.Version %>/<%=DtmContext.PageCode %><%= DtmContext.ApplicationExtension %>" method="post">

                <div class="view">
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
                            <div class="order-table">
                                <%= Html.Partial("OrderFormReviewTable") %>
                            </div>
                            
                            <hr />

                            <%-- Promotional Code --%>
                            <div class="form message">
                                <div class="form__field-label form__field-button-label">
                                    <!-- // Promo Validation Message -->
                                    <div class="promo-message center-text top-margin" style="display:none;">
                                        <div class="container bg--white u-vw--100 no-margin">
                                            <i class="icon-checkmark"></i> <p id="promoMessage" class="message__in column-block no-margin">Thank you! Your promo code was applied.</p>
                                        </div>
                                    </div>
                                    <input type="text" name="promoCode" id="promoCode" placeholder="Enter Promo Code" class="form__field ddlPromo dtm__restyle" value="">
                                    <label class="message__group" aria-live="assertive">
                                        <span class="message__label">Promotional Code</span>
                                        <span class="message__invalid">Please enter a valid promo code.</span>
                                        <span class="message__valid">Thank you!</span>
                                    </label>
                                    <button type="button" class="button button--second ddlPromoButton" onclick="_firstRun = false; handleCartChange();">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="account__form form message account__copy">
                        <%-- Payment Type --%>
                        <h2 class="account__header">Select Payment Type</h2>

                        <div class="payment payment--form">
                            <div id="cc" class="payment__group"></div>
                        </div>
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
                                            <use href="#icon-chevron"></use></svg>
                                    </span>
                                </div>
                            </div>
                            <label class="message__group" aria-live="assertive">
                                <span class="message__label"><span class="form__error">* </span>Card Type</span>
                                <span class="message__invalid">Please choose a card type.</span>
                            </label>
                        </div>
                        <div id="paymentInformation" class="account__copy">
                            <div class="form__field-label">
                                <input type="tel" name="CardNumber" id="CardNumber" placeholder="#### #### #### ####" class="form__field dtm__restyle" data-required="true" data-validationtype="card" >
                                <div class="form__label message__group" aria-live="assertive">
                                    <span class="message__label"><span class="form__error">* </span>Card Number</span>
                                    <span class="message__invalid">Please enter a card number.</span>
                                </div>
                            </div>
                            <div class="form__field-label">
                                <fieldset class="account__group form__fieldset">
                                    <div class="form__field-label">
                                        <div class="form form--select">
                                            <div class="form__contain">
                                                <%= Html.CardExpirationMonth("CardExpirationMonth", new {@id="CardExpirationMonth" , @class = "form__field dtm__restyle", @data_required="true", @data_validationtype="cardExp", @data_parent="CardExpirationCt" }) %>
                                                <span class="form__field form__button">
                                                    <svg class="icon icon--combobox">
                                                        <use href="#icon-chevron"></use></svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form__field-label">
                                        <div class="form form--select">
                                            <div class="form__contain">
                                                <%= Html.NumericDropDown("CardExpirationYear", DateTime.Now.Year, DateTime.Now.Year + 10, ViewData["CardExpirationYear"], new { @id="CardExpirationYear" , @class = "form__field dtm__restyle" }) %>
                                                <span class="form__field form__button">
                                                    <svg class="icon icon--combobox">
                                                        <use href="#icon-chevron"></use></svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                                <div class="form__label message__group" aria-live="assertive">
                                    <span class="message__label"><span class="form__error">* </span>Expiration Date</span>
                                    <span class="message__invalid">Please choose a valid expiration date.</span>
                                </div>
                            </div>
                            <div class="form__field-label form__cvv">
                                <input type="tel" name="CardCvv2" id="CardCvv2" data-required="true" data-validationtype="cvv"  maxlength="5" placeholder="###" class="form__field dtm__restyle">
                                <div class="form__label message__group" aria-live="assertive">
                                    <span class="message__label"><span class="form__error">* </span>CVV</span>
                                    <span class="message__invalid">Please enter the CVV number.</span>
                                </div>
                                <a data-fancybox data-type="ajax" href="<%= LabelsManager.Labels["CVV2DisclaimerLink"] %>" title="<%= LabelsManager.Labels["CVV2DisclaimerLinkTitle"] %>" id="cvv2" class="account__link form__link">What is CVV2?</a>
                            </div>
                        </div>

                        <%
                            Html.RenderPartial("BillingInfo", Model);
                            Html.RenderPartial("ShippingInfo", Model);
                        %>

                        <div>
                            <button type="submit" data-state="card" class="button button--second button--express-checkout form_validation_required" id="AcceptOfferButton" name="acceptOffer" data-order-type='{ "PayPalEC" : "Continue with PayPal", "CARD" : "Process Order" }'>
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
