<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>
<%
	var EnableOrderForm = SettingsManager.ContextSettings["Order.EnableOrderform", true];
    var EnableBackOrderMessage = SettingsManager.ContextSettings["Order.EnableBackOrderMessage", true];
	var renderOfferDetailsAboveAcceptOffer = SettingsManager.ContextSettings["Order.RenderOfferDetailsAboveAcceptOffer", false];
	var ShowMobileOrderForm = SettingsManager.ContextSettings["FrameworkJS/CSS.DtmStyle.ShowOrderFormOnMobile", false];
%>