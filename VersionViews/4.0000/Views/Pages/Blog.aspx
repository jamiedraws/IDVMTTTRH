<%@ Page Language="C#" MasterPageFile="~/VersionViews/4.0000/Views/Layouts/BlogLayout.master" Inherits="System.Web.Mvc.ViewPage<ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>
<%@ Import Namespace="Dtm.Framework.Models.Ecommerce.Repositories" %>
<%@ Import Namespace="IDVMTTTRH.BlogPosts" %>
<%@ Import Namespace="IDVMTTTRH.Utils" %>
<%@ Import Namespace="HtmlAgilityPack" %>

<asp:Content ID="PageMetadata" ContentPlaceHolderID="PageMetadata" runat="server">

<%
    // the product name
    var productName = SettingsManager.ContextSettings["Label.ProductName"];

    // the current blog category post, provided by the controller
    var category = ViewData["BlogCategory"] as BlogPostView ?? new BlogPostView();

    // the current category name, provided by the controller
    var categoryTitle = ViewData["BlogCategoryName"] as string ?? ViewData["BlogTagName"] as string ?? Model.PageTitle;

    // parse and strip html tags from the category description
    var htmlDoc = new HtmlDocument();
    htmlDoc.LoadHtml(category.ShortDescription ?? String.Empty);

    // default category description
    var defaultDescription = "";

    // the current blog category description
    var categoryDescription = !string.IsNullOrWhiteSpace(category.ShortDescription) 
        ? htmlDoc.DocumentNode.InnerText 
        : defaultDescription;

    // the current blog category image 
    var categoryImage = category.ImageThumbnailPath ?? "";

    // the current blog post permalink route, provided by the controller
    var blogPermalinkRoute = ViewData["BlogPermalinkRoute"] as string;

    // the main blog roll category route, provided by the controller
    var blogCategoryRoute = ViewData["BlogCategoryRoute"] as string;

    // the main blog roll tag route, provided by the controller
    var blogTagRoute = ViewData["BlogTagRoute"] as string;

    var blogUrl = blogPermalinkRoute
        ?? blogCategoryRoute
        ?? blogTagRoute
        ?? string.Empty;

    var categoryMetaTitle = string.Format("{0} | {1}", categoryTitle, productName);    
%>

<title><%= categoryMetaTitle %></title>

<%= Html.Partial("MetaFavicon", new ViewDataDictionary
{
    { "Title", categoryMetaTitle },
    { "Description", categoryDescription },
    { "Url", blogUrl },
    { "Image", categoryImage } 
}) %>

</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="/css/Site4/blog-category.css" rel="preload" as="style" />
    <link href="/css/Site4/blog-category.css" rel="stylesheet" />
</asp:Content>

<asp:Content ID="PosterImage" ContentPlaceHolderID="PosterImage" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<%
    // the instance provided by the controller
    var blogPostsEngine = ViewData["BlogPostsEngine"] as BlogPostsEngine ?? new BlogPostsEngine();

    // the collection of blog posts related to the current category, provided by the controller
    var categoryPosts = ViewData["BlogPosts"] as List<BlogPostView> ?? blogPostsEngine.GetBlogPostsByTagSlug("articles");

    // the current blog category post, provided by the controller
    var category = ViewData["BlogCategory"] as BlogPostView ?? new BlogPostView();

    // the current category name, provided by the controller
    var categoryTitle = ViewData["BlogCategoryName"] as string ?? ViewData["BlogTagName"] as string ?? string.Empty;

    var isCategoryPage = blogPostsEngine.BlogPostExists(category);
%>

<main aria-labelledby="main-title" class="view content content--post-cards section">
    <div class="view__anchor" id="main"></div>
    <div class="view__in content__in section__in">
        <div class="section__block content__header content__text">
            <h1 id="main-title" class="content__title">News</h1>
        </div>
        <div class="section__block">
            <div class="content__group">
                <%
                    ImageEngine blogImages = new ImageEngine("blogs", "images/blogs");

                    categoryPosts = categoryPosts
                        .OrderByDescending(cp => cp.Tags.Any(t => string.Equals(t, "EXTERNAL", StringComparison.InvariantCultureIgnoreCase)))
                        .ThenByDescending(cp => cp.ChangeDate).ToList();

                    foreach (var blogPost in categoryPosts)
                    {
                        Html.RenderPartial("BlogArticleExcerpt", new ViewDataDictionary
                        {
                            { "BlogPost", blogPost },
                            { "BlogPostsEngine", blogPostsEngine },
                            { "BlogImages", blogImages }
                        });
                    }
                %>
            </div>
        </div>
    </div>
</main>

</asp:Content>