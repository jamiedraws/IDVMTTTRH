<%@ Page Language="C#" MasterPageFile="~/VersionViews/4.0000/Views/Layouts/InternalLayout.master" Inherits="System.Web.Mvc.ViewPage<ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>
<%@ Import Namespace="IDVMTTTRH.Navigation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server"></asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<main aria-labelledby="main-title" class="view section content content--title-desc">
    <div id="main" class="view__anchor"></div>
    <div class="view__in section__in">
        <h1 id="main-title" class="title">
            Where To Buy
        </h1>
        <%
            var sitemap = new Sitemap().SitemapList;
            var home = sitemap.GetItemById("shop");
        %>
        <p>Microtouch&reg; products can be purchased online <a href="<%= home.Page %>">here</a>, or at these fine retailers. Please check your local store for availability.</p>
        <div class="section__block">
            <div class="logo-nav__group">
                <span data-name="walmart" class="logo-nav__link">
                    <img src="/images/retail-logos/walmart.svg" alt="Walmart" width="2500" height="594">
                </span>
                <span data-name="target" class="logo-nav__link">
                    <img src="/images/retail-logos/target.svg" alt="Target" width="300" height="300">
                </span>
                <span data-name="walgreens" class="logo-nav__link">
                    <img src="/images/retail-logos/walgreens.svg" alt="Walgreens" width="1206" height="250">
                </span>
                <span data-name="cvs" class="logo-nav__link">
                    <img src="/images/retail-logos/cvs.svg" alt="CVS" width="2500" height="324">
                </span>
                <span data-name="riteaid" class="logo-nav__link">
                    <img src="/images/retail-logos/rite-aid.svg" alt="Rite Aid" width="1206" height="185">
                </span>
                <span data-name="bedbathandbeyond" class="logo-nav__link">
                    <img src="/images/retail-logos/bed-bath-and-beyond.svg" alt="Bed Bath and Beyond" width="2500" height="789">
                </span>
            </div>
        </div>
    </div>
</main>

</asp:Content>