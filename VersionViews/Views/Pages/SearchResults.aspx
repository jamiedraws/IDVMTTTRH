<%@ Page Language="C#" MasterPageFile="~/VersionViews/2.0000/Views/Layouts/InternalLayout.master" %>

<%@ Import Namespace="Dtm.Framework.ClientSites" %>
<%@ Import Namespace="Dtm.Framework.Base.Models" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server"></asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <%
        var products = TempData["Products"] as List<Dtm.Framework.Base.Models.CampaignProductView>;
        var navQuery = Request["n"] ?? string.Empty;
        var query = Request["query"] ?? string.Empty;
        var isNavSearch = navQuery != string.Empty && navQuery == "1";
        if (products == null)
        {

            var finalList = new List<CampaignProductView>();
            var allSearchableProducts = DtmContext.CampaignProducts
                .Where(cp =>
                   cp.PropertyIndexer.Has("Products") 
                   && cp.CategoryIndexer.Has("SEARCH") || (cp.CategoryIndexer.Has("STAGE-SEARCH") && DtmContext.IsStage))
                .ToList();

            if (query.ToLower() == "all")
            {
                finalList.AddRange(allSearchableProducts);
            }
            else
            {
                var regexMatchList = !isNavSearch ? DtmContext.CampaignProducts.Where(cp =>
                    Regex.IsMatch(cp.ProductName ?? string.Empty, query, RegexOptions.IgnoreCase)
                    || Regex.IsMatch(cp.DisplayText ?? string.Empty, query, RegexOptions.IgnoreCase)
                    || Regex.IsMatch(cp.MetaKeywords ?? string.Empty, query, RegexOptions.IgnoreCase)
                    || Regex.IsMatch(cp.ShortName ?? string.Empty, query, RegexOptions.IgnoreCase)).ToList() : 

                    DtmContext.CampaignProducts.Where(cp =>
                    Regex.IsMatch(cp.ProductName ?? string.Empty, query, RegexOptions.IgnoreCase)
                    || Regex.IsMatch(cp.MetaKeywords ?? string.Empty, query, RegexOptions.IgnoreCase)).ToList();

                var filteredList = regexMatchList.Where(p => (p.ProductType != "Option" && p.ProductType != "Shipping" && p.ProductType != "None")).ToList();

                foreach (var item in filteredList)
                {
                    var groupedItemList = allSearchableProducts.Where(cp => cp.ProductCode == item.ProductCode);

                    foreach (var groupedItem in groupedItemList)
                    {
                        if (!finalList.Any(x => x.ProductCode == groupedItem.ProductCode))
                        {
                            finalList.Add(groupedItem);

                        }
                    }
                }
            }
            products = finalList;
            TempData["CriteoProducts"] = finalList;
        }

        var hasProducts = products != null;
        var hasNoProducts = !hasProducts;
        var hasResults = hasProducts && products.Any();
        var hasNoResults = !hasResults;
    %>
    <main aria-labelledby="search-results-title" class="defer defer--from-top view section">
        <div id="search-results" class="view__anchor"></div>
        <div class="defer__progress view__in section__in">
            <div class="title">
                <h2 id="search-results-title" class="title__center">Shop MicroTouch</h2>
                <%
                    var resultsResponse = hasResults ? "Showing results for {0}" : "No search results found for {0}";   
                %>
                <p class="title__center"><%= string.Format(resultsResponse, query) %></p>
            </div>

            <% if (hasProducts)
                {
                    products = products.OrderBy(p => p.DisplayRank).ToList();
            %>
            <form class="form">
                <div class="story-card story-card--max-two">
                    <div id="search-results-group" class="story-card__group product product--grid">
                        <%
                            foreach (var product in products)
                            {
                                Html.RenderPartial("Product", new ViewDataDictionary
                                {
                                    { "product", product }
                                });
                            }
                        %>
                    </div>
                </div>
            </form>
            <% } %>
        </div>
    </main>

    <%
        if (hasNoResults)
        {
            Html.RenderPartial("ProductCategory", Model, ViewData);
        }
    %>
</asp:Content>
