<%@ Page Language="C#" MasterPageFile="~/VersionViews/4.0000/Views/Layouts/InternalLayout.master" Inherits="System.Web.Mvc.ViewPage<ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server"></asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<%
    var productName = SettingsManager.ContextSettings["Label.ProductName"];
%>

<main aria-label="Register Your <%= productName %> Product" class="view section content content--title-desc">
    <div id="main" class="view__anchor"></div>
    <div data-src-iframe="https://mttscrp.dtmstage.com/MTTSCRP/1.0000/index.dtm" data-attr='{ "title" : "Product Registration Form" }' class="content__iframe contain contain--product-registration"></div>
</main>

</asp:Content>