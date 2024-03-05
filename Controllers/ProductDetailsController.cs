using Dtm.Framework.Base.Caches.Models;
using Dtm.Framework.Base.Extensions;
using Dtm.Framework.ClientSites.Web;
using Dtm.Framework.ClientSites.Web.Controllers;
using Dtm.Framework.Models.Ecommerce;
using Dtm.Framework.Models.Ecommerce.Repositories;
using System;
using System.Linq;
using System.Web.Mvc;

namespace IDVMTTTRH.Controllers
{
    public class ProductDetailsController : OrderPageController
    {
        [HttpGet]
        public ActionResult RenderProductDetails()
        {
            SetOfferVersion();
            InitVisitorSession();

            string productCode = Request["pc"] ?? string.Empty;

            string defaultView = "ProductDetailPage";
            string view = string.Format("PDP-{0}", productCode);

            var product = DtmContext.CampaignProducts.FirstOrDefault(cp => cp.ProductCode.Equals(productCode));

            if (product != null)
            {
                view = product.PropertyIndexer["ViewPageCode", view];
            }

            if (ViewEngines.Engines.FindPartialView(this.ControllerContext, view).View == null)
            {
                view = defaultView;
            }

            SetContextByPageCode(defaultView);

            return View(view, Model);
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
        /// Determines the current offer code and version number based on an optional query string parameter "cver", representing the Guid Campaign Offer Version Id, or defaults to an explicit offer version.
        /// </summary>
        private void SetOfferVersion()
        {
            Guid covid = Guid.TryParse(Request["cver"], out covid) ? covid : Guid.Empty;

            CampaignOfferVersionInformation offerVersion = DtmContext.CampaignOfferVersions.First(cov => cov.VersionIsDefault);

            if (covid != Guid.Empty && DtmContext.CampaignOfferVersions.Any(cov => cov.OfferVersionId == covid))
            {
                offerVersion = DtmContext.CampaignOfferVersions.First(cov => cov.OfferVersionId == covid);
            }

            DtmContext.OfferCode = offerVersion.OfferCode;
            DtmContext.Version = offerVersion.VersionNumber;
        }
    }
}