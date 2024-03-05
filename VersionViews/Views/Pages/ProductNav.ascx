<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>
<%@ Import Namespace="Dtm.Framework.Base.Models" %>
<%@ Import Namespace="IDVMTTTRH.Models" %>

<%
    var layout = ViewData["layout"] as string ?? "PLP";
    var anchorLink = ViewData["anchorLink"] as string ?? "#products";
    var isPDP = layout == "PDP";
    var isPLP = layout == "PLP";
    var product = ViewData["product"] as CampaignProductView ?? null;
    var hasProduct = product != null;

    if (hasProduct)
    {
        var id = product.ProductCode;
        var name = product.PropertyIndexer["Name", product.ProductName ?? string.Empty];
        var plpQtyId = string.Format("{0}Qty", product.ProductCode);
        var qtyId = string.Format("{0}{1}", plpQtyId, isPDP ? "_PDP" : string.Empty);

        var shipping = string.Format("{0} S/H", product.Shipping == 0 ? "FREE" : product.Shipping.ToString("C"));
        var price = string.Format("{0} + {1}", product.Price.ToString("C"), shipping);

        var learnLabel = ViewData["learnLabel"] as string ?? string.Format("Learn more about the {0}", name);
        var ariaLabelNav = string.Format("Add up to {0} of the {1} to your cart", product.MaxQuantity, name);

        if (isPLP)
        {
            ariaLabelNav = string.Format("{0} or {1}", ariaLabelNav, learnLabel);
        }
%>
    

<nav aria-label="<%= ariaLabelNav %>" class="product__nav">

    <div class="product__form form form--icon-field-combobox form--label-combobox delay-input delay-input--shopping-cart">
        <span class="form__label product__label">Qty:</span>
        <div class="form__contain">
            <button type="button" aria-label="Remove 1 of <%= name %> from your cart" class="form__field form__button" data-qty-Modifier="minus" data-quantity-id="<%= qtyId %>">
                <svg class="icon">
                    <use href="#icon-minus"></use>
                </svg>
            </button>
            <%
                var qtyPattern = string.Format("[{0}-{1}]", product.MinQuantity, product.MaxQuantity);    
            %>
            <input data-min-qty="<%= product.MinQuantity %>" data-max-qty="<%= product.MaxQuantity %>" class="cartParam dtm__restyle form__field form__input" type="tel" value="1" aria-label="Current quantity"  id="<%= qtyId %>" data-item-code="<%= product.ProductCode %>" name="<%= qtyId %>" pattern="<%= qtyPattern %>">
            <button type="button" aria-label="Add 1 of <%= name %> to your cart" class="form__field form__button" data-qty-Modifier="plus" data-quantity-id="<%= qtyId %>">
                <svg class="icon">
                    <use href="#icon-plus"></use>
                </svg>
            </button>
        </div>
            <select id="<%=plpQtyId %>_Select" style="display:none" >
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
    </div>

    <% 
        if (isPLP)
        {
            var learnLink = ViewData["learnLink"] ?? "#main";
            var learnId = String.Format("product-learn-{0}", product.ProductCode);
            %>
            <a id="<%= learnId %>" href="<%= learnLink %>" aria-label="<%= learnLabel %>" class="button button--third">Learn More</a>
            <%
        }
    %>
        <a href="javascript:void(0);" data-code-toggle="true" data-select-id="<%=plpQtyId %>_Select" data-code="<%=product.ProductCode %>"  data-qty-id="<%= qtyId %>" class="button button--order delay-input delay-input--shopping-cart">Add To Cart</a>
</nav>

<% } %>