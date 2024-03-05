<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>

<%
    var productName = SettingsManager.ContextSettings["Label.ProductName"];
    var ext = DtmContext.ApplicationExtension;

    var renderSitemap = false;
    var renderSitemapValue = ViewData["renderSitemap"] as string ?? "True";
    Boolean.TryParse(renderSitemapValue, out renderSitemap);
    var labelCategory = ViewData["labelCategory"] as string ?? "Footer";
    var labelId = labelCategory.Replace(" ", "-").ToLower();
    var cov = String.Format("/{0}/{1}/", DtmContext.OfferCode, DtmContext.Version);
    var isIndex = DtmContext.PageCode == "Index";
    var hashProducts = "#products";
    var linkProducts = isIndex ? hashProducts : string.Format("{0}Index{1}{2}", cov, ext, hashProducts);
%>

<div class="section__block">
    <nav aria-label="<%= String.Format("{0} {1}", labelCategory, "Offer information") %>" class="list list--inline">
        <a id="<%= labelId %>-home" href="<%= cov  %>Index<%= ext %>" aria-label="Home">Home</a>
        <a id="<%= labelId %>-shop" href="<%= linkProducts %>">Shop</a>
        <a id="<%= labelId %>-customer-service" href="<%= cov  %>CustomerService<%= ext %>">Customer Service</a>
        <a id="<%= labelId %>-privacy-policy" href="<%= cov  %>PrivacyPolicy<%= ext %>">Privacy Policy</a>
        <a id="<%= labelId %>-giveaway-terms" href="<%= cov  %>Giveaway-Terms<%= ext %>">Giveaway Terms</a>
        <a id="<%= labelId %>-shipping-policy" href="<%= cov  %>ShippingPolicy<%= ext %>">Shipping Policy</a>
        <a id="<%= labelId %>-return-policy" href="<%= cov  %>ReturnPolicy<%= ext %>">Return Policy</a>
        <% if (renderSitemap)
        { %>
        <a id="<%= labelId %>-sitemap" href="<%= cov  %>Sitemap<%= ext %>" aria-label="View all pages" title="View all pages">Sitemap</a>
        <% } %>
    </nav>
</div>

<% if (renderSitemap) { %>
<span class="footer__divide"></span>
<address class="section__block">
    <% Html.RenderSnippet("COMMON-FOOTER"); %>
</address>
<% } %>