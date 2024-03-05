using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dtm.Framework.ClientSites;
using Dtm.Framework.ClientSites.Web;
using Dtm.Framework.Base.Models;

namespace IDVMTTTRH.Models
{
    public class ProductCategory
    {
        public readonly string QueryName;
        public readonly string PageCode;
        public readonly string CategoryCode;
        public readonly string OfferCode;
        public ProductCategory(string categoryCode = null, string offerCode = null, string queryName = null, string pageCode = null)
        {
            CategoryCode = string.IsNullOrEmpty(categoryCode) ? "IDVMTTTRH" : categoryCode;
            OfferCode = offerCode ?? "IDVMTTTRH";
            QueryName = queryName ?? "pc";
            PageCode = pageCode ?? "ProductDetailPage";

            if (DtmContext.IsStage)
            {
                CategoryCode = string.Format("STAGE-{0}", CategoryCode); 
            }

            Category = DtmContext.CampaignCategories.FirstOrDefault(cc => cc.Code == CategoryCode);
            HasCategory = Category != null;

        }

        public CategoryView Category { get; private set; }
        public bool HasCategory { get; private set; }

        public List<CampaignProductView> GetProducts()
        {
            var campaignProducts = DtmContext.CampaignProducts
                .Where(cp => cp.CategoryIndexer.Has(CategoryCode)
                    || (cp.CategoryIndexer.Has("STAGE-" + CategoryCode) && DtmContext.IsStage));

            if (!DtmContext.IsStage)
            {
                campaignProducts = campaignProducts
                    .Where(cp => !string.Equals(cp.PropertyIndexer["isLive"] ?? string.Empty, "false", StringComparison.InvariantCultureIgnoreCase));
            }

            return campaignProducts.OrderBy(cp => cp.CategoryIndexer[CategoryCode]).ToList();
        }
    }
}