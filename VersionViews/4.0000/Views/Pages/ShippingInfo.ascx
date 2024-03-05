<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<OrderPageViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>
<%@ Import Namespace="System.Web.Mvc" %>

<div class="form message shipping" id="ShippingIsSameDiv">
    <div class="form__checkbox-label account__copy">
        <input
            type="checkbox"
            id="hasShipping"
            name="ShippingIsDifferentThanBilling"
            value="true"
            aria-labelledby="ShippingIsDifferentThanBillingLabel" 
            onclick="if (this.checked) { $('#shippingInformation').show() } else { $('#shippingInformation').hide() }"
            />
        <input name="ShippingIsDifferentThanBilling" type="hidden" value="false">
        <label for="hasShipping" class="form__label">
            <span class="form__checkbox"></span>
            <span id="ShippingIsDifferentThanBillingLabel">Check if your shipping address is different than your billing address.</span>
        </label>

        <fieldset class="form__expando shipping__required">
            <h2 class="account__header">Shipping Address</h2>

            <div class="form__group">
                <!-- First Name -->
                <div class="form message">
                    <%
                        var shippingFirstNameMessage = Html.ValidationMessageFor(m => m.ShippingFirstName);
                        var shippingFirstNameIsInvalid = shippingFirstNameMessage != null;
                    %>
                    <div class="form__field-label">
                        <input type="text" title="Name can only contain letters" data-required="true" data-pattern="^[A-z]+([A-z .,'-]*)?$"  name="ShippingFirstName" id="ShippingFirstName" placeholder="First Name" class="dtm__restyle form__field shipping__required shipping__field <%= shippingFirstNameIsInvalid ? "message__is-invalid" : string.Empty %>" value="<%= ViewData["ShippingFirstName"] %>">
                        <label for="ShippingFirstName" class="message__label">
                            <span class="form__error">* </span>First Name
                        </label>
                        <span class="message__group" role="alert">
                            <span class="message__invalid">
                                <% if (shippingFirstNameIsInvalid) { %>
                                    <%= shippingFirstNameMessage %>
                                <% } else { %>
                                    Please enter a first name.
                                <% } %>
                            </span>
                        </span>
                    </div>
                </div>

                <!-- Last Name -->
                <div class="form message">
                    <%
                        var shippingLastNameMessage = Html.ValidationMessageFor(m => m.ShippingLastName);
                        var shippingLastNameIsInvalid = shippingLastNameMessage != null;
                    %>
                    <div class="form__field-label">
                        <input type="text" name="ShippingLastName" id="ShippingLastName" placeholder="Last Name"  data-required="true" data-pattern="^[A-z]+([A-z .,'-]*)?$" class="dtm__restyle form__field shipping__required shipping__field <%= shippingLastNameIsInvalid ? "message__is-invalid" : string.Empty %>" value="<%= ViewData["ShippingLastName"] %>">
                        <label for="ShippingLastName" class="message__label">
                            <span class="form__error">* </span>Last Name
                        </label>
                        <span class="message__group" role="alert">
                            <span class="message__invalid">
                                <% if (shippingLastNameIsInvalid) { %>
                                    <%= shippingLastNameMessage %>
                                <% } else { %>
                                    Please enter a last name.
                                <% } %>
                            </span>
                        </span>
                    </div>
                </div>

                <!-- Street -->
                <div class="form__take-row form message">
                    <%
                        var shippingStreetMessage = Html.ValidationMessageFor(m => m.ShippingStreet);
                        var shippingStreetIsInvalid = shippingStreetMessage != null;
                    %>
                    <div class="form__field-label">
                        <input type="text" name="ShippingStreet" id="ShippingStreet" placeholder="Address" data-required="true" class="dtm__restyle form__field shipping__required shipping__field <%= shippingStreetIsInvalid ? "message__is-invalid" : string.Empty %>" value="<%= ViewData["ShippingStreet"] %>">
                        <label for="ShippingStreet" class="message__label">
                            <span class="form__error">* </span>Address
                        </label>
                        <span class="message__group" role="alert">
                            <span class="message__invalid">
                                <% if (shippingStreetIsInvalid) { %>
                                    <%= shippingStreetMessage %>
                                <% } else { %>
                                    Please enter an address.
                                <% } %>
                            </span>
                        </span>
                    </div>
                </div>

                <!-- Street 2 -->
                <div class="form__take-row form message">
                    <%
                        var shippingStreet2Message = Html.ValidationMessageFor(m => m.ShippingStreet2);
                        var shippingStreet2IsInvalid = shippingStreet2Message != null;
                    %>
                    <div class="form__field-label">
                        <input type="text" name="ShippingStreet2" id="ShippingStreet2" placeholder="Address 2" class="dtm__restyle form__field shipping__field <%= shippingStreet2IsInvalid ? "message__is-invalid" : string.Empty %>" value="<%= ViewData["ShippingStreet2"] %>">
                        <label for="ShippingStreet2" class="message__label">
                            Address 2
                        </label>
                        <span class="message__group" role="alert">
                            <span class="message__invalid">
                                <% if (shippingStreet2IsInvalid) { %>
                                    <%= shippingStreet2Message %>
                                <% } else { %>
                                    Please enter an address.
                                <% } %>
                            </span>
                        </span>
                    </div>
                </div>

                <!-- City -->
                <div class="form__take-some form message">
                    <%
                        var shippingCityMessage = Html.ValidationMessageFor(m => m.ShippingCity);
                        var shippingCityIsInvalid = shippingCityMessage != null;
                    %>
                    <div class="form__field-label">
                        <input type="text" name="ShippingCity" id="ShippingCity" placeholder="City" data-required="true" class="dtm__restyle form__field shipping__required shipping__field <%= shippingCityIsInvalid ? "message__is-invalid" : string.Empty %>" value="<%= ViewData["ShippingCity"] %>">
                        <label for="ShippingCity" class="message__label">
                            <span class="form__error">* </span>City
                        </label>
                        <span class="message__group" role="alert">
                            <span class="message__invalid">
                                <% if (shippingCityIsInvalid) { %>
                                    <%= shippingCityMessage %>
                                <% } else { %>
                                    Please enter a city.
                                <% } %>
                            </span>
                        </span>
                    </div>
                </div>

                <!-- State -->
                <div class="form__take-some form message">
                    <%
                        var shippingStateMessage = Html.ValidationMessageFor(m => m.ShippingState);
                        var shippingStateIsInvalid = shippingStateMessage != null;
                    %>
                    <div class="form__field-label" id="billStateParent">
                        <div class="form form--select">
                            <div class="form__contain">
                                <%= Html.DropDownListFor(m => m.ShippingState, new SelectList(Model.States, "StateCode", "StateName", ViewData["ShippingState"]), new { @class="dtm__restyle form__field shipping__required shipping__field" }) %>
                                <span class="form__field form__button">
                                    <svg class="icon icon--combobox">
                                        <use href="#icon-chevron"></use>
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <label for="ShippingState" class="message__label">
                            <span class="form__error">* </span>State
                        </label>
                        <span class="message__group" role="alert">
                            <span class="message__invalid">
                                <% if (shippingStateIsInvalid) { %>
                                    <%= shippingStateMessage %>
                                <% } else { %>
                                    Please choose a state.
                                <% } %>
                            </span>
                        </span>
                    </div>
                </div>

                <!-- Zip Code -->
                <div class="form__take-some form message">
                    <%
                        var shippingZipMessage = Html.ValidationMessageFor(m => m.ShippingZip);
                        var shippingZipIsInvalid = shippingZipMessage != null;
                    %>
                    <div class="form__field-label">
                        <input type="text" name="ShippingZip" id="ShippingZip" placeholder="Zip Code" data-required="true" class="dtm__restyle form__field shipping__required shipping__field <%= shippingZipIsInvalid ? "message__is-invalid" : string.Empty %>" value="<%= ViewData["ShippingZip"] %>">
                        <label for="ShippingZip" class="message__label">
                            <span class="form__error">* </span>Zip Code
                        </label>
                        <span class="message__group" role="alert">
                            <span class="message__invalid">
                                <% if (shippingZipIsInvalid) { %>
                                    <%= shippingZipMessage %>
                                <% } else { %>
                                    Please enter a zip code.
                                <% } %>
                            </span>
                        </span>
                    </div>
                </div>

                <!-- Country -->
                <div class="form message" <%=Model.Countries.Count() > 1 ? string.Empty :"style='display:none'" %>>
                    <%
                        var shippingCountryMessage = Html.ValidationMessageFor(m => m.ShippingCountry);
                        var shippingCountryIsInvalid = shippingCountryMessage != null;
                    %>
                    <div class="form__field-label">
                        <div class="form form--select">
                            <div class="form__contain">
                                <%= Html.DropDownListFor(m => m.ShippingCountry, new SelectList(Model.Countries, "CountryCode", "CountryName", ViewData["ShippingCountry"]), new { @class="dtm__restyle form__field" }) %>
                                <span class="form__field form__button">
                                    <svg class="icon icon--combobox">
                                        <use href="#icon-chevron"></use>
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <label for="ShippingCountry" class="message__label">
                            <span class="form__error">* </span>Country
                        </label>
                        <label class="message__group" role="alert">
                            <span class="message__invalid">
                                <% if (shippingCountryIsInvalid) { %>
                                    <%= shippingCountryMessage %>
                                <% } else { %>
                                    Please choose a country.
                                <% } %>
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
</div>