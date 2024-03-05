<%@ Page Language="C#" MasterPageFile="~/VersionViews/Views/Layouts/InternalLayout.master" Inherits="System.Web.Mvc.ViewPage<OrderPageViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server"></asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<% if ( Model.IsMobile ) { %>

 	<% Html.RenderSnippet("INDEX-MOBILE"); %>
	<% Html.RenderSnippet("INDEX-DESKTOP"); %>

<% } else { %>

	<% Html.RenderSnippet("INDEX-DESKTOP"); %>

<% } %>

</asp:Content>


