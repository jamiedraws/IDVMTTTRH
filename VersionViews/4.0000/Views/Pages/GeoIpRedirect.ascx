<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%
    var includeCountryCodes = ViewData["INCLUDECOUNTRYCODES"] as string;
    var excludeCountryCodes = ViewData["EXCLUDECOUNTRYCODES"] as string;
    var destinationUrl = ViewData["DESTINATIONURL"] as string;
    var url = string.Format("/services/geo.ashx?ic={0}&ec={1}&d={2}&covid={3}",
        HttpUtility.UrlEncode(includeCountryCodes),
        HttpUtility.UrlEncode(excludeCountryCodes),
        HttpUtility.UrlEncode(destinationUrl),
        DtmContext.VersionId);
%>
<iframe src="<%=url %>" height="0" width="0" style="display: none;" sandbox="allow-top-navigation allow-scripts"></iframe>
