<%@ Page Language="C#" MasterPageFile="~/VersionViews/4.0000/Views/Layouts/InternalLayout.master" Inherits="System.Web.Mvc.ViewPage<OrderPageViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>
<%@ Import Namespace="IDVMTTTRH.Models" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server"></asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<%
    var productCategory = new ProductCategory();
    var isShoppingCart = String.Equals(productCategory.OfferCode, DtmContext.OfferCode, StringComparison.InvariantCultureIgnoreCase);
    if (isShoppingCart)
    {
        ViewData["ui"] = "PDP";
        ViewData["ProductCategory"] = productCategory;

        Html.RenderPartial("ProductCategory", Model, ViewData);
    } else
    {
        var landingPageUrl = DtmContext.OfferVersion.IsDefault 
            ? "/" 
            : String.Format("/{0}/{1}/index{2}", DtmContext.OfferCode, DtmContext.Version, DtmContext.ApplicationExtension);
        Response.Redirect(landingPageUrl);
    }
    %>

</asp:Content>