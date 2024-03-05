<%@ Page Language="C#" MasterPageFile="~/VersionViews/4.0000/Views/Layouts/InternalLayout.master" Inherits="System.Web.Mvc.ViewPage<OrderPageViewData>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server"></asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<%-- 8. View Cart --%>
<main aria-labelledby="account-title" class="view main section">
  <div id="account" class="view__anchor"></div>
  <div class="view__in section__in">
      <div class="checkout account">
          <h1 id="story-title" class="account__banner">Your Cart</h1>
          <div class="account__contain account__copy">
            <%
                var subTotal = DtmContext.ShoppingCart.SubTotal.ToString("C");
                var shoppingCartItems = DtmContext.ShoppingCart.Items.Where(i => i.CampaignProduct.ProductTypeId == 1 || i.CampaignProduct.ProductTypeId == 2).ToList();
                var hasItems = (shoppingCartItems.Count() > 0) ? true : false;

                var landingPageUrl = string.Format("/{0}/{1}/{2}{3}#products",
                    DtmContext.OfferCode,
                    DtmContext.Version,
                    "Index",
                    DtmContext.ApplicationExtension);

                var exitUrl = string.Format("/{0}/{1}/{2}{3}",
                      DtmContext.OfferCode,
                      DtmContext.Version,
                      "Checkout",
                      DtmContext.ApplicationExtension);

                if (hasItems)
                {
            %>
              <div class="account__group" id="cartContainer">
                  <form class="form account__form">
                      <div class="checkout__banner">
                          <span>Products</span>
                      </div>
                      <% foreach (var cartItem in shoppingCartItems) {
                              if(!cartItem.ProductCode.StartsWith("SHIP")) 
                              { %>
                      <div class="product product--single product--cart">
                            <%
                                Html.RenderPartial("Product", Model, new ViewDataDictionary
                                {
                                    { "product", cartItem.CampaignProduct },
                                    { "layout", "Cart" }
                                }); 
                            %>
                      </div>
                      <%      }  
                          }%>
                  </form>
                  <aside class="account__sidebar">
                      <div class="account__copy view__scroll">
                          <div class="checkout__banner">
                              <span>Order Summary</span>
                          </div>
                          <div role="status" class="account__group checkout__order-item">
                              <span>Sub Total</span>
                              <span id="summarySubTotal"><%=subTotal%></span>
                          </div>
                          <hr />
                          <nav aria-label="Order summary" class="account__group account__nav">
                            <a href="<%= exitUrl %>" id="order-summary-checkout" class="button button--second">Proceed To Checkout</a>
                            <a href="<%= landingPageUrl %>" id="order-summary-shopping" class="button button--second">Continue Shopping</a>
                          </nav>
                      </div>
                  </aside>
              </div>
            <% } else { %>
              <div class="account__space account__copy">
                <h2 class="account__header">Details</h2>
                <p>Your cart is currently empty.</p>
                <a href="<%= landingPageUrl %>" class="button button--second">Continue Shopping</a>
              </div>
            <% } %>
          </div>
      </div>
  </div>
</main>

</asp:Content>