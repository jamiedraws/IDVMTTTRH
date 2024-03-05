<%@ Control Language="C#" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>

<%

    var isProcessPayment = DtmContext.PageCode == "ProcessPayment";
    var currentMonth = DateTime.Today.ToString("MM");
    var expirationMonthValues = new Dictionary<string, string>();
    var startDate = new DateTime(2008, 1, 1);

    for (var m = 0; m < 12; m++)
    {
        expirationMonthValues.Add(startDate.AddMonths(m).ToString("MM"), startDate.AddMonths(m).ToString("MM - MMM"));
    }
%>

<fieldset class="form__fieldset form__payment" id="paymentForm">

    <h3 class="form__legend">Choose Your Payment Type</h3>

    <%= Html.Partial("PayPalBanner", new ViewDataDictionary { { "onSiteMessage", true } }) %>

    <div class="c-brand--form">

    <ul class="c-brand--form__list">

        <%-- // @PAYMENT ICONS --%>
        <li class="c-brand--form__item o-grid--vert--center u-vw--100">
            <label class="c-brand--form__cc--label @mv-o-grid--none o-grid__col @xs-u-vw--40 fn--right"></label>
            <div id="cc" class="c-brand--form__field o-grid__col @xs-u-bs--reset @xs-u-vw--100"></div>
        </li>

        <%-- // @PAYMENT TYPE --%>
        <li id="CardTypeCt" class="c-brand--form__item o-grid--vert--center u-vw--100">
            <label for="CardType" data-required class="c-brand--form__label @mv-o-grid--none o-grid__col @xs-u-vw--40 fn--right">Type</label>
            <%= Html.DropDownList("CardType", new[]
                {
                    new SelectListItem { Text = "Visa", Value = "V"},
                    new SelectListItem { Text = "Mastercard", Value = "M"},
                    new SelectListItem { Text = "Discover", Value = "D"},
                    new SelectListItem { Text = "American Express", Value= "AX"}
                }, new { @class = "c-brand--form__select o-box o-shadow u-vw--100 fx--animate" })
            %>
        </li>

        <%-- // @PAYMENT NUMBER --%>
        <li id="CardNumberCt" class="c-brand--form__item o-grid--vert--center u-vw--100">
            <% if (isProcessPayment) { %>
                <%= Html.Hidden("CardPaymentAttempt") %>    
            <% } %>
            <div class="form__field">
                <label id="CardNumberLabel" for="CardNumber" data-required class="c-brand--form__label"><%= LabelsManager.Labels["CardNumber"] %></label>
                <div id="CardNumber-DigitalRiver" class="form__group">
                    <input id="CardNumber" name="CardNumber" type="tel" required value="<%= ViewData["CardNumber"] %>" placeholder="<%= LabelsManager.Labels["CardNumberPlaceholder"] %>" class="form__input">
                </div>
            </div>
        </li>

        <%-- // @PAYMENT EXP. DATE --%>
        <li id="CardExpirationCt" class="o-grid--vert--center u-vw--100 c-brand--form__item">
            <div class="form__field">
                <label for="CardExpirationMonth" data-required class="c-brand--form__label"><%= LabelsManager.Labels["ExpirationDate"] %></label>
                <div id="CardExpiration-DigitalRiver" class="form__group">
                    <select class="c-brand--form__select form__select" id="CardExpirationMonth" name="CardExpirationMonth">
                        <%
                            foreach (var option in expirationMonthValues)
                            {
                        %>
                        <option <%if (option.Key == currentMonth)
                            { %>
                            selected <%} %> value="<%=option.Key%>"><%=option.Value%></option>
                        <%
                            }
                        %>
                    </select>
                    <%= Html.NumericDropDown("CardExpirationYear", DateTime.Now.Year, DateTime.Now.Year + 10, ViewData["CardExpirationYear"], new { @class = "c-brand--form__select form__select", required = "true" }) %>
                </div>
            </div>
        </li>

        <%-- // @PAYMENT CVV2 --%>
        <li id="CardCvv2Ct" class="c-brand--form__item o-grid--vert--center u-vw--100">
            <div class="form__field">
                <label id="CardCvv2Label" for="CardCvv2" data-required class="c-brand--form__label"><%= LabelsManager.Labels["CVV2"] %></label>
                <div class="form__group">
                    <div id="CardCvv2-DigitalRiver">
                        <input id="CardCvv2" name="CardCvv2" type="tel" value="<%= ViewData["CardCvv2"] %>" maxlength="5" placeholder="<%= LabelsManager.Labels["CVV2Placeholder"] %>" class="form__input c-brand--form__input o-box o-shadow fx--animate o-grid__col @xs-u-vw--100">
                    </div>           
                    <a href="<%= LabelsManager.Labels["CVV2DisclaimerLink"] %>" title="<%= LabelsManager.Labels["CVV2DisclaimerLinkTitle"] %>" id="cvv2" class="c-brand--form__hint form__link @xs-u-vw--100 u-pad u-push--left has-fancybox fancybox.ajax"><%= LabelsManager.Labels["CVV2Disclaimer"] %></a>
                </div>
            </div>
        </li>

    </ul>

    </div>

    <script type="text/javascript">
        (function () {
            const hasjQuery = function () {
                return "jQuery" in window && $ === jQuery;
            };

            const unbindSelection = function () {
                if (hasjQuery()) {
                    if ($("[name='OrderType']:checked") && $("[name='OrderType']:checked").val()) {
                        $("[name='OrderType']:checked").attr("checked", false);
                    }
                }
            };

            const preselectPayment = function (payment) {
                let paymentOption;
                switch (payment) {
                    case 'paypal':
                        paymentOption = document.querySelector("[id*='otPayPal']");

                        break;
                    case 'card':
                        paymentOption = document.querySelector("[id*='otCARD']");

                        break;
                    default:
                }
                if (paymentOption) {
                    paymentOption.click();
                }
            };
            const processTask = function () {
                unbindSelection();
                preselectPayment("card");
            };

            addEventListener("load", processTask);
        }());
    </script>
    
</fieldset>