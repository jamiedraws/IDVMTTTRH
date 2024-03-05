<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>

<%
    var hasPayPal = SettingsManager.ContextSettings["DigitalRiver.EnablePayPal", false];
    var hasPayPalCredit = SettingsManager.ContextSettings["DigitalRiver.EnablePayPalCredit", false];
    var removePayPal = !hasPayPal && !hasPayPalCredit;

    var loadScripts = ViewData["loadScripts"] as bool? ?? false;
    var onSiteMessage = ViewData["onSiteMessage"] as bool? ?? false;
    var v = String.Format("?v={0}", 0);
%>
<% 
    if (onSiteMessage && removePayPal)
    {
        %>
    <div class="paypal-credit-banner paypal-credit-banner--onsite-message">
        <em class="paypal-credit-banner__message">NOTE: PayPal and PayPal Credit are temporarily unavailable.</em>
    </div>
        <%
    }
    else
    {
        if (hasPayPalCredit && !onSiteMessage) {
            if (loadScripts)
                { %>
            <script
                defer
                src="https://www.paypal.com/sdk/js?client-id=ARlubN0eH0o0GtSg_gIngr-pKE6N0rLTU78HpDws7hyslL5HQpvrulplwp8B8jEcnQjwC7f8yJInSYWU&components=messages"
                data-namespace="paypal2">
            </script>
            <script defer src="/js/paypal-credit-banner.js<%= v %>"></script>
        <% }
            else
            {
                var size = ViewData["size"] as string ?? "20x1";
                var availableSizes = new List<string> { "20x1", "8x1", "1x4", "1x1" };
                var hasSize = availableSizes.Any(s => s.Equals(size));

                if (hasSize)
                {
                    var arp = size.Replace("x", "/");
                %>
                <div class="paypal-credit-banner" data-pp-style-color="blue">
                    <div class="paypal-credit-banner__placeholder" style="--arp:<%= arp %>">
                        <div class="paypal-credit-banner__placeitem">
                            <div class="paypal-credit-banner__item"
                                data-pp-message
                                data-pp-style-layout="flex"
                                data-pp-style-color="blue"
                                data-pp-style-ratio="<%= size %>">
                            </div>
                        </div>
                    </div>
                </div>
            <% 
                }
            }
        }
    }
%>