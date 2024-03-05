<%@ WebHandler Language="C#" Class="POBoxDisclaimer" %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using Dtm.Framework.ClientSites.Web;

public class POBoxDisclaimer : IHttpHandler
{
    public bool IsReusable
    {
        get { return true; }
    }
    public void SetHostAddress(HttpContext context)
    {
        var request = context.Request;
        var userHostAddress = request.UserHostAddress;
        var xRealIp = request.Headers["X-Real-IP"];
        var xForwardedFor = request.Headers["X-Forwarded-For"];

        Guid overrideCovId = Guid.TryParse(request["COVID"], out overrideCovId) ? overrideCovId : Guid.Empty;
        if (overrideCovId == Guid.Empty && request.UrlReferrer != null)
        {
            var offerVersionPage = request.UrlReferrer.AbsolutePath;
            offerVersionPage = Regex.Match(offerVersionPage, "^[/](.*?[/].*)[/].*?$").Groups[1].Value;
            if (!string.IsNullOrWhiteSpace(offerVersionPage))
            {
                var offerVersion = offerVersionPage.Split('/');
                var offerCode = offerVersion[0];
                var routeVersionText = offerVersion[1];
                decimal version;
                Decimal.TryParse(routeVersionText, out version);

                overrideCovId = DtmContext.CampaignOfferVersions
                   .Where(cov => cov.OfferCode.Equals(offerCode, StringComparison.InvariantCultureIgnoreCase) && cov.VersionNumber == version)
                   .Select(cov => cov.OfferVersionId)
                   .FirstOrDefault();
            }
        }
        var defaultOfferVersion = DtmContext.CampaignOfferVersions
             .FirstOrDefault(cov => (overrideCovId == Guid.Empty && cov.IsDefault) || cov.OfferVersionId == overrideCovId)
         ?? DtmContext.CampaignOfferVersions
             .First(cov => cov.IsDefault);
        DtmContext.VersionId = defaultOfferVersion.OfferVersionId;
        DtmContext.OfferCode = defaultOfferVersion.OfferCode;
        DtmContext.Version = defaultOfferVersion.VersionNumber;

        var usingCustomIpHeader = false;
        if (Dtm.Framework.ClientSites.SettingsManager.ContextSettings["VisitorSession.UseCustomIpHeader", false] 
            && !string.IsNullOrWhiteSpace(Dtm.Framework.ClientSites.SettingsManager.ContextSettings["VisitorSession.CustomIpHeaderName", string.Empty]))
        {
            var customIpHeader = request.Headers[Dtm.Framework.ClientSites.SettingsManager.ContextSettings["VisitorSession.CustomIpHeaderName", string.Empty]];

            if(!string.IsNullOrWhiteSpace(customIpHeader))
            {
                xRealIp = customIpHeader;
                usingCustomIpHeader = true;
            }
        }

        if (!string.IsNullOrWhiteSpace(xRealIp))
        {
            var xRemoteProxy = request.Headers["Remote-X-Real-IP"] != null;
            if (xRemoteProxy && !usingCustomIpHeader)
                xRealIp = request.Headers["Remote-X-Real-IP"];
            DtmContext.HostAddress = xRealIp;
        }
        else
        {
            DtmContext.ClientSsl = request.IsSecureConnection;
            if (!string.IsNullOrEmpty(xForwardedFor) && DtmContext.ProxyIpAddresses.Contains(userHostAddress))
            {
                userHostAddress = Dtm.Framework.Validation.GetFirstPublicIpAddress(xForwardedFor) ?? request.UserHostAddress;
            }
            DtmContext.HostAddress = userHostAddress;
        }
    }

    public void ProcessRequest(HttpContext context)
    {
        var request = context.Request;

        Guid overrideCovId = Guid.TryParse(request["COVID"], out overrideCovId) ? overrideCovId : Guid.Empty;
        if (overrideCovId == Guid.Empty && request.UrlReferrer != null)
        {
            var offerVersionPage = request.UrlReferrer.AbsolutePath;
            offerVersionPage = Regex.Match(offerVersionPage, "^[/](.*?[/].*)[/].*?$").Groups[1].Value;
            if (!string.IsNullOrWhiteSpace(offerVersionPage))
            {
                var offerVersion = offerVersionPage.Split('/');
                var offerCode = offerVersion[0];
                var routeVersionText = offerVersion[1];
                decimal version;
                Decimal.TryParse(routeVersionText, out version);

                overrideCovId = DtmContext.CampaignOfferVersions
                   .Where(cov => cov.OfferCode.Equals(offerCode, StringComparison.InvariantCultureIgnoreCase) && cov.VersionNumber == version)
                   .Select(cov => cov.OfferVersionId)
                   .FirstOrDefault();
            }
        }
        var defaultOfferVersion = DtmContext.CampaignOfferVersions
             .First(cov => (overrideCovId == Guid.Empty && cov.IsDefault) || cov.OfferVersionId == overrideCovId);
        DtmContext.VersionId = defaultOfferVersion.OfferVersionId;
        DtmContext.OfferCode = defaultOfferVersion.OfferCode;
        DtmContext.Version = defaultOfferVersion.VersionNumber;

        var isRedirecting = false;
        try
        {
            var includeCountryCodes = request["ic"];
            var excludeCountryCodes = request["ec"];
            var destinationUrl = request["d"];

            var isMissingCountryCodes = (string.IsNullOrWhiteSpace(includeCountryCodes) && string.IsNullOrWhiteSpace(excludeCountryCodes));
            var isMissingUrl = string.IsNullOrWhiteSpace(destinationUrl);
            var ignoreUserAgentRegex = Dtm.Framework.ClientSites.SettingsManager.ContextSettings["GeoIpRedirect.IgnoreUserAgentRegex", "statuscake"];
            var isIgnoreUserAgent = (!string.IsNullOrWhiteSpace(ignoreUserAgentRegex) && Regex.IsMatch(request.UserAgent ?? string.Empty, ignoreUserAgentRegex, RegexOptions.IgnoreCase));
            if (isMissingCountryCodes || isMissingUrl || isIgnoreUserAgent)
            {
                return;
            }
            else
            {
                var whiteListIpsVal = Dtm.Framework.ClientSites.SettingsManager.ContextSettings["GeoIpRedirect.WhiteListIP", string.Empty];
                var whiteListIps = new List<string>();

                SetHostAddress(context);
                var ip = DtmContext.HostAddress;

                if (!string.IsNullOrWhiteSpace(whiteListIpsVal))
                {
                    whiteListIps = whiteListIpsVal.Split(',').ToList();
                    if (whiteListIps.Contains(ip))
                    {
                        return;
                    }
                }
                var cookieName = "_gip_c";
                var cookie = context.Request.Cookies[cookieName];
                var cacheKey = "Geo.Ip.Country" + ip;
                var countryCode = cookie != null && !string.IsNullOrWhiteSpace(cookie.Value)
                    ? cookie.Value
                    : context.Cache[cacheKey] as string;
                if (countryCode == null)
                {
                    var geoIpRepository = new Dtm.Framework.Models.Ecommerce.Repositories.GeoIpRepository();
                    var result = geoIpRepository.GetCountry(ip);

                    if (result == null)
                    {
                        countryCode = string.Empty;
                    }
                    else
                    {
                        countryCode = result.CountryCode;
                    }

                    context.Cache.Insert(cacheKey, countryCode, null, System.Web.Caching.Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(60));
                    context.Response.Cookies.Add(new HttpCookie(cookieName, countryCode)
                    {
                        Expires = DateTime.Now.AddMinutes(Dtm.Framework.ClientSites.SettingsManager.ContextSettings["Cookie.GeoIPExpirationInMinutes", 10080]),
                        HttpOnly = Dtm.Framework.ClientSites.SettingsManager.ContextSettings["Cookie.SetHttpOnly", false],
                        Secure = Dtm.Framework.ClientSites.SettingsManager.ContextSettings["Cookie.SetSecure", false],
                        Domain = HttpContext.Current.Request.Url.DnsSafeHost.Replace("www.", "."),
                        Path = "/"
                    });
                }

                // a country code match was found
                if (!string.IsNullOrWhiteSpace(countryCode))
                {
                    var executeRedirect =
                        // If country is not in the include codes
                        (!string.IsNullOrWhiteSpace(includeCountryCodes) && !includeCountryCodes.Split(',').Contains(countryCode))
                        // If country is in the exclude codes
                        || (!string.IsNullOrWhiteSpace(excludeCountryCodes) && excludeCountryCodes.Split(',').Contains(countryCode));
                    var isHeadShaverPdp = request.UrlReferrer.AbsoluteUri.Contains("ProductDetailPage.dtm?pc=HS");


                    if (countryCode == "AU" && executeRedirect && isHeadShaverPdp)
                    {
                        destinationUrl = "https://www.globalshop.com.au/products/microtouch-titanium-head-shaver?utm_source=intersell&utm_campaign=microtouch_titanium_head_shaver&utm_medium=redirect&utm_content=MTHS";
                    }
                    else if (countryCode == "NZ" && executeRedirect && isHeadShaverPdp)
                    {
                        destinationUrl = "https://globalshopdirect.co.nz/products/microtouch-titanium-head-shaver?utm_source=intersell&utm_campaign=microtouch_titanium_head_shaver&utm_medium=redirect&utm_content=MTHS";
                    }


                    if (executeRedirect)
                    {
                        context.Response.Write(string.Format("<script>window.top.location.href = '{0}';</script>", destinationUrl));
                        isRedirecting = true;
                    }
                }
            }
        }
        catch (Exception ex)
        {
            new SiteExceptionHandler(ex);
        }
        context.Response.ContentType = "text/html";
        if (!isRedirecting)
        {
            context.Response.Write("<!-- success -->");
        }
    }
}
