<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ClientSiteViewData>" %>
<%@ Import Namespace="IDVMTTTRH.BlogPosts" %>
<%@ Import Namespace="IDVMTTTRH.Utils" %>
<%@ Import Namespace="HtmlAgilityPack" %>

<%
    // the instance provided by the controller
    var blogPostsEngine = ViewData["BlogPostsEngine"] as BlogPostsEngine ?? new BlogPostsEngine();

    // the current blog post entry provided by the controller
    var blogPost = ViewData["BlogPost"] as BlogPostView ?? new BlogPostView();

    ImageEngine blogImages = ViewData["BlogImages"] as ImageEngine ?? new ImageEngine("blogs", "images/blogs");

    string postCardClassList = "post-card content__figure";

    // Fetch unique post thumbnail or default thumbnail
    var thumbnail = blogPostsEngine.GetThumbnail(blogPost);

    // Get permalink by external tag or default permalink
    var url =  blogPostsEngine.GetPermalinkByExternalTagOrDefault(blogPost);

    bool isExternal = blogPostsEngine.IsExternal(blogPost);

    // set the link attribute list
    var linkAttributeList = string.Format(@"href=""{0}""", url);

    // set target to open in a new tab if the permalink is external
    if (isExternal)
    {
        linkAttributeList = string.Format(@"{0} target=""_blank""", linkAttributeList);

        string host = new Uri(url).Host;
        string domain = host.Substring(host.LastIndexOf('.', host.LastIndexOf('.') - 1) + 1).Split('.').FirstOrDefault() ?? String.Empty;

        if (!string.IsNullOrEmpty(domain))
        {
            postCardClassList = string.Format("{0} post-card--{1}", postCardClassList, domain);
        }
    }

    // truncate description
    var maxDescriptionChars = 50;

    // parse and strip html tags from the category description
    var htmlDoc = new HtmlDocument();
    htmlDoc.LoadHtml(blogPost.ShortDescription ?? String.Empty);

    var description = htmlDoc.DocumentNode.InnerText;
    var shortDescription = description;

    if (description.Length >= maxDescriptionChars)
    {
        shortDescription = string.Format(@"{0}...", shortDescription.Substring(0, maxDescriptionChars));
    }
    %>
    <figure class="<%= postCardClassList %>">
        <a <%= linkAttributeList %> class="post-card__picture contain contain--post-card">
            <%
                string fileName = blogImages.GetImageFileNameWithExtension(thumbnail);
                string picture = blogImages.BuildHTMLPictureElement(fileName);   
                
                Response.Write(picture);
            %>
        </a>   
        <figcaption class="post-card__caption">
            <h2 class="post-card__title"><%= blogPost.Title %></h2>
        </figcaption>
        <div class="post-card__footer">
            <a <%= linkAttributeList %> class="post-card__link">
                <span>See Full Article</span>
            </a>
        </div>
    </figure>