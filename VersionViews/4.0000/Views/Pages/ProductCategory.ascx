<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>
<%@ Import Namespace="IDVMTTTRH.Models" %>
<%@ Import Namespace="System.IO" %>

<%
    var categoryCode = ViewData["CategoryCode"] as string ?? string.Empty;
    var productCategory = ViewData["ProductCategory"] as ProductCategory ?? new ProductCategory(categoryCode);
    List<string> placeholders = ViewData["Placeholders"] as List<string> ?? new List<string>();

    var ui = ViewData["ui"] as string ?? "grid";
    var anchorId = "products";
    var anchorLink = string.Format("/{0}/{1}/Index{2}#{3}", DtmContext.OfferCode, DtmContext.Version, DtmContext.ApplicationExtension, anchorId);

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
                        string storyCardClassList = "story-card";
                        int productQuantity = products.Count + placeholders.Count;

                        if (productQuantity > 0)
                        {
                            storyCardClassList = string.Format(@"story-card--max-{0}", productQuantity < 6 && productQuantity % 2 == 0 ? "two" : "three");
                        }
%>
<section aria-labelledby="products-title" class="view section product product--grid">
    <div id="<%= anchorId %>" class="view__anchor"></div>
    <div class="view__in product__in section__in">
        <h2 class="title" id="products-title"><%= category.Description %></h2>
        <div class="<%= storyCardClassList %>">
            <div class="story-card__group product">
                <%
                    foreach (var product in products)
                    {
                        var isOutOfStock = (!string.IsNullOrWhiteSpace(product.PropertyIndexer["IsOOS"])) ? product.PropertyIndexer["IsOOS", false] : false;
                        var showAddToCart = product.PropertyIndexer["ShowAddToCartPLP", true];
                        if (isOutOfStock) 
                        {
                            showAddToCart = false;
                        }

                        Html.RenderPartial("Product", new ViewDataDictionary
                        {
                            { "product", product },
                            { "imageDirectoryId", product.PropertyIndexer["ImageDirectory", string.Empty] },
                            { "showAddToCart", showAddToCart }
                        });
                    }

                    foreach (string placeholder in placeholders)
                    {
                        %>
                        <div class="product__item product__group product__placeholder">
                            <div class="product__picture">
                                <%= placeholder %>
                            </div>
                        </div>
                        <%
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
                    { "layout", "PDP" },
                    { "imageDirectory", requestProduct.PropertyIndexer["ImageDirectory", string.Empty] }
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
<main aria-labelledby="main-title" class="view content content--title-desc section">
    <div id="main" class="view__anchor"></div>
    <div class="view__in section__in">
        <div class="content__text">
            <h1 id="main-title" class="title content__title">Uh oh, it looks like we don't have that item...</h1>
            <div class="content__desc">We're sorry but the item you're looking for couldn't be found or isn't available at this time.</div>
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