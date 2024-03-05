using Dtm.Framework.ClientSites.Web;
using Dtm.Framework.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.Routing;

namespace IDVMTTTRH
{
    public class MvcApplication : ClientSiteApplication
    {
        protected override void OnAppStart()
        {
            DtmContext.PromoCodeRules.Add(new PromoCodeRule("TRIMPRO20", PromoCodeRuleType.AddDiscountPercent, "TRIMPRO20", .20m, 1));
            DtmContext.PromoCodeRules.Add(new PromoCodeRule("GROOM10", PromoCodeRuleType.AddDiscountPercent, "GROOM10", .10m, 1));
            DtmContext.PromoCodeRules.Add(new PromoCodeRule("OUTSIDERS10", PromoCodeRuleType.AddDiscountPercent, "OUTSIDERS10", .10m, 1));
            DtmContext.PromoCodeRules.Add(new PromoCodeRule("GETGROOMING", PromoCodeRuleType.AddDiscountPercent, "GETGROOMING", .10m, 1));

            DtmContext.PromoCodeRules.Add(new PromoCodeRule("SAVE10", PromoCodeRuleType.AddDiscountPercent, "SAVE10", .10m, 1));
            DtmContext.PromoCodeRules.Add(new PromoCodeRule("DC10", PromoCodeRuleType.AddDiscountPercent, "DC10", .10m, 1));            
            DtmContext.PromoCodeRules.Add(new PromoCodeRule("HOWIE10", PromoCodeRuleType.AddDiscountPercent, "HOWIE10", .10m, 1));
            DtmContext.PromoCodeRules.Add(new PromoCodeRule("BOYD10", PromoCodeRuleType.AddDiscountPercent, "BOYD10", .10m, 1));

            DtmContext.PromoCodeRules.Add(new PromoCodeRule("CARLOS10", PromoCodeRuleType.AddDiscountPercent, "CARLOS10", .10m, 1));
            DtmContext.PromoCodeRules.Add(new PromoCodeRule("NES10", PromoCodeRuleType.AddDiscountPercent, "NES10", .10m , 1, DateTime.Parse("07/19/2022"), DateTime.Parse("07/29/2022")));
            DtmContext.PromoCodeRules.Add(new PromoCodeRule("LOGAN10", PromoCodeRuleType.AddDiscountPercent, "LOGAN10", .10m, 1, DateTime.Parse("07/23/2022"), DateTime.Parse("08/03/2022")));
            DtmContext.PromoCodeRules.Add(new PromoCodeRule("COLIN10", PromoCodeRuleType.AddDiscountPercent, "COLIN10", .10m, 1, DateTime.Parse("08/11/2022"), DateTime.Parse("08/23/2022")));

            DtmContext.PromoCodeRules.Add(new PromoCodeRule("HOWIE10", PromoCodeRuleType.AddDiscountPercent, "HOWIE10", .10m, 1));
            DtmContext.PromoCodeRules.Add(new PromoCodeRule("LARRY10", PromoCodeRuleType.AddDiscountPercent, "LARRY10", .10m, 1, DateTime.Parse("08/13/2022"), DateTime.Parse("10/29/2022")));
            DtmContext.PromoCodeRules.Add(new PromoCodeRule("WASH10", PromoCodeRuleType.AddDiscountPercent, "WASH10", .10m, 1, DateTime.Parse("08/20/2022"), DateTime.Parse("10/29/2022")));
            DtmContext.PromoCodeRules.Add(new PromoCodeRule("DIEGO10", PromoCodeRuleType.AddDiscountPercent, "DIEGO10", .10m, 1, DateTime.Parse("08/27/2022"), DateTime.Parse("10/29/2022")));

            DtmContext.PromoCodeRules.Add(new PromoCodeRule("PETERTWINS10", PromoCodeRuleType.AddDiscountPercent, "PETERTWINS10", .10m, 1, DateTime.Parse("09/03/2022"), DateTime.Parse("10/29/2022")));
            DtmContext.PromoCodeRules.Add(new PromoCodeRule("PRESDAY23", PromoCodeRuleType.AddItemLevelDiscountPercent, "PRESDAY23", 0.20M, 1, DateTime.Parse("02/15/2023"), DateTime.Parse("02/21/2023")));

            DtmContext.PromoCodeRules.Add(new PromoCodeRule("SPRING23", PromoCodeRuleType.AddItemLevelDiscountPercent, "SPRING23", 0.20M, 1, DateTime.Parse("03/16/2023"), DateTime.Parse("03/20/2023")));

            DtmContext.PromoCodeRules.Add(new PromoCodeRule("MEMDAY23", PromoCodeRuleType.AddDiscountPercent, "MEMDAY23", 0.20M, 1, DateTime.Parse("05/24/2023"), DateTime.Parse("05/31/2023 3:00 AM")));
            DtmContext.PromoCodeRules.Add(new PromoCodeRule("NMGD23", PromoCodeRuleType.AddDiscountPercent, "NMGD23", 0.15M, 1, DateTime.Parse("08/17/2023"), DateTime.Parse("08/21/2023 11:59 PM")));

            //Custom promo codes
            DtmContext.PromoCodeRules.Add(new PromoCodeRule("MT4TH", PromoCodeRuleType.Custom, "MT4TH", 1, DateTime.Parse("06/27/2023"), DateTime.Parse("07/06/2023 3:00 AM")));
            DtmContext.PromoCodeRules.Add(new PromoCodeRule("TRIM30", PromoCodeRuleType.Custom, "TRIM30", 1, DateTime.Parse("06/27/2023"), DateTime.Parse("08/01/2023 3:00 AM")));

            PromoCodeHelper.PromoCodeItems.OneTimeOnlyPromoCodes.Add("TITANIUM20");
            DtmContext.PromoCodeRules.Add(new PromoCodeRule("TITANIUM20", PromoCodeRuleType.AddDiscountPercent, "TITANIUM20", 0.20M, 1));

            base.OnAppStart();
        }
        protected override void ConfigureAdditionalRoutes(RouteCollection routes)
        {
            var offerRegex = string.Format("({0})", string.Join("|", DtmContext.CampaignOfferVersions
                .Select(cov => cov.OfferCode)
                .Distinct()));

            var versionRegex = string.Format("({0})", string.Join("|", DtmContext.CampaignOfferVersions
              .Select(cov => cov.VersionNumber)
              .Distinct()));

            routes.MapRoute("Search", "Search", new { controller = "Search", action = "Search" });

            routes.MapRoute("ProductDetail", "{offer}/{version}/ProductDetailPage", 
                new { controller = "ProductDetails", action = "RenderProductDetails" },
                new { offer = offerRegex, version = versionRegex });

            routes.MapRoute("ProductDetailExtension", "{offer}/{version}/ProductDetailPage{extension}",
                new { controller = "ProductDetails", action = "RenderProductDetails" },
                new { offer = offerRegex, version = versionRegex, extension = ".(dtm|cgi)" });

            // Article blogs
            routes.MapRoute("Articles", "Articles", new { controller = "Articles", action = "GetPosts", tagSlug = "Articles" });
            routes.MapRoute("CategoryArticles", "Articles/{categorySlug}", new { controller = "Articles", action = "GetPostsByCategory", tagSlug = "Articles" });
            routes.MapRoute("Article", "Articles/{categorySlug}/{urlSlug}", new { controller = "Articles", action = "GetPost", tagSlug = "Articles" });

            base.ConfigureAdditionalRoutes(routes);
        }
    }
}