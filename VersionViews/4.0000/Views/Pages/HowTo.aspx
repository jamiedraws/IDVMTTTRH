<%@ Page Language="C#" MasterPageFile="~/VersionViews/4.0000/Views/Layouts/InternalLayout.master" Inherits="System.Web.Mvc.ViewPage<ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>
 
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server"></asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
 
<main aria-labelledby="main-title" class="view section content content--title-video">
    <div id="main" class="view__anchor"></div>
    <div class="view__in section__in">
        <h1 id="main-title" class="title">
            How To Videos
        </h1>
        <div class="content__contain">
            <h2 class="content__title">MicroTouch&reg; Titanium&reg; Trim&trade;</h2>
            <div data-src-iframe="https://player.vimeo.com/video/779007265?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" data-attr='{ "width" : "1000", "height" : "563", "title" : "Titanium Trim Video", "allow" : "fullscreen" }' class="contain contain--video"></div>
        </div>
        <div class="content__contain">
            <h2 class="content__title">MicroTouch&reg; SOLO Titanium</h2>
            <div data-src-iframe="https://player.vimeo.com/video/626777930?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" data-attr='{ "width" : "1000", "height" : "563", "title" : "Titanium Trim Video", "allow" : "fullscreen" }' class="contain contain--video"></div>
        </div>
    </div>
</main>
 
</asp:Content>