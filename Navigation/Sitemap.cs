using IDVMTTTRH.Models;

namespace IDVMTTTRH.Navigation
{
    public class Sitemap
    {
        public NavigationList SitemapList;
        public Sitemap ()
        {
            SitemapList = new NavigationList();

            // Home
            SitemapList.AddItem(new NavigationItem
            {
                Id = "home",
                Name = "Home",
                Page = "Index",
                Hash = "#main"
            });

            // Products
            SitemapList.AddItem(new NavigationItem
            {
                Id = "products",
                Name = "Products",
                Hash = "#products",
                ApplyHash = true,
                IsDropDown = true
            });

            // Replacements
            SitemapList.AddItem(new NavigationItem
            {
                Id = "replacement",
				Name = "Replacement Heads & Blades",
				Page = "Replacement",
				Hash = "#main"
            });

            // Videos
            SitemapList.AddItem(new NavigationItem
            {
                Id = "videos",
                Name = "Product Videos",
                Page = "Videos",
                Hash = "#main"
            });

            // Videos List
            SitemapList.AddItem(new NavigationItem
            {
                Id = "videos-list",
                Name = "Videos",
                Page = "Videos",
                Hash = "#main",
                IsDropDown = true
            });

            // About Us List
            SitemapList.AddItem(new NavigationItem
            {
                Id = "about-list",
                Name = "About Us",
                Page = "The-Story",
                Hash = "#main",
                IsDropDown = true
            });

            // How To Videos
            SitemapList.AddItem(new NavigationItem
            {
                Id = "how-to-videos",
                Name = "How To Videos",
                Page = "HowTo",
                Hash = "#main"
            });

            // Product Registration
            SitemapList.AddItem(new NavigationItem
            {
                Id = "product-registration",
                Name = "Product Registration",
                Page = "ProductRegistration",
                Hash = "#main"
            });

            // The Story
            SitemapList.AddItem(new NavigationItem
            {
                Id = "the-story",
                Name = "About Us",
                Page = "The-Story",
                Hash = "#main"
            });

            // Where To Buy
            SitemapList.AddItem(new NavigationItem
            {
                Id = "where-to-buy",
                Name = "Where To Buy",
                Page = "Where-To-Buy",
                Hash = "#main"
            });

            // Shop
            SitemapList.AddItem(new NavigationItem
            {
                Id = "shop",
                Name = "Shop",
                Page = "Index",
                Hash = "#products",
                ApplyHash = true
            });

            // Customer Service
            SitemapList.AddItem(new NavigationItem
            {
                Id = "customer-service",
                Name = "Customer Service",
                Page = "CustomerService",
                Hash = "#main"
            });

            // Return Policy
            SitemapList.AddItem(new NavigationItem
            {
                Id = "return-policy",
                Name = "Return Policy",
                Page = "ReturnPolicy",
                Hash = "#main"
            });

            // Privacy Policy
            SitemapList.AddItem(new NavigationItem
            {
                Id = "privacy-policy",
                Name = "Privacy Policy",
                Page = "PrivacyPolicy",
                Hash = "#main"
            });

            // Giveaway Terms
            SitemapList.AddItem(new NavigationItem
            {
                Id = "terms",
                Name = "Giveaway Terms",
                Page = "Giveaway-Terms",
                Hash = "#main"
            });

            // Security Policy
            SitemapList.AddItem(new NavigationItem
            {
                Id = "security-policy",
                Name = "Security Policy",
                Page = "SecurityPolicy",
                Hash = "#main"
            });

            // Shipping Policy
            SitemapList.AddItem(new NavigationItem
            {
                Id = "shipping-policy",
                Name = "Shipping Policy",
                Page = "ShippingPolicy",
                Hash = "#main"
            });

            // Site Map
            SitemapList.AddItem(new NavigationItem
            {
                Id = "sitemap",
                Name = "Site Map",
                Page = "SiteMap",
                Hash = "#main"
            });

            // Checkout
            SitemapList.AddItem(new NavigationItem
            {
                Id = "checkout",
                Name = "Checkout",
                Page = "Checkout",
                Hash = "#main"
            });

            // Shopping Cart
            SitemapList.AddItem(new NavigationItem
            {
                Id = "shoppingcart",
                Name = "Shopping Cart",
                Page = "ShoppingCart",
                Hash = "#main"
            });

            // Blog
            SitemapList.AddItem(new NavigationItem
            {
                Id = "blog",
                Name = "News",
                Page = "News",
                Hash = "#main"
            });
        }
    }
}