using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dtm.Framework.ClientSites.Web;
using Dtm.Framework.Base.Models;

namespace IDVMTTTRH.Models
{
    public class ProductItem
    {
        private readonly string _productCode;
        private readonly ProductCategory _category;

        public ProductItem (string productCode, ProductCategory category)
        {
            _productCode = productCode;
            _category = category;
        }

        public CampaignProductView GetProduct()
        {
            return DtmContext.CampaignProducts.FirstOrDefault(cp => cp.ProductCode == _productCode);
        }

        private string GetQueryString ()
        {
            return string.Format("?{0}={1}", _category.QueryName, _productCode);
        }

        public string GetRelativeProductPageUrl ()
        {
            return string.Format("/{0}/{1}/{2}{3}{4}", DtmContext.OfferCode, DtmContext.Version, _category.PageCode, DtmContext.ApplicationExtension, GetQueryString());
        }
    
        public string GetAbsoluteProductPageUrl ()
        {
            var page = DtmContext.Domain.FullDomainOfferVersionUrl(_category.PageCode);

            return string.Format("{0}{1}", page, GetQueryString());
        }
    }
}