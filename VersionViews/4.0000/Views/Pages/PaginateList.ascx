<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>
<%@ Import Namespace="Dtm.Framework.Base.Models" %>

<%
var pages = ViewData["Pages"] as int? ?? 1;
                
if (pages > 1) 
{ 
    var pageParameter = Request["page"] as String ?? "1";

    int currentPage = 1;
    int.TryParse(pageParameter, out currentPage);

    int prevPage = currentPage <= 1 ? -1 : currentPage - 1;
    int nextPage = currentPage >= pages ? -1 : currentPage + 1;
    %>
    <div class="view__in section__in">
        <nav aria-label="Pages" class="paginate-list">
            <div class="paginate-list__group">
            <%
                if (prevPage != -1) 
                { 
                    %>
                    <a href="?page=<%= prevPage %>&cver=<%= DtmContext.VersionId %>" class="paginate-list__prev">Previous</a>
                    <%
                }
            %>
            <div class="paginate-list__pages">
            <%
                for (var i = 1; i <= pages; i++)
                {
                    var attributeList = string.Format(@"href=""?page={0}&cver={1}""", i, DtmContext.VersionId);

                    if (i == currentPage)
                    {
                        attributeList = string.Format(@"{0} class=""paginate-list__current-page""", attributeList);
                    }
                    %>
                    <a <%= attributeList %>><%= i %></a>
                    <%
                }
            %>
            </div>
            <%
                if (nextPage != -1)
                { 
                    %>
                    <a href="?page=<%= nextPage %>&cver=<%= DtmContext.VersionId %>" class="paginate-list__next">Next</a>
                    <%     
                }
            %>
            </div>
        </nav>
    </div>
    <% 
}
%>