<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>

<%
    var id = ViewData["id"] as string ?? "picture";
    var imageDirectory = ViewData["imageDirectory"] as string ?? string.Empty;
    var display = ViewData["display"] as string ?? "carousel";

    var images = ViewData["images"] as List<string> ?? new List<string>();
    var imageAmount = images.Count();

    var isThumbnails = display == "thumbnails";
    var hasThumbnails = isThumbnails && imageAmount > 1;
    var useThumbnailImages = ViewData["useThumbnailImages"] as bool? ?? false;

    var fancyboxAttributes = ViewData["fancyboxAttributes"] as SortedList<int, string> ?? new SortedList<int, string>();
    var hasFancyboxAttributes = fancyboxAttributes.Count() > 0;

    if (!String.IsNullOrEmpty(id) && imageAmount > 0)
    {
        if (hasThumbnails)
        {
            var thumbnails = string.Empty;

            foreach (var image in images)
            {
                var index = images.IndexOf(image);
                var thumbnailId = string.Format("{0}-{1}", id, index);
                var thumbnailContent = string.Empty;

                var thumbnailAttributes = string.Format(@" 
                    href=""javascript:void(0);""
                    data-href=""#{0}""
                    data-slide-index=""{1}""", thumbnailId, index);

                if (hasFancyboxAttributes)
                {
                    var src = fancyboxAttributes.Where(a => a.Key == index);

                    if (src.Any())
                    {
                        thumbnailAttributes = string.Format(@"
                        {0}
                        data-fancybox
                        data-type=""iframe""
                        data-src=""{1}""", thumbnailAttributes, src.FirstOrDefault().Value);

                        thumbnailContent = @"<div class=""slide__play-icon play""></div>";
                    }
                }

                if (useThumbnailImages)
                {
                    var thumbnailImage = string.Format("/{0}/{1}", imageDirectory, image);
                    var thumbnailAlt = string.Format("Thumbnail picture for slide #{0}", index);

                    thumbnailContent = string.Format(@"
                        <picture 
                            class=""contain contain--square""
                            data-src-img=""{0}""
                            data-attr='{{ ""alt"" : ""{1}"" }}'>
                            {2}
                            <noscript>
                                <img src=""{0}"" alt=""{1}"">
                            </noscript>
                        </picture>
                    ", thumbnailImage, thumbnailAlt, thumbnailContent);

                    thumbnailAttributes = string.Format(@"
                        {0}
                        class=""slide__thumbnail""
                    ", thumbnailAttributes);
                }
                else
                {
                    thumbnailAttributes = string.Format(@"
                        {0} class=""slide__thumbnail slide__dot""", thumbnailAttributes);
                }

                thumbnails += string.Format(@"<a {0}>{1}</a>", thumbnailAttributes, thumbnailContent);
            }

            var nav = string.Format(@"<nav class=""slide__thumbnails"" id=""{0}-thumbnails"">
                {1}
            </nav>", id, thumbnails);

            %>
            <%= nav %>
            <%
        } else
        {
            var slides = string.Empty;

            foreach (var image in images)
            {
                var index = images.IndexOf(image);

                var slideImage = string.Format("/{0}/{1}", imageDirectory, image);
                var slideId = string.Format("{0}-{1}", id, index);
                var slideAlt = string.Format("Thumbnail picture for slide #{0}", index);
                var slideContent = string.Empty;
                var slideCSSClassList = "view slide__item contain contain--square bg__picture";

                if (index == 0)
                {
                    slideCSSClassList = string.Format("{0} slide__item--current", slideCSSClassList);
                }

                var slideAttributes = string.Format(@"
                    class=""{2}""
                    data-src-img=""{0}""
                    data-attr='{{ ""alt"" : ""{1}"" }}'
                ", slideImage, string.Empty, slideCSSClassList);

               if (hasFancyboxAttributes)
                {
                    var src = fancyboxAttributes.Where(a => a.Key == index);

                    if (src.Any())
                    {
                        slideAttributes = string.Format(@"
                        {0}
                        data-fancybox
                        data-type=""iframe""
                        data-src=""{1}""", slideAttributes, src.FirstOrDefault().Value);

                        slideContent = @"<div class=""slide__play-icon play""></div>";
                    }
                }

                slideContent = string.Format(@"<picture id=""{1}""
                    {0}>
                    {4}
                    <noscript>
                        <img src=""{2}"" alt=""{3}"">
                    </noscript>
                </picture>", slideAttributes, slideId, slideImage, string.Empty, slideContent);

                slides += slideContent;
            }

            var carousel = string.Format(@"<div
                id=""carousel-{0}""
                class=""slide__into""
                tabindex=""0""
            >
            {1}
            </div>", id, slides);

            %>
            <%= carousel %>
            <%
        }
    }
%>