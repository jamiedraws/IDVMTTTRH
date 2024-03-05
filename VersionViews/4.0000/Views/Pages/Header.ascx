<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>
<%@ Import Namespace="IDVMTTTRH.Models" %>
<%@ Import Namespace="IDVMTTTRH.Navigation" %>

<%
    var version = DtmContext.Version;
    var isIndex = DtmContext.PageCode == "Index";
    var isMobile = DtmContext.IsMobile;
    var isDesktop = !isMobile;
    var cartQuantity = DtmContext.ShoppingCart.Where(sc => sc.CampaignProduct.PropertyIndexer["ExcludeFromCartCount"] != "true").Sum(sc => sc.Quantity);
    var cov = string.Format("/{0}/{1}/", DtmContext.OfferCode, DtmContext.Version);

    var isStartPage = DtmContext.Page.IsStartPageType && DtmContext.PageCode != "PaymentForm";
    var isPaymentPage = DtmContext.PageCode == "PaymentForm" || DtmContext.PageCode == "ProcessPayment";

    var productAttributeName = SettingsManager.ContextSettings["Label.ProductName"];
    var productName = productAttributeName;

    var ext = DtmContext.ApplicationExtension;

    var sitemap = new Sitemap();
    var sitemapList = sitemap.SitemapList;
    var homeLink = sitemapList.GetItemById("home");
    var checkoutLink = sitemapList.GetItemById("shoppingcart");

    var logo = string.Format(@"<img src=""/images/4.0000/microtouch-logo-wordmark.svg"" alt=""{0}"" width=""261"" height=""57"">", productAttributeName);

    if (isStartPage)
    {
        logo = string.Format(@"
            <a 
                href=""{0}"" 
                id=""navbar-logo"" 
                class=""nav__logo"" 
                aria-label=""{1}"">
                {2}
            </a>
        ", homeLink.Page, productAttributeName, logo);
    } else
    {
        logo = string.Format(@"
            <div class=""nav__logo"">{0}</div>
        ", logo);
    }

    var implementsSearchUI = true;
    var implementsAccountUI = false;

    var navClasses = string.Format("nav {0}", isStartPage ? "nav--is-start-page" : "nav--is-end-page");

    var hasPromo = isStartPage;
%>

<header class="view <%= navClasses %> section section--nav @print-only-hide">
    <span class="skip-link">
        <a href="#main" class="skip-link__button" id="skip-link"><span>Skip To Main Content?</span></a>
    </span>
    <% if (hasPromo) { %>
    <div class="header__promo">
        <b>
            <span>Free Shipping </span>
            <span>Over $50</span>
        </b>
    </div>
    <% } %>
    <div class="view__in nav__group nav__in section__in">
        <%= logo %>
        <% if (isStartPage) { %>
        <input class="nav__toggle" type="checkbox" id="nav__toggle" aria-label="Toggle Menu">
        <label class="nav__label" for="nav__toggle" aria-label="Toggle Menu">
            <span></span>
        </label>
        <div class="nav__underlay nav__underlay--for-drawer" role="presentation"></div>
        <nav aria-label="Website page links" class="nav__pane">
            <div class="nav__group">
                <div class="nav__list nav__tier-first">
                    <%= logo.Replace("navbar-logo", "navbar-header-logo") %>
                    <%
                        var navLinks = sitemapList.GetItemsByIdRange(new List<string> {
                            "products",
                            "replacement",
                            "videos-list",
                            "about-list"
                        });

                        foreach (var navLink in navLinks)
                        {
                            if (navLink.IsDropDown)
                            {
                                if (navLink.Id == "products")
                                {
                                    %>
                                    <div class="nav__drop nav__drop--grid">
                                        <button type="button" aria-haspopup="true" aria-expanded="false" class="nav__drop__toggle nav__link">
                                            <span>Products</span>
                                        </button>
                                        <div hidden class="nav__group nav__drop__group bg">
                                            <div class="nav__menu nav__menu--stack">
                                                <div class="nav__list">
                                    <%
                                    var dropDownLinks = new List<NavigationItem>();
                                    
                                    var productCategory = new ProductCategory();
                                    var productPageLinks = productCategory
                                        .GetProducts()
                                        .Select(p => 
                                            sitemapList.SetPage(new NavigationItem { 
                                                Page = productCategory.PageCode,
                                                Name = p.ProductName,
                                                Id = p.ProductCode,
                                                Hash = "#main",
                                                QueryParameters = new SortedList<string, string> {
                                                    { productCategory.QueryName, p.ProductCode }
                                                }
                                            })
                                        );

                                    dropDownLinks.AddRange(productPageLinks);
                                    dropDownLinks.Add(sitemapList.SetPage(new NavigationItem
                                    {
                                        Id = "replacement",
                                        Page = "Replacement",
                                        Name = "Replacement Heads & Blades",
                                        Hash = "#main"
                                    }));

                                    dropDownLinks.Add(sitemapList.SetPage(new NavigationItem
                                    {
                                        Id = "best-sellers",
                                        Page = "Index",
                                        Name = "Best Sellers",
                                        Hash = "#products",
                                        ApplyHash = true
                                    }));

                                    foreach (var dropDownLink in dropDownLinks) { 
                                        if (dropDownLink.QueryParameters.ContainsValue(Request[productCategory.QueryName] ?? String.Empty))
                                        {
                                            dropDownLink.Page = dropDownLink.Hash;
                                        }
                                        %>
                                        <a href="<%= dropDownLink.Page %>" class="nav__drop__link" id="nav-product-<%= dropDownLink.Id %>" aria-label="Learn more about <%= dropDownLink.Name %>">
                                            <span class=""><%= dropDownLink.Name %></span>
                                        </a>
                                        <%
                                    }
                                    %>
                                               </div>
                                            </div>
                                        </div>
                                    </div>
                                    <%
                                } else if (navLink.Id == "videos-list")
                                {
                                    %>
                                    <div class="nav__drop nav__drop--stack">
                                        <button type="button" aria-haspopup="true" aria-expanded="false" class="nav__drop__toggle nav__link">
                                            <span>Videos</span>
                                        </button>
                                        <div hidden class="nav__group nav__drop__group bg">
                                            <div class="nav__menu nav__menu--stack">
                                                <div class="nav__list">
                                                    <%
                                                        var dropDownLinks = sitemapList.GetItemsByIdRange(new List<string> { "videos", "how-to-videos" });
                                                        
                                                        foreach (var dropDownLink in dropDownLinks) { 
                                                            %>
                                                            <a href="<%= dropDownLink.Page %>" class="nav__drop__link" id="nav-video-<%= dropDownLink.Id %>">
                                                                <span class=""><%= dropDownLink.Name %></span>
                                                            </a>
                                                            <%
                                                        }
                                                    %>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <%
                                }
                                else if (navLink.Id == "about-list")
                                {
                                %>
                                <div class="nav__drop nav__drop--stack">
                                    <button type="button" aria-haspopup="true" aria-expanded="false" class="nav__drop__toggle nav__link">
                                        <span><%= navLink.Name %></span>
                                    </button>
                                    <div hidden class="nav__group nav__drop__group bg">
                                        <div class="nav__menu nav__menu--stack">
                                            <div class="nav__list">
                                                <%
                                                    var dropDownLinks = sitemapList.GetItemsByIdRange(new List<string> { "the-story", "blog" });
                                                        
                                                    foreach (var dropDownLink in dropDownLinks) { 
                                                        %>
                                                        <a href="<%= dropDownLink.Page %>" class="nav__drop__link" id="nav-video-<%= dropDownLink.Id %>">
                                                            <span class=""><%= dropDownLink.Name %></span>
                                                        </a>
                                                        <%
                                                    }
                                                %>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <%
                                } 
                            }
                            else 
                            {
                                %>
                                <a class="nav__link nav__underline-container" href="<%= navLink.Page %>" id="nav-<%= navLink.Id %>">
                                    <span class="nav__underline-content"><%= navLink.Name %></span>
                                </a>
                                <%
                            }
                        }
                    %>
                </div>
            </div>
        </nav>

        <nav aria-label="Search for products, account profile and checkout" class="nav__button-group">
            <% if (implementsSearchUI) { %>
            <div class="nav__icon-button nav__underline-container">
                <input id="nav__search" type="checkbox" class="nav__toggle" aria-label="Toggle Search"/>
                <label class="nav__underline-content toggle-icons" for="nav__search">
                    <svg class="toggle-icons__overlay circular__in icon nav__icon">
                        <use href="#icon-search"></use>
                    </svg>
                    <span class="toggle-icons__underlay nav__label nav__label--is-selected">
                        <span></span>
                    </span>
                </label>
                <div class="nav__underlay nav__underlay--for-form">
                    <form action="/Search" data-processing-message="Searching" method="post" onsubmit="return document.getElementById('text').value.replace(/^\s+|\s+$/,'').length != 0;" class="nav__form form form--search">
                        <fieldset class="form__contain form__field-icon">
                             <input id="text" name="text" type="hidden" value="">
                            <input id="versionNumber" name="versionNumber" type="hidden" value="<%=DtmContext.Version.ToString("N4") %>">
                            <input type="text" placeholder="Search..." id="textS" name="textS" onkeyup="document.getElementById('text').value = this.value;" pattern="^[a-zA-Z0-9_ ]*$" class="form__field dtm__restyle" required>
                            <button id="searchSubmit" type="submit">
                                <svg class="icon nav__icon">
                                    <use href="#icon-search"></use>
                                </svg>
                            </button>        
                        </fieldset>
                    </form>
                </div>
            </div>
            <% } %>

            <% if (implementsAccountUI) { %>
            <div class="nav__icon-button">
                <a href="<%= cov %>Account/Index" aria-label="Create an account or login to review order history, edit address" class="circular circular--pill nav__icon-text">
                      <svg class="icon nav__icon">
                        <use href="#icon-person"></use>
                    </svg>
                </a>
            </div>
            <% } %>

            <div class="nav__icon-button">
                <a href="<%= checkoutLink.Page %>" class="nav__icon-text nav__underline-container">
                    <div class="nav__icon-text nav__underline-content">
                        <svg class="icon nav__icon">
                            <use href="#icon-cart"></use>
                        </svg>
                        <span role="status" class="nav__text cartTotalQtyNumbersOnly">
                            <% if (cartQuantity > 0) { %>
                                <%= cartQuantity%>
                            <% } %>
                        </span>
                    </div>
                </a>
            </div>
        </nav>
        <% } %>
    </div>
</header>