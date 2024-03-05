<%@ Page Language="C#" MasterPageFile="~/VersionViews/2.0000/Views/Layouts/InternalLayout.master" Inherits="System.Web.Mvc.ViewPage<ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server"></asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<main aria-label="<%= DtmContext.PageCode %>" class="view article article--contain section page">
    <div id="main" class="view__anchor"></div>
    <article class="view__in section__in">
        <div class="section__block article__copy">
        <% 
            var title = Model.UpsellTitle ?? string.Empty;
            var text = Model.UpsellText ?? string.Empty;
            var hasTitle = !String.IsNullOrEmpty(title);
            var hasText = !String.IsNullOrEmpty(text);

            if (hasTitle)
            {
                %>
                <h1 class="article__title"><%= title %></h1>
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