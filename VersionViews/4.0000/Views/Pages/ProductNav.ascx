<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>
<%@ Import Namespace="Dtm.Framework.Base.Models" %>
<%@ Import Namespace="IDVMTTTRH.Models" %>

<%
    var layout = ViewData["layout"] as string ?? "PLP";
    var anchorLink = ViewData["anchorLink"] as string ?? "#products";
    var showAddToCart = ViewData["ShowAddToCart"] as bool? ?? true;
    var isPDP = layout == "PDP";
    var isPLP = layout == "PLP";
    var product = ViewData["product"] as CampaignProductView ?? null;
    var hasProduct = product != null;
    var isOutOfStock = (hasProduct && !string.IsNullOrWhiteSpace(product.PropertyIndexer["IsOOS"])) ? product.PropertyIndexer["IsOOS", false] : false;

    if (isOutOfStock) 
    {
        showAddToCart = false;
    }

    if (hasProduct)
    {
        var id = product.ProductCode;
        var name = product.PropertyIndexer["Name", product.ProductName ?? string.Empty];
        var plpQtyId = string.Format("{0}Qty", product.ProductCode);
        var qtyId = string.Format("{0}{1}", plpQtyId, isPDP ? "_PDP" : string.Empty);

        var shipping = string.Format("{0} S/H", product.Shipping == 0 ? "FREE" : product.Shipping.ToString("C"));
        var price = product.Price.ToString("C");

        var learnLabel = ViewData["learnLabel"] as string ?? string.Format("Learn more about the {0}", name);
        var ariaLabelNav = string.Format("Add up to {0} of the {1} to your cart", product.MaxQuantity, name);

        if (isPLP)
        {
            ariaLabelNav = string.Format("{0} or {1}", ariaLabelNav, learnLabel);
        }
%>
    

<nav aria-label="<%= ariaLabelNav %>" class="product__nav">

    <% if (showAddToCart)
        { %>
    <div class="product__form form form--icon-field-combobox form--label-combobox delay-input delay-input--shopping-cart">
        <label for="<%= qtyId %>" class="form__label product__label">
            <span><%= price %></span>
            <span>Qty</span>
        </label>
        <div class="form__contain product__icon-field-combobox">
            <button type="button" aria-label="Remove 1 of <%= name %> from your cart" class="form__field form__button" data-qty-modifier="minus" data-quantity-id="<%= qtyId %>">
                <svg class="icon">
                    <use href="#icon-minus"></use>
                </svg>
            </button>
            <%
                var qtyPattern = string.Format("[{0}-{1}]", product.MinQuantity, product.MaxQuantity);
            %>
            <input data-min-qty="<%= product.MinQuantity %>" data-max-qty="<%= product.MaxQuantity %>" class="cartParam dtm__restyle form__field form__input" type="tel" value="1" aria-label="Current quantity"  id="<%= qtyId %>" data-item-code="<%= product.ProductCode %>" name="<%= qtyId %>" title="Up to <%= product.MaxQuantity %> are allowed" pattern="<%= qtyPattern %>">
            <button type="button" aria-label="Add 1 of <%= name %> to your cart" class="form__field form__button" data-qty-modifier="plus" data-quantity-id="<%= qtyId %>">
                <svg class="icon">
                    <use href="#icon-plus"></use>
                </svg>
            </button>

        </div>
        <select id="<%=plpQtyId %>_Select" style="display:none" aria-hidden="true">
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    </div>
    <% }
        else if (isOutOfStock)
        {%> 

        <span class="product__price">Out of Stock</span>
        <%}
        else
        { %>
        <span class="product__price"><%= price %></span>
    <% } %>

    <% 
        if (isPLP)
        {
            var learnLink = ViewData["learnLink"] ?? "#main";
            var learnId = String.Format("product-learn-{0}", product.ProductCode);
            %>
            <a id="<%= learnId %>" href="<%= learnLink %>" aria-label="<%= learnLabel %>" class="button button--third button--product">Learn More</a>
            <%
        }

        if (showAddToCart)
        {
    %>
        <a href="javascript:void(0);" data-code-toggle="true" data-select-id="<%=plpQtyId %>_Select" data-code="<%=product.ProductCode %>"  data-qty-id="<%= qtyId %>" class="button button--fourth-invert button--product delay-input delay-input--shopping-cart" id="addToCartButton">Add To Cart</a>    
    <%
        }
    %>
</nav>

<% } %>