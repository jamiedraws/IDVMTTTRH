<%@ Page Language="C#" MasterPageFile="~/VersionViews/4.0000/Views/Layouts/ArticleLayout.master" Inherits="System.Web.Mvc.ViewPage<ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>
<%@ Import Namespace="Dtm.Framework.Models.Ecommerce" %>
<%@ Import Namespace="Dtm.Framework.Models.Ecommerce.Repositories" %>
<%@ Import Namespace="Dtm.Framework.Base.TokenEngines" %>
<%@ Import Namespace="IDVMTTTRH.BlogPosts" %>
<%@ Import Namespace="IDVMTTTRH.Utils" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/css/Site4/blog-article.css" rel="preload" as="style" />
    <link href="/css/Site4/blog-article.css" rel="stylesheet" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<% 
    // the instance provided by the controller
    var blogPostsEngine = ViewData["BlogPostsEngine"] as BlogPostsEngine ?? new BlogPostsEngine();

    // the current blog post, provided by the controller
    var blogPost = ViewData["BlogPost"] as BlogPostView ?? new BlogPostView();

    // the current blog roll category slug, provided by the controller
    var categorySlug = ViewData["BlogCategorySlug"] as string ?? blogPost.Categories.FirstOrDefault() ?? string.Empty;

    // the current blog roll category title, provided by the controller
    var categoryTitle = ViewData["BlogCategoryName"] as string ?? categorySlug.Replace("-", " ");

    // the current blog roll tag slug, provided by the controller
    var tagSlug = ViewData["BlogTagSlug"] as string ?? blogPost.Tags.FirstOrDefault() ?? string.Empty;
%>

<main aria-labelledby="main-title" class="view article section">
    <div id="main" class="view__anchor"></div>
    <div class="view__in article__in section__in">

        <div class="article__header section__block hero-banner">
            <%
                var pubDate = blogPost.ChangeDate.ToString("MMMM d, yyyy");
                var dateTime = blogPost.ChangeDate.ToString("o");
                var author = blogPost.Author ?? string.Empty;
            %>
            <%--<time dattime="<%= dateTime %>" class="article__date-address"><%= pubDate %></time>--%>

            <h1 id="main-title" class="article__title content__title"><%= blogPost.Title %></h1>
        </div>

        <%
            ImageEngine blogImages = ViewData["BlogImages"] as ImageEngine ?? new ImageEngine("blogs", "images/blogs");

            string thumbnail = blogPostsEngine.GetThumbnail(blogPost);
            string fileName = blogImages.GetImageFileNameWithExtension(thumbnail);
            string picture = blogImages.BuildHTMLPictureElement(fileName);   
        %>
        <div class="article__picture contain contain--excerpt-thumb">
            <%= picture %>
        </div>

        <article class="article__copy">
            <%
                var article = string.Empty;

                if (blogPostsEngine.IsExternal(blogPost))
                {

                    var description = blogPost.Description ?? string.Empty;

                    article = string.Format(@"
                        <picture 
                            class=""contain contain--post-card"">
                            <img src=""{0}"" alt="""">
                        </picture>
                    ", thumbnail);

                    if (description.StartsWith("https://") || description.StartsWith("http://"))
                    {
                        article = string.Format(@"
                        <a 
                            id=""external-excerpt-thumbnail""
                            target=""_blank""
                            href=""{0}""
                            class=""article__link"">{1}</a>
                        ", description, article);
                    }

                } else
                {
                    var toke = new TokenEngine();

                    article = toke.Process(blogPost.Description, baseClientViewData: Model).Content;
                }
            %>
            <%= article %>
        </article>

        <%
            var prevPost = blogPostsEngine.GetPreviousPost(blogPost, categorySlug, tagSlug);
            var nextPost = blogPostsEngine.GetNextPost(blogPost, categorySlug, tagSlug);
        %>

        <nav aria-label="View other articles" class="article article--nav">
            <% if (blogPostsEngine.BlogPostExists(prevPost)) { %>
            <a href="<%= prevPost.UrlSlug %>?cver=<%= DtmContext.VersionId %>" class="article__prev">
                <svg class="icon icon--chevron">
                    <use href="#icon-chevron"></use>
                </svg>
                <span>Previous</span>
            </a>
            <% } %>
            <% if (blogPostsEngine.BlogPostExists(nextPost)) { %>
            <a href="<%= nextPost.UrlSlug %>?cver=<%= DtmContext.VersionId %>" class="article__next">
                <span>Next</span>
                <svg class="icon icon--chevron">
                    <use href="#icon-chevron"></use>
                </svg>
            </a>
            <% } %>
        </nav>

    </div>
</main>

</asp:Content>