<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>
<%@ Import Namespace="IDVMTTTRH.Models" %>
<%@ Import Namespace="System.IO" %>

<%
    var productCategory = ViewData["ProductCategory"] as ProductCategory ?? new ProductCategory();
    var ui = ViewData["ui"] as string ?? "grid";
    var anchorId = "products";
    var anchorLink = String.Format("#{0}", anchorId);

    if (productCategory != null)
    {
        switch (ui)
        {
            case "grid":
                if (productCategory.HasCategory)
                {
                    var category = productCategory.Category;
                    var products = productCategory.GetProducts();

                    if (products.Any())
                    {
%>
<section aria-labelledby="products-title" class="view section defer defer--from-top">
    <div id="<%= anchorId %>" class="view__anchor"></div>
    <div class="view__in section__in defer__progress">
        <div class="title">
            <h2 class="title__center" id="products-title"><%= category.Description %></h2>
        </div>
        <div class="story-card story-card--max-two">
            <div class="story-card__group product product--grid">
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
    </div>
</section>
<%
            }
        }
        break;
    case "dropdown":
        if (productCategory.HasCategory)
        {
            var category = productCategory.Category;
            var products = productCategory.GetProducts();

            if (products.Any())
            {

%>
<div class="nav__drop nav__drop--grid">
    <button type="button" aria-haspopup="true" aria-expanded="false" class="nav__drop__toggle nav__link">
        <span>Products</span>
    </button>
    <div hidden class="nav__group nav__drop__group bg">
        <div class="nav__menu nav__menu--stack">
            <div class="nav__list">
                <%
                    foreach (var product in products)
                    {
                        var id = product.ProductCode;
                        var name = product.PropertyIndexer["Name", product.ProductName ?? string.Empty];

                        var productItem = new ProductItem(id, productCategory);
                        var requestCode = Request[productCategory.QueryName] as string ?? string.Empty;
                        var url = requestCode == id ? "#main" : productItem.GetRelativeProductPageUrl();

                        var productImages = new ProductImages(id);
                        //var thumbnail = productImages.GetFirstThumbnailPath();


                %>
                <a href="<%= url %>" class="nav__drop__link" id="nav-product-<%= id %>" aria-label="Learn more about <%= name %>">
                    <%--<picture class="contain contain--square nav__picture bg__picture" data-src-img="<%= thumbnail %>"></picture>--%>
                    <span class=""><%= name %></span>
                </a>
                <%
                    }
                %>
            </div>
        </div>
    </div>
</div>
<%

            }
        }

        break;
    case "PDP":
        var productCode = Request[productCategory.QueryName] as string ?? string.Empty;
        var requestProduct = DtmContext.CampaignProducts.FirstOrDefault(cp => cp.ProductCode == productCode);

        if (requestProduct != null)
        {
%>
<main aria-label="<%= requestProduct.ProductName %>" class="view section">
    <div id="main" class="view__anchor"></div>
    <div class="view__in section__in">
        <div class="product product--single">
            <%
                Html.RenderPartial("Product", new ViewDataDictionary {
                    { "product", requestProduct },
                    { "layout", "PDP" }
                });
            %>
        </div>
    </div>
</main>
<%
    }
    else
    {
%>
<main aria-labelledby="main-title" class="view article section">
    <div id="main" class="view__anchor"></div>
    <div class="view__in section__in">
        <div class="section__block article__copy center-text">
            <div class="title">
                <h1 id="main-title" class="article__title title__center">Uh oh, it looks like we don't have that item...</h1>
            </div>
            <p>We're sorry but the item you're looking for couldn't be found or isn't available at this time.</p>
            <a href="<%= anchorLink %>" class="button">
                <span>Shop All Products</span>
            </a>
        </div>
    </div>
</main>
<%
            }
            break;
        }
    }




%>