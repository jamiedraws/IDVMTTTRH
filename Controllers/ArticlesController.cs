using Dtm.Framework.Base.Controllers;
using Dtm.Framework.ClientSites.Web;
using Dtm.Framework.ClientSites.Web.Controllers;
using System.Data;
using System.Web.Mvc;
using System.Linq;
using Dtm.Framework.Models.Ecommerce.Repositories;
using IDVMTTTRH.BlogPosts;
using IDVMTTTRH.Navigation;
using Dtm.Framework.Models.Ecommerce;
using System;
using Dtm.Framework.Base.Extensions;

namespace IDVMTTTRH.Controllers
{

    public class ArticlesController : ClientSiteController<ClientSiteViewData>
    {

        private readonly BlogPostsEngine blogPostsEngine;

        private readonly Paginate _paginate;

        public ArticlesController()
        {
            blogPostsEngine = new BlogPostsEngine();
            _paginate = new Paginate(3);
        }

        /// <summary>
        /// Pulls all blog posts that are available on the campaign and are marked as "Approved" from the blog manager.
        /// </summary>
        /// <returns></returns>
        public ActionResult GetPosts(string tagSlug)
        {
            SetOfferVersion();
            InitVisitorSession();

            string blogTagRoute = blogPostsEngine.GetParentRoute(tagSlug);
            var blogPosts = blogPostsEngine.GetBlogPostsByTagSlug(tagSlug);

            ViewData["BlogPostsEngine"] = blogPostsEngine;
            ViewData["BlogPosts"] = blogPosts.Skip(_paginate.GetSkipCountByPageParameter(Request["page"])).Take(_paginate.TakeCount).ToList();
            ViewData["Pages"] = _paginate.GetNumberOfPagesByList(blogPosts);

            ViewData["BlogTagName"] = blogPostsEngine.GetTagNameBySlug(tagSlug);
            ViewData["BlogTagRoute"] = blogTagRoute;
            ViewData["CurrentRoute"] = blogTagRoute;

            string view = string.Format("Blog-{0}", tagSlug);

            if (ViewEngines.Engines.FindPartialView(this.ControllerContext, view).View == null)
            {
                view = "Blog";
            }

            SetContextByPageCode("Blog");

            return View(view, Model);
        }

        /// <summary>
        /// Takes a <c>categorySlug</c>, representing the blog category, along with a <c>urlSlug</c>, representing the blog page slug and pulls for the blog entry.
        /// </summary>
        /// <param name="categorySlug"></param>
        /// <param name="urlSlug"></param>
        /// <returns></returns>
        public ActionResult GetPost(string categorySlug, string urlSlug, string tagSlug)
        {
            SetOfferVersion();
            InitVisitorSession();

            var blogPost = blogPostsEngine.GetBlogPostByUrlSlug(urlSlug, categorySlug, tagSlug);

            if (!blogPostsEngine.BlogPostExists(blogPost))
            {
                return RedirectToAction("GetPostsByCategory");
            }

            ViewData["BlogPost"] = blogPost;

            ViewData["BlogTagSlug"] = tagSlug;
            ViewData["BlogTagRoute"] = blogPostsEngine.GetParentRoute(tagSlug);
            ViewData["BlogTagName"] = blogPostsEngine.GetTagNameBySlug(tagSlug);

            var blogCategory = blogPostsEngine.GetBlogPostByCategorySlug(categorySlug, tagSlug);

            ViewData["BlogCategorySlug"] = categorySlug;
            ViewData["BlogCategoryRoute"] = blogPostsEngine.GetCategoryRoute(blogPost);
            ViewData["BlogCategoryName"] = blogCategory.Title ?? blogPostsEngine.GetCategoryNameBySlug(categorySlug);

            string permalinkRoute = blogPostsEngine.GetPermalink(blogPost);

            ViewData["BlogPermalinkRoute"] = permalinkRoute;
            ViewData["CurrentRoute"] = permalinkRoute;

            string view = string.Format("Article-{0}", tagSlug);

            if (ViewEngines.Engines.FindPartialView(this.ControllerContext, view).View == null)
            {
                view = "Article";
            }

            SetContextByPageCode("Article");

            return View(view, Model);
        }

        public ActionResult GetPostByTagSlug(string urlSlug, string tagSlug)
        {
            SetOfferVersion();
            InitVisitorSession();

            var blogPost = blogPostsEngine.GetBlogPostByTagSlug(urlSlug, tagSlug);

            if (!blogPostsEngine.BlogPostExists(blogPost))
            {
                return RedirectToAction("GetPostsByCategory");
            }

            ViewData["BlogPost"] = blogPost;

            ViewData["BlogTagSlug"] = tagSlug;
            ViewData["BlogTagRoute"] = blogPostsEngine.GetParentRoute(tagSlug);
            ViewData["BlogTagName"] = blogPostsEngine.GetTagNameBySlug(tagSlug);

            string permalinkRoute = blogPostsEngine.GetPermalink(blogPost);

            ViewData["BlogPermalinkRoute"] = permalinkRoute;
            ViewData["CurrentRoute"] = permalinkRoute;

            string view = string.Format("Article-{0}", tagSlug);

            if (ViewEngines.Engines.FindPartialView(this.ControllerContext, view).View == null)
            {
                view = "Article";
            }

            SetContextByPageCode("Article");

            return View(view, Model);
        }

        /// <summary>
        /// Takes a <c>categorySlug</c>, representing the category, and pulls for all blogs under that category that are marked as "Approved" from the blog manager
        /// </summary>
        /// <param name="categorySlug"></param>
        /// <returns></returns>
        public ActionResult GetPostsByCategory(string categorySlug, string tagSlug)
        {
            SetOfferVersion();
            InitVisitorSession();

            var blogPosts = blogPostsEngine.GetBlogPostsByCategorySlug(categorySlug, tagSlug);

            if (!blogPosts.Any())
            {
                return RedirectToAction("GetPosts");
            }

            ViewData["BlogPosts"] = blogPosts.Skip(_paginate.GetSkipCountByPageParameter(Request["page"])).Take(_paginate.TakeCount).ToList();
            ViewData["Pages"] = _paginate.GetNumberOfPagesByList(blogPosts);

            ViewData["BlgoTagSlug"] = tagSlug;
            ViewData["BlogTagRoute"] = blogPostsEngine.GetParentRoute(tagSlug);
            ViewData["BlogTagName"] = blogPostsEngine.GetTagNameBySlug(tagSlug);

            BlogPostView blogCategory = blogPostsEngine.GetBlogPostByCategorySlug(categorySlug, tagSlug);

            ViewData["BlogCategory"] = blogCategory;
            ViewData["BlogCategorySlug"] = categorySlug;
            ViewData["BlogCategoryName"] = blogCategory.Title ?? blogPostsEngine.GetCategoryNameBySlug(categorySlug);

            string categoryRoute = blogPostsEngine.GetCategoryRouteByCategorySlug(categorySlug, tagSlug);

            ViewData["BlogCategoryRoute"] = categoryRoute;
            ViewData["CurrentRoute"] = categoryRoute;

            string view = string.Format("Blog-{0}", tagSlug);

            if (ViewEngines.Engines.FindPartialView(this.ControllerContext, view).View == null)
            {
                view = "Blog";
            }

            SetContextByPageCode("Blog");

            return View(view, Model);
        }

        /// <summary>
        /// Responsible for setting the DtmContext information.
        /// </summary>
        private void InitVisitorSession()
        {
            var context = EcommerceDataContextManager.Current;
            var visitorSession = Request.RequestContext.HttpContext.Request.Cookies.LoadVisitorSessionFromCookie();

            DtmContext.InitializeFromVisitorSession(visitorSession, DtmContext.OfferCode, DtmContext.Version, context);
        }

        /// <summary>
        /// Sets the offer version context on the DtmContext object
        /// </summary>
        private void SetOfferVersion()
        {
            Guid covid = Guid.TryParse(Request["cver"], out covid) ? covid : Guid.Empty;
            if (covid != Guid.Empty && DtmContext.CampaignOfferVersions.Any(cov => cov.OfferVersionId == covid))
            {
                var offerVersion = DtmContext.CampaignOfferVersions.First(cov => cov.OfferVersionId == covid);
                DtmContext.OfferCode = offerVersion.OfferCode;
                DtmContext.Version = offerVersion.VersionNumber;
            }
        }

        /// <summary>
        /// Assigns the campaign page based on the <c>pageCode</c> parameter.
        /// </summary>
        /// <param name="pageCode"></param>
        private void SetContextByPageCode(string pageCode)
        {
            PageDefinition campaignPage = DtmContext.CampaignPages.FirstOrDefault(cp => cp.PageCode == pageCode);

            if (campaignPage != null)
            {
                DtmContext.Page = campaignPage;
                DtmContext.PageCode = campaignPage.PageCode;
            }

            MapModelPageInformation();
        }
    }
}