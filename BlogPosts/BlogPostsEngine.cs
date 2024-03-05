using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using Dtm.Framework.ClientSites.Web;
using Dtm.Framework.Models.Ecommerce;
using Dtm.Framework.Models.Ecommerce.Repositories;

namespace IDVMTTTRH.BlogPosts
{
    public class BlogPostsEngine
    {
        private readonly BlogPostRepository _blogRepo = new BlogPostRepository();
        private readonly string _categoryTag = "category";
        /// <summary>
        /// Represents the default thumbnail image for a blog post that doesn't contain a custom thumbnail image.
        /// </summary>
        public readonly string DefaultThumbnail = "/images/blogs/default/default.svg";

        /// <summary>
        /// Capable of pulling blog posts from the blog manager interface, determining if a blog post exists or is a reference to an external url, providing blog post thumbnails, routing strings, etc.
        /// </summary>
        public BlogPostsEngine(string defaultThumbnail)
        {
            DefaultThumbnail = defaultThumbnail;
        }

        public BlogPostsEngine()
        {
        }


        private List<BlogPostView> _approvedBlogPosts;
        private List<BlogPostView> ApprovedBlogPosts
        {
            get
            {
                if (_approvedBlogPosts == null)
                {
                    _approvedBlogPosts = _blogRepo.Get(DtmContext.CampaignCode, true, false);
                }

                return _approvedBlogPosts;
            }
        }

        /// <summary>
        /// Pulls all blogs from the blog manager that are associated with the campaign, marked as "Approved" and are organized by the descending date.
        /// </summary>
        /// <returns></returns>
        public IEnumerable<BlogPostView> GetBlogPosts(int skipCount = 0, int takeCount = -1)
        {
            return ApprovedBlogPosts
                .Where(bp => bp.Categories.Any())
                .OrderByDescending(bp => bp.AddDate)
                .Skip(skipCount)
                .Take(takeCount) ?? new List<BlogPostView>();
        }

        /// <summary>
        /// Takes a <c>tagSlug</c>, representing the blog post tag name, and pulls for all blog posts that are tagged under the provided slug name. All results are returned in a list of <c>BlogPost</c>.
        /// </summary>
        /// <param name="tagSlug"></param>
        /// <param name="skipCount"></param>
        /// <param name="takeCount"></param>
        /// <returns></returns>
        public List<BlogPostView> GetBlogPostsByTagSlug(string tagSlug)
        {
            var blogPosts = ApprovedBlogPosts
                .Where(bp => bp.Tags.Any(bt => string.Equals(bt, tagSlug, StringComparison.InvariantCultureIgnoreCase)));

            var categoryPosts = blogPosts
                .Where(bp => bp.Tags.Any(bt => string.Equals(bt, _categoryTag, StringComparison.InvariantCultureIgnoreCase)));

            var results = categoryPosts.Any() ? categoryPosts : blogPosts;

            return results.OrderByDescending(bp => bp.AddDate).ToList() ?? new List<BlogPostView>();
        }

        /// <summary>
        /// Takes a <c>postSlug</c>, representing the blog post slug name, along with the <c>categorySlug</c>, representing the blog post category slug name, plus the <c>tagSlug</c>, representing the blog post tag name, and pulls for the specific blog post object.
        /// </summary>
        /// <param name="postSlug"></param>
        /// <param name="categorySlug"></param>
        /// <param name="tagSlug"></param>
        /// <returns></returns>
        public BlogPostView GetBlogPostByUrlSlug(string postSlug, string categorySlug, string tagSlug)
        {
            return ApprovedBlogPosts
                .FirstOrDefault(bp => string.Equals(bp.UrlSlug, postSlug, StringComparison.InvariantCultureIgnoreCase)
                    && bp.Categories.Any(bc => string.Equals(bc, categorySlug, StringComparison.InvariantCultureIgnoreCase))
                    && bp.Tags.Any(bt => string.Equals(bt, tagSlug, StringComparison.InvariantCultureIgnoreCase))
                ) ?? new BlogPostView();
        }

        /// <summary>
        /// Takes a <c>postSlug</c>, representing the blog post slug name, along with the <c>tagSlug</c>, representing the blog post tag name, and pulls for the specific blog post object.
        /// </summary>
        /// <param name="postSlug"></param>
        /// <param name="tagSlug"></param>
        /// <returns></returns>
        public BlogPostView GetBlogPostByTagSlug(string postSlug, string tagSlug)
        {
            return ApprovedBlogPosts
                .FirstOrDefault(bp => string.Equals(bp.UrlSlug, postSlug, StringComparison.InvariantCultureIgnoreCase)
                    && bp.Tags.Any(bt => string.Equals(bt, tagSlug, StringComparison.InvariantCultureIgnoreCase))
                ) ?? new BlogPostView();
        }

        /// <summary>
        /// Takes a <c>categorySlug</c>, representing the name of a specific category tag in the blog manager, and pulls for all blog posts that are categorized under the provided slug name. All results are returned in a list of <c>BlogPost</c>.
        /// </summary>
        /// <param name="categorySlug"></param>
        /// <param name="tagSlug"></param>
        /// <param name="skipCount"></param>
        /// <param name="takeCount"></param>
        /// <returns></returns>
        public List<BlogPostView> GetBlogPostsByCategorySlug(string categorySlug, string tagSlug)
        {
            return ApprovedBlogPosts
                .Where(bp => bp.Categories.Any(bc => string.Equals(bc, categorySlug, StringComparison.InvariantCultureIgnoreCase))
                    && bp.Tags.Any(bt => string.Equals(bt, tagSlug, StringComparison.InvariantCultureIgnoreCase))
                    && bp.Tags.All(bt => !string.Equals(bt, _categoryTag, StringComparison.InvariantCultureIgnoreCase))
                )
                .OrderByDescending(bp => bp.AddDate)
                .ToList() ?? new List<BlogPostView>();
        }

        public BlogPostView GetBlogPostByCategorySlug(string categorySlug, string tagSlug)
        {
            return ApprovedBlogPosts
                .FirstOrDefault(bp => bp.Categories.Any(bc=> string.Equals(bc, categorySlug, StringComparison.InvariantCultureIgnoreCase))
                    && bp.Tags.Any(bt => string.Equals(bt, tagSlug, StringComparison.InvariantCultureIgnoreCase))
                    && bp.Tags.Any(bt=> string.Equals(bt, _categoryTag, StringComparison.InvariantCultureIgnoreCase))
                ) ?? new BlogPostView();
        }

        /// <summary>
        /// Takes a <c>BlogPost</c> object along with a <c>category</c>, representing the category the blog post falls under, and pulls for the previous blog post, based on the change date.
        /// </summary>
        /// <param name="blogPost"></param>
        /// <param name="categorySlug"></param>
        /// <param name="tagSlug"></param>
        /// <returns></returns>
        public BlogPostView GetPreviousPost(BlogPostView blogPost, string categorySlug, string tagSlug)
        {
            return ApprovedBlogPosts
                .Where(bp=> bp.Categories.Any(bc => string.Equals(bc, categorySlug, StringComparison.InvariantCultureIgnoreCase))
                    && bp.Tags.Any(bt => string.Equals(bt, tagSlug, StringComparison.InvariantCultureIgnoreCase))
                    && bp.Tags.All(bt=> !string.Equals(bt,_categoryTag, StringComparison.InvariantCultureIgnoreCase))
                    && bp.AddDate < blogPost.AddDate
                )
                .OrderByDescending(bp => bp.AddDate)
                .FirstOrDefault() ?? new BlogPostView();
        }

        /// <summary>
        /// Takes a <c>BlogPost</c> object along with a <c>category</c>, representing the category the blog post falls under, and pulls for the next blog post, based on the change date.
        /// </summary>
        /// <param name="blogPost"></param>
        /// <param name="categorySlug"></param>
        /// <param name="tagSlug"></param>
        /// <returns></returns>
        public BlogPostView GetNextPost(BlogPostView blogPost, string categorySlug, string tagSlug)
        {
            return ApprovedBlogPosts
                .Where(bp => bp.Categories.Any(bc => string.Equals(bc, categorySlug, StringComparison.InvariantCultureIgnoreCase))
                    && bp.Tags.Any(bt => string.Equals(bt, tagSlug, StringComparison.InvariantCultureIgnoreCase))
                    && bp.Tags.All(bt => !string.Equals(bt, _categoryTag, StringComparison.InvariantCultureIgnoreCase))
                    && bp.AddDate > blogPost.AddDate
                )
                .OrderBy(bp => bp.AddDate)
                .FirstOrDefault() ?? new BlogPostView();
        }

        public bool HasNextPage(List<BlogPostView> blogPosts, int skipCout = 0)
        {
            return blogPosts.Skip(skipCout).Any();
        }

        /// <summary>
        /// Takes a <c>BlogPost</c> object and determines if the post exists
        /// </summary>
        /// <param name="blogPost"></param>
        /// <returns></returns>
        public bool BlogPostExists(BlogPostView blogPost)
        {
            return blogPost.IsApproved;
        }

        /// <summary>
        /// Check if blog post is tagged with external
        /// </summary>
        /// <param name="blogPost"></param>
        /// <returns></returns>
        public bool IsExternal(BlogPostView blogPost)
        {
            return blogPost.Tags
                .Any(t => string.Equals(t, "EXTERNAL", StringComparison.InvariantCultureIgnoreCase));
        }

        /// <summary>
        /// Fetch unique post thumbnail or default thumbnail     
        /// </summary>
        /// <param name="blogPost"></param>
        /// <returns></returns>
        public string GetThumbnail(BlogPostView blogPost)
        {
            return HasThumbnail(blogPost) ? blogPost.ImageThumbnailPath : DefaultThumbnail;
        }

        /// <summary>
        /// Determines if a blog post contains a valid thumbnail path
        /// </summary>
        /// <param name="blogPost"></param>
        /// <returns></returns>
        public bool HasThumbnail(BlogPostView blogPost)
        {
            return !string.IsNullOrEmpty(blogPost.ImageThumbnailPath)
                && File.Exists(DtmContext.ProjectPath + blogPost.ImageThumbnailPath ?? string.Empty);
        }

        /// <summary>
        /// Fetch full URL structure for unique post thumbnail or default thumbnail
        /// </summary>
        /// <param name="blogPost"></param>
        /// <returns></returns>
        public string GetFullPathThumbnail(BlogPostView blogPost)
        {
            return DtmContext.Domain.FullDomain + GetThumbnail(blogPost);
        }

        /// <summary>
        /// Returns the blog permalink route: Example: "/articles/category/permalink"
        /// </summary>
        /// <param name="blogPost"></param>
        /// <returns></returns>
        public string GetPermalink(BlogPostView blogPost)
        {
            return string.Format("{0}/{1}?cver={2}", GetCategoryRoute(blogPost), blogPost.UrlSlug, DtmContext.VersionId).ToLower();
        }

        /// <summary>
        /// Returns the blog parent route. Example: "/articles"
        /// </summary>
        /// <returns></returns>
        public string GetParentRoute(string tagSlug)
        {
            return string.Format("/{0}", tagSlug).ToLower();
        }

        /// <summary>
        /// Takes a category slug and returns the human-friendly category name
        /// </summary>
        /// <param name="categorySlug"></param>
        /// <returns></returns>
        public string GetCategoryNameBySlug(string categorySlug)
        {
            return (categorySlug ?? string.Empty).Replace("-", " ");
        }

        /// <summary>
        /// Takes a tag slug and returns the human-friendly tag name
        /// </summary>
        /// <param name="tagSlug"></param>
        /// <returns></returns>
        public string GetTagNameBySlug(string tagSlug)
        {
            return (tagSlug ?? string.Empty).Replace("-", " ");
        }

        /// <summary>
        /// Returns the blog category route: Example: "/articles/category"
        /// </summary>
        /// <param name="blogPost"></param>
        /// <returns></returns>
        public string GetCategoryRoute(BlogPostView blogPost)
        {
            var tagSlug = blogPost.Tags.FirstOrDefault(t => !string.Equals(t, "EXTERNAL", StringComparison.InvariantCultureIgnoreCase)) ?? string.Empty;

            var category = blogPost.Categories.FirstOrDefault();

            if (category == null)
            {
                return GetParentRoute(tagSlug);
            }

            return GetCategoryRouteByCategorySlug(category, tagSlug);
        }

        /// <summary>
        /// Returns the blog category route using a category slug and a tag slug. Example: "/articles/category-slug"
        /// </summary>
        /// <param name="categorySlug"></param>
        /// <param name="tagSlug"></param>
        /// <returns></returns>
        public string GetCategoryRouteByCategorySlug(string categorySlug, string tagSlug)
        {
            return string.Format("{0}/{1}", GetParentRoute(tagSlug), categorySlug);
        }

        /// <summary>
        /// Returns the permalink by external tag or default permalink
        /// </summary>
        /// <param name="blogPost"></param>
        /// <returns></returns>
        public string GetPermalinkByExternalTagOrDefault(BlogPostView blogPost)
        {
            var permalink = GetPermalink(blogPost);

            if (IsExternal(blogPost))
            {
                var description = blogPost.Description ?? string.Empty;
                var isUrl = description.StartsWith("https://") || description.StartsWith("http://");

                if (isUrl)
                {
                    permalink = description;
                }
            }

            return permalink;
        }
    }
}