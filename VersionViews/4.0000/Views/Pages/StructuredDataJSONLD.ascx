<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ClientSiteViewData>" %>
<%@ Import Namespace="Newtonsoft.Json.Linq" %>
<%@ Import Namespace="IDVMTTTRH.StructuredData" %>

<%
    var type = ViewData["Type"] as string ?? string.Empty;

    if (type.Equals("BreadcrumbList"))
    {
        var listItems = ViewData["ListItems"] as List<IDVMTTTRH.StructuredData.ListItem> ?? new List<IDVMTTTRH.StructuredData.ListItem>();
        %>
        <script type="application/ld+json">
        <%
            var structuredData = new JObject(
                new JProperty("@context", "https://schema.org"),
                new JProperty("@type", "BreadcrumbList"),
                new JProperty("itemListElement",
                    new JArray(
                        from listItem in listItems
                        select new JObject(
                            new JProperty("@type", "ListItem"),
                            new JProperty("position", (listItems.IndexOf(listItem) + 1).ToString()),
                            new JProperty("name", listItem.Name),
                            new JProperty("item", listItem.Item)
                        )
                    )
                )
            );

            Response.Write(structuredData.ToString());
        %>
        </script>
        <%
    }

    if (type.Equals("Product"))
    {
        var product = ViewData["Product"] as IDVMTTTRH.StructuredData.Product ?? new IDVMTTTRH.StructuredData.Product();
        %>
        <script type="application/ld+json">
        <% 
           	var structuredData = new JObject(
				new JProperty("@context", "https://schema.org"),
                new JProperty("@type", "Product"),
				new JProperty("@id", product.Id),
				new JProperty("name", product.Name),
                new JProperty("description", product.Description),
				new JProperty("image", product.Image),
				new JProperty("sku", product.Sku),
				new JProperty("brand", product.Brand)
			);

			Response.Write(structuredData.ToString());
        %>
        </script>
        <%
    }
%>