<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ClientSiteViewData>" %>
<%
    var isStartPage = DtmContext.Page.IsStartPageType;
    var isCheckout = DtmContext.PageCode == "Checkout";
    var modalText = isCheckout ? "Processing" : "Loading";
    var landingPages = new string[] { "Index", "FAQ", "Benefits", "Explore", "Article", "Story" };


    Html.RenderPartial("Scripts");
    //Html.RenderSnippet("ORDERFORMSCRIPT");

        if (!landingPages.Contains(DtmContext.PageCode))
        { %>
            <script type="text/javascript" src="/shared/js/common.js"></script>
     <% }
        if (!isCheckout)
        {%>
        <div class="hide">
            <%= Html.Partial("OrderFormReviewTable", Model) %>
        </div>
    <% } %>

<span id="form-response" class="toast toast--alert toast--hidden toast--polite">
    <span class="toast__stage toast" aria-live="polite" aria-labelledby="form-response-title" aria-modal="true">
        <span class="toast__text toast__group toast">
            <p id="form-response-title"></p>
            <%if (!isCheckout)
                { %>
            <button id="form-response-dismiss" aria-label="Close" class="toast__close"></button>
            <%} %>
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

 <%if (isCheckout)
    { %>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery-scrollTo/2.1.2/jquery.scrollTo.min.js"></script>
  <%}%>


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
