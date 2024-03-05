<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ClientSiteViewData>" %>
<%
    var isStartPage = DtmContext.Page.IsStartPageType;
    var isCheckout = string.Equals(DtmContext.PageCode, "checkout", StringComparison.OrdinalIgnoreCase);
    var modalText = isCheckout ? "Processing" : "Loading";

    var pagesRequireFormResources = new string[] { "Index", "ProductDetailPage", "ShoppingCart", "Checkout", "SearchResults", "Replacement", "Blog", "Article" };
    var requireFormResources = pagesRequireFormResources.Contains(DtmContext.PageCode);
%>

<script src="/shared/js/jquery.min.js"></script>

<% if (requireFormResources) { %>
    <%= Html.Partial("FrameworkJs") %>
    <script>const loadFWSnippets = false; const loadFacebox = false;</script>
    <script type="text/javascript" src="/shared/js/common.js?v=<%= Dtm.Framework.ClientSites.Web.DtmContext.ApplicationVersion %>&language=<%=Dtm.Framework.ClientSites.SettingsManager.ContextSettings["Language.LanguageType", "English"] %>&cb=1"></script>
    <% if (!isCheckout)
        { %>
        <div class="hide">
            <%= Html.Partial("OrderFormReviewTable", Model) %>
        </div>
    <% } %>

<% } %>

<span id="form-response" class="toast toast--alert toast--hidden toast--polite">
    <span class="toast__stage toast" aria-live="polite" aria-labelledby="form-response-title" aria-modal="true">
        <span class="toast__text toast__group toast">
            <p id="form-response-title"></p>
            <button id="form-response-dismiss" aria-label="Close" class="toast__close"></button>
        </span>
    </span>
</span>

<div class="modal" role="dialog" aria-labelledby="modal-text">
    <div class="modal__load-state"></div>
    <div id="modal-text" class="modal__text"><%=modalText %></div>
    <%if (!isCheckout)
        {           
         %>
            <button type="button" class="modal__button button">Close</button>
       <%}%>
</div>

<div aria-hidden="true" role="none" class="l-controls left-absolute top-absolute @print-only-hide">
    <% Html.RenderSiteControls(SiteControlLocation.ContentTop); %>
    <% Html.RenderSiteControls(SiteControlLocation.ContentBottom); %>
    <% Html.RenderSiteControls(SiteControlLocation.PageBottom); %>
    <style>
        .hud {
            display: none;
        }
    </style>
</div>
