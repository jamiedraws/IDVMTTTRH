<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Dtm.Framework.ClientSites.Web.ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>

<fieldset class="form__fieldset" id="billingInformation">

    <h3 class="form__legend">Billing</h3>

    <div class="c-brand--form">

    <ul class="c-brand--form__list">

        <%-- // @BILLING FULL NAME --%>
        <li id="BillingFullNameCt" class="form__field">
            <label id="BillingFullNameLabel" for="BillingFullName" data-required class="c-brand--form__label"><%= LabelsManager.Labels["FullName"] %></label>
            <input id="BillingFullName" maxlength="50" name="BillingFullName" type="text" value="<%= ViewData["BillingFullName"] %>" placeholder="<%= LabelsManager.Labels["FullNamePlaceholder"] %>" class="form__input c-brand--form__input o-grid__col o-box o-shadow @xs-u-vw--100 fx--animate">
        </li>

        <%-- // @BILLING STREET --%>
        <li id="BillingStreetCt" class="form__field">
            <label id="BillingStreetLabel" for="BillingStreet" data-required class="c-brand--form__label"><%= LabelsManager.Labels["Address"] %></label>
            <div class="fld">
                <input id="BillingStreet" name="BillingStreet" type="text" value="<%= ViewData["BillingStreet"] %>" maxlength="50" placeholder="<%= LabelsManager.Labels["AddressPlaceholder"] %>"  class="form__input c-brand--form__input o-box o-shadow @xs-u-vw--100 fx--animate">
            </div>
        </li>

        <%-- // @BILLING STREET 2 --%>
        <li id="BillingStreet2Ct" class="form__field">
            <label id="BillingStreet2Label" for="BillingStreet2" class="c-brand--form__label"><%= LabelsManager.Labels["Address2"] %></label>
            <input id="BillingStreet2" name="BillingStreet2" type="text" value="<%= ViewData["BillingStreet2"] %>" maxlength="50" placeholder="<%= LabelsManager.Labels["Address2Placeholder"] %>"  class="form__input c-brand--form__input o-box o-shadow @xs-u-vw--100 fx--animate">
        </li>

        <%-- // @BILLING CITY --%>
        <li id="BillingCityCt" class="form__field">
            <label id="BillingCityLabel" for="BillingCity" data-required class="c-brand--form__label"><%= LabelsManager.Labels["City"] %></label>
            <input id="BillingCity" name="BillingCity" type="text" value="<%= ViewData["BillingCity"] %>" maxlength="50" placeholder="<%= LabelsManager.Labels["CityPlaceholder"] %>"  class="form__input c-brand--form__input o-box o-shadow @xs-u-vw--100 fx--animate">
        </li>

        <%-- // @BILLING COUNTRY --%>
        <li id="BillingCountryCt" class="form__field">
            <label id="BillingCountryLabel" for="BillingCountry" data-required class="c-brand--form__label"><%= LabelsManager.Labels["Country"] %></label>
            <%= Html.DropDownListFor(m => m.BillingCountry, new SelectList(Model.Countries, "CountryCode", "CountryName"), LabelsManager.Labels["CountryPlaceholder"], new { @class = "form__select c-brand--form__select o-box o-shadow @xs-u-vw--100 fx--animate" }) %>
        </li>

        <%-- // @BILLING STATE --%>
        <li id="BillingStateCt" class="form__field">
            <label id="BillingStateLabel" for="BillingState" data-required class="c-brand--form__label"><%= LabelsManager.Labels["State"] %></label>
            <%= Html.DropDownListFor(m => m.BillingState, new SelectList(Model.States, "StateCode", "StateName"), LabelsManager.Labels["StatePlaceholder"], new { @class = "form__select c-brand--form__select o-box o-shadow @xs-u-vw--100 fx--animate" }) %>
        </li>

        <%-- // @BILLING ZIP --%>
        <li id="BillingZipCt" class="form__field">
            <label id="BillingZipLabel" for="BillingZip" data-required class="c-brand--form__label"><%= LabelsManager.Labels["Zip"] %></label>
            <input id="BillingZip" name="BillingZip" type="tel" value="<%= ViewData["BillingZip"] %>" maxlength="50" placeholder="<%= LabelsManager.Labels["ZipPlaceholder"] %>"  class="form__input c-brand--form__input o-box o-shadow @xs-u-vw--100 fx--animate">
        </li>

        <%-- // @PHONE --%>
        <li id="PhoneCt" class="form__field">
            <label id="PhoneLabel" for="Phone" data-required class="c-brand--form__label"><%= LabelsManager.Labels["Phone"] %></label>
            <input id="Phone" name="Phone" type="tel" value="<%= ViewData["Phone"] %>" maxlength="50" placeholder="<%= LabelsManager.Labels["PhonePlaceholder"] %>"  class="form__input c-brand--form__input o-box o-shadow @xs-u-vw--100 fx--animate">
        </li>

        <%-- // @EMAIL --%>
        <li id="EmailCt" class="form__field">
            <label id="EmailLabel" for="Email" data-required class="c-brand--form__label"><%= LabelsManager.Labels["Email"] %></label>
            <input id="Email" name="Email" type="email" value="<%= ViewData["Email"] %>" maxlength="50" placeholder="<%= LabelsManager.Labels["EmailPlaceholder"] %>" class="form__input c-brand--form__input o-box o-shadow @xs-u-vw--100 fx--animate">
        </li>

        <% if (SettingsManager.ContextSettings["OrderFormReview.ShowPrivacyPolicy", false])
            { %>
        <%-- // @PRIVACY POLICY --%>
        <li id="PrivacyCt" class="form__field">
            <a class="form__link" href="<%= SettingsManager.ContextSettings["OrderFormReview.PrivacyPolicyLink"] %><%= Model.Extension %>" title="<%= SettingsManager.ContextSettings["Label.ProductName"] %> | <%= LabelsManager.Labels["PrivacyPolicyText"] %>">
                <%= LabelsManager.Labels["PrivacyPolicyText"] %>
            </a>
        </li>
        <% } %>
    </ul>


</fieldset>
    <%-- // BEGIN #ShippingIsSame --%>

    <label id="ShippingIsSame" for="ShippingIsDifferentThanBilling" class="o-grid--vert--center u-mar--bottom">
        <div class="o-grid__col u-pad"><%= Html.CheckBoxFor(m => m.ShippingIsDifferentThanBilling, new { data_eflex = "draw" }) %></div>
        <p class="o-grid__col u-pad"><%= LabelsManager.Labels["IsShippingDifferentFromBillingDisclaimer"] %></p>
    </label>
    <%-- // BEGIN #ShippingIsSame --%>

<fieldset class="form__fieldset" id="shippingInformation">

    <h3 class="form__legend">Shipping</h3>

    <div class="c-brand--form">

    <ul class="c-brand--form__list">

        <%-- // @SHIPPING FULL NAME --%>
        <li id="ShippingFullNameCt" class="form__field">
            <label id="ShippingFullNameLabel" for="ShippingFullName" data-required class="c-brand--form__label"><%= LabelsManager.Labels["FullName"] %></label>
            <input id="ShippingFullName" name="ShippingFullName" type="text" value="<%= ViewData["ShippingFullName"] %>" maxlength="50" placeholder="<%= LabelsManager.Labels["FullNamePlaceholder"] %>" class="form__input c-brand--form__input o-grid__col o-box o-shadow @xs-u-vw--100 fx--animate">
        </li>

        <%-- // @SHIPPING STREET --%>
        <li id="ShippingStreetCt" class="form__field">
            <label id="ShippingStreetLabel" for="ShippingStreet" data-required class="c-brand--form__label"><%= LabelsManager.Labels["Address"] %></label>
            <input id="ShippingStreet" name="ShippingStreet" type="text" value="<%= ViewData["ShippingStreet"] %>" maxlength="50" placeholder="<%= LabelsManager.Labels["AddressPlaceholder"] %>" class="form__input c-brand--form__input o-box o-shadow @xs-u-vw--100 fx--animate">
        </li>

        <%-- // @SHIPPING STREET 2 --%>
        <li id="ShippingStreet2Ct" class="form__field">
            <label id="ShippingStreet2Label" for="ShippingStreet2" class="c-brand--form__label"><%= LabelsManager.Labels["Address2"] %></label>
            <input id="ShippingStreet2" name="ShippingStreet2" type="text" value="<%= ViewData["ShippingStreet2"] %>" maxlength="50" placeholder="<%= LabelsManager.Labels["Address2Placeholder"] %>" class="form__input c-brand--form__input o-box o-shadow @xs-u-vw--100 fx--animate">
        </li>

        <%-- // @SHIPPING CITY --%>
        <li id="ShippingCityCt" class="form__field">
            <label id="ShippingCityLabel" for="ShippingCity" data-required class="c-brand--form__label"><%= LabelsManager.Labels["City"] %></label>
            <input id="ShippingCity" name="ShippingCity" type="text" value="<%= ViewData["ShippingCity"] %>" maxlength="50" placeholder="<%= LabelsManager.Labels["CityPlaceholder"] %>" class="form__input c-brand--form__input o-box o-shadow @xs-u-vw--100 fx--animate">
        </li>

        <%-- // @SHIPPING COUNTRY --%>
        <li id="ShippingCountryCt" class="form__field">
            <label for="ShippingCountry" data-required class="c-brand--form__label"><%= LabelsManager.Labels["Country"] %></label>
            <%= Html.DropDownListFor(m => m.ShippingCountry, new SelectList(Model.Countries, "CountryCode", "CountryName"), LabelsManager.Labels["CountryPlaceholder"], new { @class = "c-brand--form__select o-grid--col o-box o-shadow @xs-u-vw--100 fx--animate" })%>
        </li>

        <%-- // @SHIPPING STATE --%>
        <li id="ShippingStateCt" class="form__field">
            <label for="ShippingState" data-required class="c-brand--form__label"><%= LabelsManager.Labels["State"] %></label>
            <%= Html.DropDownListFor(m => m.ShippingState, new SelectList(Model.States, "StateCode", "StateName"), LabelsManager.Labels["StatePlaceholder"], new { @class = "c-brand--form__select o-grid--col o-box o-shadow @xs-u-vw--100 fx--animate" })%>
        </li>

        <%-- // @SHIPPING ZIP --%>
        <li id="ShippingZipCt" class="form__field">
            <label id="ShippingZipLabel" for="ShippingZip" data-required class="c-brand--form__label"><%= LabelsManager.Labels["Zip"] %></label>
            <input id="ShippingZip" name="ShippingZip" type="tel" value="<%= ViewData["ShippingZip"] %>" maxlength="10" placeholder="<%= LabelsManager.Labels["ZipPlaceholder"] %>" class="form__input c-brand--form__input o-box o-shadow @xs-u-vw--100 fx--animate">
        </li>

    </ul>

    </div>

</fieldset>
<script src="/shared/js/jquery.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#AcceptOfferButton").on("click", validateForm);
            $('#ShippingIsDifferentThanBilling').on("click", toggleShipping);
            toggleShipping();
        });
    </script>