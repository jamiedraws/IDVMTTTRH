<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<OrderPageViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>

<%-- Shipping Address --%>

<div class="account__copy form__checkbox-label">
     <input id="ShippingIsDifferentThanBilling" name="ShippingIsDifferentThanBilling" type="checkbox"  value="true">
  
        <label for="ShippingIsDifferentThanBilling" class="form__label">
            <span class="form__checkbox"></span>
            <span>Check if your shipping address is different than your billing address</span>
        </label>
    
    <div class="account__shipping account__copy form__expando shipping__required" id="shippingInformation">
        <h2 class="account__header">Shipping Address</h2>
        <fieldset class="account__group form__fieldset">
            <div class="form__field-label">
                <input type="text" name="ShippingFirstName" id="ShippingFirstName" data-required="true"  placeholder="First Name" data-pattern="^[A-z]+([A-z .,'-]*)?$" class="form__field shipping__required dtm__restyle shipping__field" value="<%= ViewData["ShippingFirstName"] %>" />
                <label class="message__group" aria-live="assertive">
                    <span class="message__label"><span class="form__error">* </span>First Name</span>
                    <span class="message__invalid">Please enter a first name.</span>
                </label>
            </div>
            <div class="form__field-label">
                <input type="text" name="ShippingLastName" id="ShippingLastName" data-required="true"  placeholder="Last Name" data-pattern="^[A-z]+([A-z .,'-]*)?$" class="form__field shipping__required dtm__restyle shipping__field" value="<%= ViewData["ShippingLastName"] %>">
                <label class="message__group" aria-live="assertive">
                    <span class="message__label"><span class="form__error">* </span>Last Name</span>
                    <span class="message__invalid">Please enter a last name.</span>
                </label>
            </div>
        </fieldset>
        <div class="form__field-label">
            <input type="text" name="ShippingStreet" id="ShippingStreet" placeholder="Address" data-required="true"  class="form__field shipping__required dtm__restyle shipping__field" value="<%= ViewData["ShippingStreet"] %>">
            <label class="message__group" aria-live="assertive">
                <span class="message__label"><span class="form__error">* </span>Address</span>
                <span class="message__invalid">Please enter an address.</span>
            </label>
        </div>
        <div class="form__field-label">
            <input type="text" name="ShippingStreet2" id="ShippingStreet2" placeholder="Address 2"   class="form__field dtm__restyle shipping__field" value="<%= ViewData["ShippingStreet2"] %>">
            <label class="message__group" aria-live="assertive">
                <span class="message__label">Address 2</span>
                <span class="message__invalid">Please enter an address.</span>
            </label>
        </div>
        <fieldset class="account__group form__fieldset form__city-state-zip">
            <div class="form__field-label">
                <input type="text" name="ShippingCity" id="ShippingCity" placeholder="City" data-required="true"  class="form__field shipping__required dtm__restyle shipping__field" value="<%= ViewData["ShippingCity"] %>">
                <label class="message__group" aria-live="assertive">
                    <span class="message__label"><span class="form__error">* </span>City</span>
                    <span class="message__invalid">Please enter a city.</span>
                </label>
            </div>
            <div class="form__field-label">
                <div class="form form--select">
                    <div class="form__contain">
                        <%=Html.DropDownListFor(m => m.ShippingState, new SelectList(Model.States, "StateCode", "StateName", ViewData["ShippingState"]), new { @class="form__field shipping__required dtm__restyle shipping__field" })%>
                        <span class="form__field form__button">
                            <svg class="icon icon--combobox">
                                <use href="#icon-chevron"></use></svg>
                        </span>
                    </div>
                </div>
                <label class="message__group" aria-live="assertive">
                    <span class="message__label"><span class="form__error">* </span>State</span>
                    <span class="message__invalid">Please choose a state.</span>
                </label>
            </div>
            <div class="form__field-label">
                <input type="text" name="ShippingZip" id="ShippingZip" data-required="true"  placeholder="Zip Code" class="form__field shipping__required dtm__restyle shipping__field" value="<%= ViewData["ShippingZip"] %>">
                <label class="message__group" aria-live="assertive">
                    <span class="message__label"><span class="form__error">* </span>Zip Code</span>
                    <span class="message__invalid">Please enter a zip code.</span>
                </label>
            </div>
        </fieldset>
        <div class="form__field-label" <%=Model.Countries.Count() > 1 ? string.Empty :"style='display:none'" %>>
            <div class="form form--select">
                <div class="form__contain">
                    <%=Html.DropDownListFor(m => m.ShippingCountry, new SelectList(Model.Countries, "CountryCode", "CountryName", ViewData["ShippingCountry"]), "Choose A Country", new { @class="form__field shipping__required dtm__restyle shipping__field" })%>
                    <span class="form__field form__button">
                        <svg class="icon icon--combobox">
                            <use href="#icon-chevron"></use></svg>
                    </span>
                </div>
            </div>
            <label class="message__group" aria-live="assertive">
                <span class="message__label"><span class="form__error">* </span>Country</span>
                <span class="message__invalid">Please choose a country.</span>
            </label>
        </div>
    </div>
</div>
