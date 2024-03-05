<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>

	<footer class="l-footer block @mv-u-pad--reset @print-only-hide">

		<nav class="l-footer__in c-brand @mv-u-pad--reset fn--center u-mar--center">

			<% Html.RenderSnippet("FOOTER-FRONTEND"); %>

			<% if ( !DtmContext.Page.IsStartPageType ) { %>
				<div class="u-pad--vert center-margin @mobile-only-width-at-60">
					<%= Html.Partial("ViewSwitchLink") %>
				</div>
			<% } %>

		</nav>

	</footer>




	<%-- // @JS-FOOTER --%>
	<% switch ( DtmContext.Page.IsStartPageType ) { %>

		<% case false: %>


			<% break; %>
		<% default: %>

			<% Html.RenderPartial("Scripts"); %>
			<% Html.RenderSnippet("ORDERFORMSCRIPT"); %>

			<% break; %>

	<% } %>



	<%= Model.FrameworkVersion %>

	<div class="l-controls">
		<% Html.RenderSiteControls(SiteControlLocation.ContentTop); %>
		<% Html.RenderSiteControls(SiteControlLocation.ContentBottom); %>
		<% Html.RenderSiteControls(SiteControlLocation.PageBottom); %>
	</div>


