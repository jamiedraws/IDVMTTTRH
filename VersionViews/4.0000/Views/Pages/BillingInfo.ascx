<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<OrderPageViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>

<div id="billingInformation" class="account__copy">
    <fieldset>
        <h2 class="account__header">Billing Address</h2>

        <div class="form__group">
            <!-- First Name -->
            <div class="form message">
                <%
                    var billingFirstNameMessage = Html.ValidationMessageFor(m => m.BillingFirstName);
                    var billingFirstNameIsInvalid = billingFirstNameMessage != null;
                %>
                <div class="form__field-label">
                    <input type="text" title="First name can only contain letter characters" data-required="true" data-pattern="^[A-z]+([A-z .,'-]*)?$" name="BillingFirstName" id="BillingFirstName" placeholder="First Name" class="dtm__restyle form__field <%= billingFirstNameIsInvalid ? "message__is-invalid" : string.Empty %>" value="<%= ViewData["BillingFirstName"] %>">
                    <label for="BillingFirstName" class="message__label">
                        <span class="form__error">* </span>First Name
                    </label>
                    <span class="message__group" role="alert">
                        <span class="message__invalid">
                            <% if (billingFirstNameIsInvalid)
                                { %>
                            <%= billingFirstNameMessage %>
                            <% }
                            else
                            { %>
                            Please enter a first name.
                        <% } %>
                        </span>
                    </span>
                </div>
            </div>

            <!-- Last Name -->
            <div class="form message">
                <%
                    var billingLastNameMessage = Html.ValidationMessageFor(m => m.BillingLastName);
                    var billingLastNameIsInvalid = billingLastNameMessage != null;
                %>
                <div class="form__field-label">
                    <input type="text" name="BillingLastName" id="BillingLastName" placeholder="Last Name" data-required="true" data-pattern="^[A-z]+([A-z .,'-]*)?$" class="dtm__restyle form__field <%= billingLastNameIsInvalid ? "message__is-invalid" : string.Empty %>" value="<%= ViewData["BillingLastName"] %>">
                    <label for="BillingLastName" class="message__label">
                        <span class="form__error">* </span>Last Name
                    </label>
                    <span class="message__group" role="alert">
                        <span class="message__invalid">
                            <% if (billingLastNameIsInvalid)
                                { %>
                            <%= billingLastNameMessage %>
                            <% }
                            else
                            { %>
                            Please enter a last name.
                        <% } %>
                        </span>
                    </span>
                </div>
            </div>

            <!-- Street -->
            <div class="form__take-row form message">
                <%
                    var billingStreetMessage = Html.ValidationMessageFor(m => m.BillingStreet);
                    var billingStreetIsInvalid = billingStreetMessage != null;
                %>
                <div class="form__field-label">
                    <input type="text" name="BillingStreet" id="BillingStreet" placeholder="Address" data-required="true" class="dtm__restyle form__field <%= billingStreetIsInvalid ? "message__is-invalid" : string.Empty %>" value="<%= ViewData["BillingStreet"] %>">
                    <label for="BillingStreet" class="message__label">
                        <span class="form__error">* </span>Address
                    </label>
                    <span class="message__group" role="alert">
                        <span class="message__invalid">
                            <% if (billingStreetIsInvalid)
                                { %>
                            <%= billingStreetMessage %>
                            <% }
                            else
                            { %>
                            Please enter an address.
                        <% } %>
                        </span>
                    </span>
                </div>
            </div>

            <!-- Street 2 -->
            <div class="form__take-row form message">
                <%
                    var billingStreet2Message = Html.ValidationMessageFor(m => m.BillingStreet2);
                    var billingStreet2IsInvalid = billingStreet2Message != null;
                %>
                <div class="form__field-label">
                    <input type="text" name="BillingStreet2" id="BillingStreet2" placeholder="Address 2" class="dtm__restyle form__field <%= billingStreet2IsInvalid ? "message__is-invalid" : string.Empty %>" value="<%= ViewData["BillingStreet2"] %>">
                    <label for="BillingStreet2" class="message__label">
                        Address 2
                    </label>
                    <span class="message__group" role="alert">
                        <span class="message__invalid">
                            <% if (billingStreet2IsInvalid)
                                { %>
                            <%= billingStreet2Message %>
                            <% }
                            else
                            { %>
                            Please enter an address.
                        <% } %>
                        </span>
                    </span>
                </div>
            </div>

            <!-- City -->
            <div class="form__take-some form message">
                <%
                    var billingCityMessage = Html.ValidationMessageFor(m => m.BillingCity);
                    var billingCityIsInvalid = billingCityMessage != null;
                %>
                <div class="form__field-label">
                    <input type="text" name="BillingCity" id="BillingCity" placeholder="City" data-required="true" class="dtm__restyle form__field <%= billingCityIsInvalid ? "message__is-invalid" : string.Empty %>" value="<%= ViewData["BillingCity"] %>">
                    <label for="BillingCity" class="message__label">
                        <span class="form__error">* </span>City
                    </label>
                    <span class="message__group" role="alert">
                        <span class="message__invalid">
                            <% if (billingCityIsInvalid)
                            { %>
                            <%= billingCityMessage %>
                            <% }
                            else
                            { %>
                            Please enter a city.
                        <% } %>
                        </span>
                    </span>
                </div>
            </div>

            <!-- State -->
            <div class="form__take-some form message">
                <%
                    var billingStateMessage = Html.ValidationMessageFor(m => m.BillingState);
                    var billingStateIsInvalid = billingStateMessage != null;
                %>
                <div class="form__field-label" id="billStateParent">
                    <div class="form form--select">
                        <div class="form__contain">
                            <%= Html.DropDownListFor(m => m.BillingState, new SelectList(Model.States, "StateCode", "StateName", ViewData["BillingState"]), new { @class="dtm__restyle form__field", @data_required="true", @data_parent="billStateParent" }) %>
                            <span class="form__field form__button">
                                <svg class="icon icon--combobox">
                                    <use href="#icon-chevron"></use>
                                </svg>
                            </span>
                        </div>
                    </div>
                    <label for="BillingState" class="message__label">
                        <span class="form__error">* </span>State
                    </label>
                    <span class="message__group" role="alert">
                        <span class="message__invalid">
                            <% if (billingStateIsInvalid)
                                { %>
                            <%= billingStateMessage %>
                            <% }
                            else
                            { %>
                            Please choose a state.
                        <% } %>
                        </span>
                    </span>
                </div>
            </div>

            <!-- Zip Code -->
            <div class="form__take-some form message">
                <%
                    var billingZipMessage = Html.ValidationMessageFor(m => m.BillingZip);
                    var billingZipIsInvalid = billingZipMessage != null;
                %>
                <div class="form__field-label">
                    <input type="text" name="BillingZip" id="BillingZip" placeholder="Zip Code" data-required="true" class="dtm__restyle form__field <%= billingZipIsInvalid ? "message__is-invalid" : string.Empty %>" value="<%= ViewData["BillingZip"] %>">
                    <label for="BillingZip" class="message__label">
                        <span class="form__error">* </span>Zip Code
                    </label>
                    <span class="message__group" role="alert">
                        <span class="message__invalid">
                            <% if (billingZipIsInvalid)
                            { %>
                            <%= billingZipMessage %>
                            <% }
                            else
                            { %>
                            Please enter a zip code.
                        <% } %>
                        </span>
                    </span>
                </div>
            </div>

            <!-- Country -->
            <div class="form message" <%=Model.Countries.Count() > 1 ? string.Empty :"style='display:none'" %>>
                <%
                    var billingCountryMessage = Html.ValidationMessageFor(m => m.BillingCountry);
                    var billingCountryIsInvalid = billingCountryMessage != null;
                %>
                <div class="form__field-label">
                    <div class="form form--select">
                        <div class="form__contain">
                            <%= Html.DropDownListFor(m => m.BillingCountry, new SelectList(Model.Countries, "CountryCode", "CountryName", ViewData["BillingCountry"]), new { @class="dtm__restyle form__field" }) %>
                            <span class="form__field form__button">
                                <svg class="icon icon--combobox">
                                    <use href="#icon-chevron"></use>
                                </svg>
                            </span>
                        </div>
                    </div>
                    <label for="BillingCountry" class="message__label">
                        <span class="form__error">* </span>Country
                    </label>
                    <span class="message__group" role="alert">
                        <span class="message__invalid">
                            <% if (billingCountryIsInvalid)
                                { %>
                            <%= billingCountryMessage %>
                            <% }
                            else
                            { %>
                            Please choose a country.
                        <% } %>
                        </span>
                    </span>
                </div>
            </div>

            <!-- Phone -->
            <div class="form__take-row form message">
                <%
                    var phoneMessage = Html.ValidationMessageFor(m => m.Phone);
                    var phoneIsInvalid = phoneMessage != null;
                %>
                <div class="form__field-label">
                    <input type="tel" name="Phone" id="Phone" placeholder="Phone" data-required="true" data-validationtype="phone" class="dtm__restyle form__field <%= phoneIsInvalid ? "message__is-invalid" : string.Empty %>" value="<%= ViewData["Phone"] %>">
                    <label for="Phone" class="message__label">
                        <span class="form__error">* </span>Phone
                    </label>
                    <span class="message__group" role="alert">
                        <span class="message__invalid">
                            <% if (phoneIsInvalid)
                            { %>
                            <%= phoneMessage %>
                            <% }
                            else
                            { %>
                            Please enter a phone number.
                        <% } %>
                        </span>
                    </span>
                </div>
            </div>

            <!-- Email -->
            <div class="form__take-row form message">
                <%
                    var emailMessage = Html.ValidationMessageFor(m => m.Email);
                    var emailIsInvalid = emailMessage != null;
                %>
                <div class="form__field-label">
                    <input type="email" name="Email" id="Email" title="Format example: someone@someplace.com" data-required="true" data-pattern="^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$" placeholder="Email" class="dtm__restyle form__field <%= emailIsInvalid ? "message__is-invalid" : string.Empty %>" value="<%= ViewData["Email"] %>">
                    <label for="Email" class="message__label">
                        <span class="form__error">* </span>Email
                    </label>
                    <span class="message__group" role="alert">
                        <span class="message__invalid">
                            <% if (emailIsInvalid)
                            { %>
                            <%= emailMessage %>
                            <% }
                            else
                            { %>
                            Please enter an email address.
                        <% } %>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    </fieldset>
</div>
