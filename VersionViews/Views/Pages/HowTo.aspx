<%@ Page Language="C#" MasterPageFile="~/VersionViews/2.0000/Views/Layouts/InternalLayout.master" Inherits="System.Web.Mvc.ViewPage<ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server"></asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<main aria-label="<%= DtmContext.PageCode %>" class="view article article--contain section page">
    <div id="main" class="view__anchor"></div>
    <article class="view__in section__in">
        <div class="section__block article__copy">

            <%

            var pc =  Request["pc"] ?? String.Empty;
            var video = "582975978";
            var label = "MicroTouch&reg; Titanium&reg; Trim&trade;";

            if (pc == "ST2") {
                video = "placeholder";
                label = "MicroTouch&reg; Solo Titanium";
            } else if (pc == "MAX") {
                video = "placeholder";
                label = "MicroTouch&reg; Titanium&reg; Max";
            } else {
                // default to microtouch titanium trim video
                video = "582975978";
                label = "MicroTouch&reg; Titanium&reg; Trim&trade;";
            }

            %>
        
            <h2>How To Use <%= label %></h2>   

            <% if (video == "placeholder") { %>
            <div class="video-placeholder contain contain--video">
                HOW TO VIDEO <br>COMING SOON...
            </div>
            <% } else { %>
            <div class="contain contain--video">
                <iframe src="https://player.vimeo.com/video/582975978?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="How To - <%= label %>"></iframe>
            </div>
            <% } %>

    </article>
</main>

</asp:Content>