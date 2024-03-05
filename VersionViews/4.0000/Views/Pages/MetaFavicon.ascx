<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>

<%
    var title = ViewData["Title"] as string ?? (DtmContext.Page != null ? DtmContext.Page.PageTitle : string.Empty);
    var description = ViewData["Description"] as string ?? (DtmContext.Page != null ? DtmContext.Page.MetaDescription : string.Empty);
    var url = ViewData["Url"] as string;
	var image = ViewData["Image"] as string;

    url = !string.IsNullOrEmpty(url) ? DtmContext.Domain.FullDomainCustomPath(url) : DtmContext.Domain.FullDomainOfferVersionUrl(DtmContext.PageCode);
    image = !string.IsNullOrEmpty(image) ? DtmContext.Domain.FullDomainCustomPath(image) : SettingsManager.ContextSettings["SocialPlugins.Facebook.OpenGraphImage"];
%>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="<%= description %>">

<!-- // Open Graph Metadata -->
<meta property="og:title" content="<%= title %>">
<meta property="og:type" content="website">
<meta property="og:description" content="<%= description %>">
<meta property="og:url" content="<%= url %>">
<meta property="og:image" content="<%= image %>">

<!-- // Twitter Metadata -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<%= title %>">
<meta name="twitter:description" content="<%= description %>">
<meta name="twitter:image" content="<%= image %>">
<meta name="twitter:domain" content="<%= url %>">

<% 
if (
    DtmContext.IsProxyIpAddress || 
    DtmContext.CampaignDomains.Any(d => d.DomainId == DtmContext.DomainId && d.Domain.ToLower().Contains("dtmstage")))
{ %>

	<meta name="robots" content="noindex, nofollow">

<% } else { %>

	<meta name="google-site-verification" content="<%= DtmContext.Page.MetaVerify %>" />
    <meta name="msvalidate.01" content="617F9E44E7841BBC8E57FE0772BB9DD9">
	<link rel="canonical" href="<%= url %>">

<% } %>

<% 
    var faviconVersion = String.Format("?fv={0}", 1);
    var themeColor = "#FFFFFF";
%>
<!-- // Favicon Metadata -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png<%= faviconVersion %>">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png<%= faviconVersion %>">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png<%= faviconVersion %>">
<link rel="mask-icon" href="/safari-pinned-tab.svg<%= faviconVersion %>" color="#30b2e6">

<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png<%= faviconVersion %>">
<link rel="alternate icon" type="image/png" href="/android-chrome-192x192.png<%= faviconVersion %>">
<link rel="manifest" href="/site.webmanifest">

<% 
    if(Request != null && Request.Url != null && Request.Url.AbsoluteUri != null)
    {
        var canonicalUrl = Request.Url.AbsoluteUri;
        if(!string.IsNullOrWhiteSpace(Request.Url.Query))
        {
            canonicalUrl = canonicalUrl.Replace(Request.Url.Query, string.Empty);
        }
%>
    <link rel="canonical" href="<%=canonicalUrl %>" />
<%
    }
%>

<meta name="msapplication-TileColor" content="<%= themeColor %>">
<meta name="theme-color" content="<%= themeColor %>">