<%@ Page Language="C#" MasterPageFile="~/VersionViews/4.0000/Views/Layouts/InternalLayout.master" Inherits="System.Web.Mvc.ViewPage<OrderPageViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>
<%@ Import Namespace="IDVMTTTRH.Models" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server"></asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<%
    var captureProduct = DtmContext.CampaignProducts.Where(cp => cp.ProductCode.Equals("ROVORHEADS"));

    if (!captureProduct.Any())
    {
        var landingPageUrl = DtmContext.OfferVersion.IsDefault 
            ? "/" 
            : String.Format("/{0}/{1}/index{2}", DtmContext.OfferCode, DtmContext.Version, DtmContext.ApplicationExtension);
        Response.Redirect(landingPageUrl);
    } 
    else
    {
%>

<main aria-labelledby="main-title" class="view section">
    <div id="main" class="view__anchor"></div>
    <div class="view__in section__in">
        <div class="product product--single product--for-rovorheads">
        <%
            // Product Info
            var product = captureProduct.FirstOrDefault();
            var id = product.ProductCode;

            // Product Images
            var productImages = new ProductImages(product.PropertyIndexer["ImageDirectory", id]);
            var allImages = productImages.GetImages();
            var images = allImages.Where(i => !i.Contains("lifestyle")).ToList();
            var imageDirectory = productImages.ImageDirectory;

            // Vimeo Attributes
            var fancyboxAttributes = new SortedList<int, string>();

            var vimeoId = product.PropertyIndexer["VimeoId", string.Empty];

            if (!string.IsNullOrEmpty(vimeoId))
            {
                var lastIndex = images.LastIndexOf(images.Last());

                fancyboxAttributes.Add(lastIndex, string.Format("https://player.vimeo.com/video/{0}", vimeoId));
            }

            // Product Carousel
            var slideClass = "slide slide--product";
            var carouselId = string.Format("PDP-{0}", id);
            var carousel = new ViewDataDictionary (ViewData) {
                { "id", carouselId },
                { "imageDirectory", imageDirectory },
                { "fancyboxAttributes", fancyboxAttributes }
            };
            var carouselHTML = string.Empty;

            var hasThumbnails = images.Count() > 1;

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

            carousel.Add("images", images);

            var largePicture = Html.Partial("PictureCarousel", carousel).ToString();

            carouselHTML += largePicture;
        %>
            <div class="product__item product__group">
                <div class="product__picture product__element">
                    <div class="view product__carousel <%= slideClass %>">
                        <div id="<%= id %>" class="view__anchor"></div>
                        <%
                            Response.Write(carouselHTML);
                        %>
                    </div>
                </div>
                <div class="product__content product__element">
                    <div class="product__is-scrollable">
                        <div class="offer-text-selection">
                            <h1 id="main-title" class="offer-text-selection__title">MicroTouch&reg; Titanium&reg; ROVOR&trade; Replacement Head*</h1>

                            <div class="offer-text-selection__direction">Please select an option based off the color of your cutting blades</div>

                            <div class="offer-text-selection__direction-continuation">Press the release buttons on both sides of the Shave Head to uncover the cutting blades</div>

                            <div class="offer-text-selection__group">
                                <%
                                    var captureBrovorProduct = DtmContext.CampaignProducts.Where(cp => cp.ProductCode.Equals("BROVORHEADS"));
                                    
                                    if (captureBrovorProduct.Any())
                                    {
                                %>
                                <div class="offer-text-selection__offer">
                                <%
                                    var brovorProduct = captureBrovorProduct.FirstOrDefault();
                                %>
                                    <picture>
                                        <img src="/images/products/BROVORHEADS/BROVORHEADS-PDP.jpg" loading="lazy" alt="" width="181" height="77"/>
                                    </picture>
                                    <div class="offer-text-selection__name">Black</div>
                                <%

                                    Html.RenderPartial("ProductNav", Model, new ViewDataDictionary
                                    {
                                        { "layout", "PDP" },
                                        { "product", brovorProduct }
                                    });
                                %>
                                </div>
                                <%
                                    }
                                %>

                                <div class="offer-text-selection__offer">
                                    <picture>
                                        <img src="/images/products/ROVORHEADS/ROVORHEADS-PDP.jpg" loading="lazy" alt="" width="181" height="77"/>
                                    </picture>
                                    <div class="offer-text-selection__name">Light Gray</div>
                                <%

                                    Html.RenderPartial("ProductNav", Model, new ViewDataDictionary
                                    {
                                        { "layout", "PDP" },
                                        { "product", product }
                                    });
                                %>
                                </div>

                                <div class="offer-text-selection__disclaimer">*Includes 1 Shave Head and 2 Cutting Blades</div>
                            </div>

                            <div class="offer-text-selection__recommendation">We recommend replacing the head of your ROVOR� every 6-12 months</div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    </div>
</main>


<%
    }
%>

</asp:Content>