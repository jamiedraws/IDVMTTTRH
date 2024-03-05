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
                    href=""#{0}"" 
                    data-slide-index=""{1}""", thumbnailId, index);

                if (useThumbnailImages)
                {
                    var thumbnailImage = string.Format("/{0}/{1}", imageDirectory, image);
                    var thumbnailAlt = string.Format("Thumbnail picture for slide #{0}", index);

                    thumbnailContent = string.Format(@"
                        <picture 
                            class=""contain contain--square""
                            data-src-img=""{0}""
                            data-attr='{{ ""alt"" : ""{1}"" }}'>
                            <noscript>
                                <img src=""{0}"" alt=""{1}"">
                            </noscript>
                        </picture>
                    ", thumbnailImage, thumbnailAlt);

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

                slides += string.Format(@"<picture 
                    id=""{0}"" 
                    class=""slide__item contain contain--square bg__picture""
                    data-src-img=""{1}""
                    data-attr='{{ ""alt"" : ""{2}"" }}'>
                    <noscript>
                        <img src=""{1}"" alt=""{2}"">
                    </noscript>
                </picture>", slideId, slideImage, string.Empty);
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