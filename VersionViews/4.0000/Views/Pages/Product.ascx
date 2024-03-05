<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>
<%@ Import Namespace="Dtm.Framework.Base.Models" %>
<%@ Import Namespace="IDVMTTTRH.Models" %>

<%
    // View Configuration Settings
    var layout = ViewData["layout"] as string ?? "PLP";
    var anchorLink = ViewData["anchorLink"] as string ?? "#products";
    var imageDirectoryId = ViewData["imageDirectoryId"] as string ?? string.Empty;
    var isPDP = layout == "PDP";
    var isPLP = layout == "PLP";
    var isCart = layout == "Cart";
    var product = ViewData["product"] as CampaignProductView ?? null;

    var hasProduct = product != null;

    if (hasProduct)
    {
        // Product Info
        var id = product.ProductCode;

        imageDirectoryId = string.IsNullOrEmpty(imageDirectoryId) ? id : imageDirectoryId;

        var name = product.PropertyIndexer["ShortName", product.PropertyIndexer["Name", product.ProductName ?? string.Empty]];
        var description = product.PropertyIndexer["Description", string.Empty];

        if (isPDP)
        {
            description = product.PropertyIndexer["LongDescription", description];
        }

        // Product Navigation
        var productCategory = ViewData["ProductCategory"] as ProductCategory ?? new ProductCategory();
        var productItem = new ProductItem(id, productCategory);
        var requestCode = Request[productCategory.QueryName] as string ?? string.Empty;
        var learnId = String.Format("product-image-learn-{0}", id);
        var learnLabel = string.Format("Learn more about the {0}", name);
        var learnLink = requestCode == id ? "#main" : productItem.GetRelativeProductPageUrl();

        ViewData["learnLink"] = learnLink;
        ViewData["learnLabel"] = learnLabel;

        // HTML Transforms
        var nameHTML = name;
        nameHTML = String.Format(@"<div class=""product__title"">{0}</div>", nameHTML);
        var shipping = String.Format("{0} SHIPPING", product.Shipping == 0 ? "FREE" : product.Shipping.ToString("C"));
        var price = String.Format("{0} + {1}", product.Price.ToString("C"), shipping);
        bool excludeFreeShipping = product.PropertyIndexer["ExcludeFreeShipping", false];

        // these items do not ship free as they are under $50 pricetag
        if (excludeFreeShipping) {
            price = product.Price.ToString("C");
        }

        // Product Images
        var productImages = new ProductImages(imageDirectoryId);
        var allImages = productImages.GetImages();
        var images = allImages.Where(i => !i.Contains("lifestyle")).ToList();
        var thumbnail = productImages.GetFirstThumbnailPath();
        var imageDirectory = productImages.ImageDirectory;
        var firstImage = productImages.GetFirstImage();

        // Vimeo Attributes
        var fancyboxAttributes = new SortedList<int, string>();

        var vimeoId = product.PropertyIndexer["VimeoId", string.Empty];

        if (!string.IsNullOrEmpty(vimeoId) && images.Count > 0)
        {
            var lastIndex = images.LastIndexOf(images.Last());

            fancyboxAttributes.Add(lastIndex, string.Format("https://player.vimeo.com/video/{0}", vimeoId));
        }

        // Product Carousel
        var slideClass = "slide slide--product";
        var carouselId = string.Format("{0}-{1}", layout, id);
        var carousel = new ViewDataDictionary {
            { "id", carouselId },
            { "imageDirectory", imageDirectory },
            { "fancyboxAttributes", fancyboxAttributes }
        };
        var carouselHTML = string.Empty;

        if (isPDP)
        {
            var hasThumbnails = images.Count() > 1;

            price = String.Format("Price: {0}", price);
            nameHTML = String.Format(@"<h1 class=""product__title"">{0}</h1>", nameHTML);

            if (hasThumbnails)
            {
                carouselHTML += Html.Partial("PictureCarousel", new ViewDataDictionary {
                    { "id", carouselId },
                    { "imageDirectory", imageDirectory },
                    { "display", "thumbnails" },
                    { "useThumbnailImages", true },
                    { "images", images },
                    { "fancyboxAttributes", fancyboxAttributes }
                }).ToString();
            }
        } else {
            images = new List<string> { firstImage };
        }

        if (isPLP)
        {
            slideClass = string.Format("{0} slide--fade", slideClass);

            var lifestyleImage = allImages.Where(
                i => i.Contains("lifestyle") &&
                i.Contains(productImages.GetImageFileName(firstImage))
            );

            if (lifestyleImage.Any())
            {
                images.Add(lifestyleImage.FirstOrDefault());
            }
        }

        carousel.Add("images", images);

        var largePicture = Html.Partial("PictureCarousel", carousel).ToString();

        if (isPLP)
        {
            largePicture = string.Format(@"<a href=""{0}"" aria-label=""{2}"" class=""product__link"">{1}</a>", learnLink, largePicture, learnLabel);
        }

        if (isCart)
        {
            if (!String.IsNullOrEmpty(thumbnail)) {
                largePicture = string.Format(@"<a href=""{0}"" aria-label=""{2}"" class=""product__link""><img src=""{1}"" alt=""Thumbnail"" loading=""lazy""></a>", learnLink, thumbnail, learnLabel);
            } else {
                largePicture = string.Format(@"<a href=""{0}"" aria-label=""{2}"" class=""product__link"">{1}</a>", learnLink, largePicture, learnLabel);
            }
        }

        carouselHTML += largePicture;

        bool showAddToCart = ViewData["showAddToCart"] as bool? ?? true;

        string productItemClassList = "product__item product__group";

        if (!showAddToCart)
        {
            productItemClassList = string.Format(@"{0} product product--no-form", productItemClassList);
        }
%>

<div class="<%= productItemClassList %>">
    <div class="product__picture product__element">
        <div class="view product__carousel <%= slideClass %>">
            <div id="<%= id %>" class="view__anchor"></div>
            <%
                if (isPLP)
                {
                    Response.Write(nameHTML);
                }

                Response.Write(carouselHTML);
            %>
        </div>
    </div>
    <div class="product__content product__element">
        <div class="product__is-scrollable">
        <%
            if (isPDP || isCart)
            {
                Response.Write(nameHTML);
            }

            if (!string.IsNullOrEmpty(description))
            {
                var hasLongDescriptor = description.Count() > 30;
                var descriptionClass = hasLongDescriptor ? "product__description--long" : "product__description--short";

                %>
                <div class="product__description <%= descriptionClass %>"><%= description %></div>
                <%
            }

            Html.RenderPartial("ProductNav", Model, ViewData);

            if (isPDP && !string.IsNullOrEmpty(product.DisplayText))
            { %>
            <div class="product__text">
                <%= product.DisplayText %>
            </div>
        <% } %>
        </div>
    </div>
</div>

<% } %>