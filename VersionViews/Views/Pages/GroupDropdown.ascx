<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Dtm.Framework.Base.Models.CampaignProductView>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>
<%@ Import Namespace="Dtm.Framework.Base.Models" %>


<%
    var p = Model;
    string mainImage = p.PropertyIndexer["MainProductImage"] ?? "|";
    var mainImageUrl = mainImage.Split('|')[0];
    var mainImageAlt = mainImage.Contains('|') ? mainImage.Split('|')[1] : "";
    var isGroup = p.ProductName.Contains("MicroTouch");
    var isExternalStage = (!string.IsNullOrWhiteSpace(p.PropertyIndexer["IsExternalStage"]) && DtmContext.IsStage)
        ? p.PropertyIndexer["IsExternalStage", false]
        : p.PropertyIndexer["IsExternal", false];
    var isExternal = isExternalStage;

    var layout = ViewData["layout"] as string ?? "PLP";
    var product = ViewData["product"] as CampaignProductView ?? null;
    var isPDP = layout == "PDP";
    var plpQtyId = string.Format("{0}Qty", p.ProductCode);

    var qtyId = string.Format("{0}{1}", plpQtyId, isPDP ? "_PDP" : string.Empty);


    //var selectLabel = string.IsNullOrWhiteSpace(p.PropertyIndexer["AlternateSelectLabel"]) ? "Size" : p.PropertyIndexer["AlternateSelectLabel"];

    //if (string.IsNullOrEmpty(mainImageUrl))
    //{
    //    mainImageUrl = "/images/default/425x425.jpg";
    //}

    var productTitle = p.ProductName;
    var dropdownText = "Price: $" + p.Price.ToString("F");
    //var promoCodeItem = p.ProductCode + "P";
    //var finalPromoCode = DtmContext.ShoppingCart[promoCodeItem].Quantity > 0 ? promoCodeItem : p.ProductCode;

    var linkPDP = String.Format("ProductDetailPage{0}?pc={1}", DtmContext.ApplicationExtension, p.ProductCode);

    if (isExternal)
    {
        linkPDP = p.PropertyIndexer["ExternalLink", string.Empty];
    }

    var ariaLabelPDP = String.Format("Shop for {0}", productTitle);
    var ariaLabelCart = String.Format("Add {0} to your cart", productTitle);
    var ariaLabelNav = String.Format("Add {0} to your cart or learn more about {0}", productTitle);

    var dropDownName = p.PropertyIndexer["DropdownGroup"] ?? string.Empty;
    var customPrice = p.PropertyIndexer["CustomPrice"] ?? string.Empty;
    var singleProducts = new List<Dtm.Framework.Base.Models.CampaignProductView>();
    var productCodes = DtmContext.CampaignProducts
                .Where(cp =>
                cp.CategoryIndexer.Has(p.ProductCode)
                    || cp.CategoryIndexer.Has("IDVMTTTRH")
                    || (cp.CategoryIndexer.Has("IDVMTTTRH") && DtmContext.IsStage))
                .Select(cp => cp.ProductCode)
                .ToList();
    var productsString = string.Join(",", productCodes);
    productCodes.ForEach(x =>
    {
        var item = DtmContext.CampaignProducts.FirstOrDefault(y => y.ProductCode.ToLower() == x.ToLower());
        if (item != null)
        {
            singleProducts.Add(item);
        }
    });
    var multipleProducts = (singleProducts.Count() > 1);

    var elementId = ViewData["elementId"] as string ?? string.Empty;
    var elementAttributes = string.Empty;
    if (!string.IsNullOrEmpty(elementId))
    {
        elementAttributes = string.Format(@"id=""{0}""", elementId);
    }
    var price = string.IsNullOrWhiteSpace(customPrice) ? p.Price.ToString("C") : customPrice;

    var imageAttributes = string.Format(@"
        href=""{0}""
        aria-label=""{1}""
        class=""contain contain--square story-card__image-link bg__picture"" 
        data-src-img=""{2}""
    ", linkPDP, ariaLabelPDP, mainImageUrl);

    if (isExternal)
    {
        imageAttributes = string.Format(@"
        {0}
        target=""_blank""
        ", imageAttributes);
    }
%>

<figure <%= elementAttributes %> class="slide__item story-card__item">
    <a <%= imageAttributes %>></a>
    <figcaption>
        <h3 class="story-card__caption"><%= productTitle %></h3>

        <div class="story-card__price"><%= price %></div>

    </figcaption>
    <%
        if (!isExternal)
        {

    %>
    <div class="product story-card__fill">
        <div class="form__fieldset product__bold">
            <%
                if (productCodes.Any())
                {%>
                    <input type="hidden" data-dropdown-group="<%=dropDownName %>" value="<%=productCodes[0]%>" />
                <%}

            %>
    <div class="product__form form form--icon-field-combobox form--label-combobox delay-input delay-input--shopping-cart">
        <span class="form__label product__label">Qty:</span>
        <div class="form__contain">
            <button type="button" aria-label="Remove 1 of <%= p.ProductName %> from your cart" class="form__field form__button" data-qty-Modifier="minus" data-quantity-id="<%= qtyId %>">
                <svg class="icon">
                    <use href="#icon-minus"></use>
                </svg>
            </button>
            <%
                var qtyPattern = string.Format("[{0}-{1}]", p.MinQuantity, p.MaxQuantity);    
            %>
            <input data-min-qty="<%= p.MinQuantity %>" data-max-qty="<%= p.MaxQuantity %>" class="cartParam dtm__restyle form__field form__input" type="tel" value="1" aria-label="Current quantity"  id="<%= qtyId %>" data-item-code="<%= p.ProductCode %>" name="<%= qtyId %>" pattern="<%= qtyPattern %>">
            <button type="button" aria-label="Add 1 of <%= p.ProductName %> to your cart" class="form__field form__button" data-qty-Modifier="plus" data-quantity-id="<%= qtyId %>">
                <svg class="icon">
                    <use href="#icon-plus"></use>
                </svg>
            </button>
        </div>

            <select id="<%=qtyId %>_Select" style="display:none" >
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
    </div>
    <% 
        }
    %>
    <div class="vse_<%=dropDownName %>">
    </div>
    <nav aria-label="<%= ariaLabelNav %>" class="story-card__fill">
        <div class="story-card__buttons">
            <%if (!isExternal)
                { %>
                        <a href="<%= linkPDP %>" aria-label="<%= ariaLabelPDP %>" class="button">Learn More</a>


                    <a href="javascript:void(0);" data-code-toggle="true" data-select-id="<%=plpQtyId %>_Select" data-code="<%=p.ProductCode %>"  data-qty-id="<%= qtyId %>" class="button button--order delay-input delay-input--shopping-cart">Add To Cart</a>

            <% } else { %>
             <a target="_blank" href="<%= linkPDP %>" aria-label="<%= ariaLabelPDP %>" class="button">Learn More</a>
            <% } %>
        </div>
    </nav>
</figure>


