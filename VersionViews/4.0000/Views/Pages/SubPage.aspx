<%@ Page Language="C#" MasterPageFile="~/VersionViews/4.0000/Views/Layouts/InternalLayout.master" Inherits="System.Web.Mvc.ViewPage<ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server"></asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<main aria-labelledby="main-title" class="view content section">
    <div id="main" class="view__anchor"></div>
    <article class="view__in section__in">
        <div class="section__block content__text">
        <% 
            var title = Model.UpsellTitle ?? string.Empty;
            var text = Model.UpsellText ?? string.Empty;
            var hasTitle = !String.IsNullOrEmpty(title);
            var hasText = !String.IsNullOrEmpty(text);

            if (hasTitle)
            {
                %>
                <h1 id="main-title" class="content__title"><%= title %></h1>
                <%
            } else
            {
                Html.RenderSnippet("SUBPAGE-TITLE-" + DtmContext.PageCode);
            }

            if (hasText)
            {
                %>
                <%= text %>
                <%
            } else
            {
                Html.RenderSubPageContent(DtmContext.PageCode);
            }
        %>

    </article>
</main>

</asp:Content>