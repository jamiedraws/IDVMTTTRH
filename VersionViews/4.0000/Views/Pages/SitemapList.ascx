<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>
<%@ Import Namespace="IDVMTTTRH.Navigation" %>

<%
    var productName = SettingsManager.ContextSettings["Label.ProductName"];
    var ext = DtmContext.ApplicationExtension;

    var renderSitemap = false;
    var renderSitemapValue = ViewData["renderSitemap"] as string ?? "True";
    Boolean.TryParse(renderSitemapValue, out renderSitemap);

    var renderFooter = false;
    var renderFooterValue = ViewData["renderFooter"] as string ?? "True";
    Boolean.TryParse(renderFooterValue, out renderFooter);

    var labelCategory = ViewData["labelCategory"] as string ?? "Footer";
    var labelId = labelCategory.Replace(" ", "-").ToLower();
%>

<div class="section__block">
    <nav aria-label="<%= String.Format("{0} {1}", labelCategory, "Offer information") %>" class="list">
        <%
            var sitemap = new Sitemap();
            var entries = sitemap.SitemapList.GetItemsByIdRange(new List<string> { "home", "shop", "customer-service", "privacy-policy", "shipping-policy", "return-policy", "sitemap" });

            if (!renderSitemap)
            {
                entries = entries.Where(e => e.Id != "sitemap").ToList();
            }

            foreach (var entry in entries)
            {
                %>
                <span class="list__link">
                    <a id="<%= labelId %>-<%= entry.Id %>" href="<%= entry.Page %>">
                        <%= entry.Name %>
                    </a>
                </span>
                <%
            }
        %>
    </nav>
</div>

<% if (renderFooter) { %>
<address class="section__block">
    <% Html.RenderSnippet("COMMON-FOOTER"); %>
</address>
<% } %>