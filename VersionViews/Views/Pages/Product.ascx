<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>
<%@ Import Namespace="Dtm.Framework.Base.Models" %>
<%@ Import Namespace="IDVMTTTRH.Models" %>

<%
    var layout = ViewData["layout"] as string ?? "PLP";
    var anchorLink = ViewData["anchorLink"] as string ?? "#products";
    var isPDP = layout == "PDP";
    var isPLP = layout == "PLP";
    var product = ViewData["product"] as CampaignProductView ?? null;
    var hasProduct = product != null;

    if (hasProduct)
    {
        var id = product.ProductCode;
        var name = product.PropertyIndexer["Name", product.ProductName ?? string.Empty];

        var shipping = String.Format("{0} SHIPPING", product.Shipping == 0 ? "FREE" : product.Shipping.ToString("C"));
        var price = String.Format("{0}", product.Price.ToString("C"));
        bool excludeFreeShipping = product.PropertyIndexer["ExcludeFreeShipping", false];

        // these items do not ship free as they are under $50 pricetag
        if (excludeFreeShipping) {
            price = product.Price.ToString("C");
        }
%>

<div class="product__item product__group">
    <div class="product__picture product__element">
        <div class="view slide slide--product bg">
        <%
            var productImages = new ProductImages(id);
            var images = productImages.GetImages();
            var imageDirectory = productImages.ImageDirectory;
            var nameHTML = name;

            var carouselId = string.Format("{0}-{1}", layout, id);
            var carousel = new ViewDataDictionary (ViewData) {
                { "id", carouselId },
                { "imageDirectory", imageDirectory }
            };

            if (isPDP)
            {
                var hasThumbnails = images.Count() > 1;

                price = String.Format("Price: {0}", price);
                nameHTML = String.Format(@"<h1 class=""product__title"">{0}</h1>", nameHTML);

                if (hasThumbnails)
                {
                    Html.RenderPartial("PictureCarousel", new ViewDataDictionary {
                        { "id", carouselId },
                        { "imageDirectory", imageDirectory },
                        { "display", "thumbnails" },
                        { "useThumbnailImages", true },
                        { "images", images }
                    });
                }
            } else
            {
                images = new List<string> { productImages.GetFirstImage() };
                nameHTML = String.Format(@"<h3 class=""product__title"">{0}</h3>", nameHTML);
            }

            carousel.Add("images", images);

            var largePicture = Html.Partial("PictureCarousel", carousel).ToString();

            var productCategory = ViewData["ProductCategory"] as ProductCategory ?? new ProductCategory();
            var productItem = new ProductItem(id, productCategory);
            
            var requestCode = Request[productCategory.QueryName] as string ?? string.Empty;
            var learnId = String.Format("product-image-learn-{0}", id);
            var learnLabel = string.Format("Learn more about the {0}", name);
            var learnLink = requestCode == id ? "#main" : productItem.GetRelativeProductPageUrl();

            ViewData["learnLink"] = learnLink;
            ViewData["learnLabel"] = learnLabel;

            if (isPLP)
            {
                largePicture = string.Format(@"<a href=""{0}"" aria-label=""{2}"" class=""product__link"">{1}</a>", learnLink, largePicture, learnLabel);

                %>
                <div id="<%= id %>" class="view__anchor"></div>
                <%
            }
        %>
            <%= largePicture %>
        </div>
    </div>

    <div class="product__content product__element">
        <div class="product__is-scrollable">
        <%= nameHTML %>
        <p class="product__price"><%= price %></p>
        <%
            Html.RenderPartial("ProductNav", Model, ViewData);
        %>
        <% if (isPDP)
           { %>
            <article class="product__text">
                <%= product.DisplayText %>
            </article>
        <% } %>
        </div>
    </div>
</div>

<% } %>
