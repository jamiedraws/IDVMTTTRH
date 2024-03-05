<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>
<%@ Import Namespace="IDVMTTTRH.Models" %>
<%
    var v = 8;
    var url = "{0}?v={1}";

    var preload = ViewData["preload"] as bool? ?? false;
    var defer = ViewData["defer"] as bool? ?? false;
    var all = ViewData["all"] as bool? ?? true;

    var isPaymentPage = DtmContext.PageCode == "Checkout" || DtmContext.PageCode == "ProcessPayment";
    var isIndex = DtmContext.PageCode == "Index";
    var isFrontPage = DtmContext.Page.IsStartPageType; 

    var productCategory = ViewData["ProductCategory"] as ProductCategory ??  new ProductCategory();
    var isProductDetailPage = DtmContext.PageCode.Equals(productCategory.PageCode, StringComparison.InvariantCultureIgnoreCase);
    var isCheckout = DtmContext.PageCode == "Checkout";
    var isLandingPage = isFrontPage && !isPaymentPage && !isIndex && !isProductDetailPage;

    var pagesRequireConfirmation = new string[] { "ConfirmationReviewPage", "Confirmation" };
    var isConfirmation = pagesRequireConfirmation.Contains(DtmContext.PageCode);

    var pagesRequireFancybox = new string[] { "ProductDetailPage", "Checkout" };
    var requireFancybox = pagesRequireFancybox.Contains(DtmContext.PageCode);

    var pagesRequireSlide = new string[] { productCategory.PageCode, "Index", "SearchResults", "ShoppingCart" };
    var requireSlide = pagesRequireSlide.Contains(DtmContext.PageCode);

    var accountPages = new string[] { "Account", "Login", "Register", "ShoppingCart" };
    var isAccountPage = accountPages.Contains(DtmContext.PageCode);

    // inform browser to preload all critical resources ahead of schedule
    if (preload || all)
    {
        // preload critical stylesheets
        var styles = new List<string>
        {
            "/css/Site4/default/shell.css"
        };

        if (isIndex)
        {
            styles.Add("/css/Site4/default/index.crp.css");
        }

        if (isLandingPage)
        {
            styles.Add("/css/Site4/default/landing-page.crp.css");
        }

        if (isProductDetailPage)
        {
            styles.Add("/css/Site4/default/product-detail-page.crp.css");
        }

        if (isConfirmation)
        {
            styles.Add("/css/Site4/default/confirmation.css");
        }

        if (isPaymentPage) {
            styles.Add("/css/Site4/default/payment.css");
        }

        if (isAccountPage) {
            styles.Add("/css/Site4/default/account.css");
        }

        foreach (var style in styles)
        {
            var resource = String.Format(url, style, v);
            %>
            <link rel="preload" href="<%= resource %>" as="style">
            <%
        }

        // preload critical fonts
        var fonts = new List<string>
        {
            "/shared/webfonts/museo-sans/museo-sans-500.woff2",
            "/shared/webfonts/museo-sans/museo-sans-700.woff2",
            "/shared/webfonts/haettenschweiler/Haettenschweiler.woff2"
        };

        foreach (var font in fonts)
        {
            %>
            <link rel="preload" href="<%= font %>" as="font" type="font/woff2" crossorigin>
            <%
        }

        // preload critical scripts
        var scripts = new List<string>
        {
        };

        foreach (var script in scripts)
        {
            var resource = String.Format(url, script, v);
            %>
            <link rel="preload" href="<%= script %>" as="script">
            <%
        }

        // preload critical images
        var images = new List<string>
        {
            "/images/4.0000/logo.svg",
            "/images/4.0000/product-banner-square.jpg",
            "/images/4.0000/product-banner-900w.jpg"
        };

        if (isProductDetailPage)
        {
            var products = productCategory.GetProducts();

            if (products.Any())
            {
                var productImages = new ProductImages(Request[productCategory.QueryName] as string ?? string.Empty);
                var firstProductImage = productImages.GetFirstImagePath();

                images.Add(firstProductImage);
            }
        }

        foreach (var image in images)
        {
            %>
            <link rel="preload" href="<%= image %>" as="image">
            <%
        }

        if (isIndex)
        {
            var products = productCategory.GetProducts();

            if (products.Any())
            {
                var productImages = new ProductImages(products.First().ProductCode);
                var firstProductImage = productImages.GetFirstImagePath();

                %>
                <link rel="preload" as="image" href="<%= firstProductImage %>" media="(max-width: 500px)" />
                <%
            }
            %>
            <link rel="preload" as="image" href="/images/4.0000/product-banner-600w.jpg" media="(max-width: 800px)">
            <link rel="preload" as="image" href="/images/4.0000/product-banner-900w.jpg" media="(min-width: 800px)">
            <%
        }
    }

    // inform browser to request resources on document parse. dispatch as critical resources
    if (!preload && !defer || all)
    {
        // request critical stylesheets
        var styles = new List<string>
        {
            "/css/Site4/default/shell.css"
        };

        if (isIndex)
        {
            styles.Add("/css/Site4/default/index.crp.css");
        }

        if (isLandingPage)
        {
            styles.Add("/css/Site4/default/landing-page.crp.css");
        }

        if (isProductDetailPage)
        {
            styles.Add("/css/Site4/default/product-detail-page.crp.css");
        }

        if (isConfirmation)
        {
            styles.Add("/css/Site4/default/confirmation.css");
        }

        if (isPaymentPage) {
            styles.Add("/css/Site4/default/payment.css");
        }

        if (isAccountPage) {
            styles.Add("/css/Site4/default/account.css");
        }

        foreach (var style in styles)
        {
            var resource = String.Format(url, style, v);
            %>
            <link rel="stylesheet" href="<%= resource %>">
            <%
        }

        // request critical scripts. inform browser to defer script execution to document parse completion
        var scripts = new List<string>
        {
        };

        foreach (var script in scripts)
        {
            var resource = String.Format(url, script, v);
            %>
            <script src="<%= script %>"></script>
            <%
                    }
                }

                // inform browser to request resources on document parse. dispatch as deferred resources
                if (!preload && defer || all)
                {
                    // request deferred stylesheets
                    var styles = new List<string> {
                        "/Shared/facebox/facebox.css"
                    };

                    if (requireFancybox) {
                        var lightboxStylesheet = SettingsManager.ContextSettings["FrameworkJS/CSS.DtmStyle.Lightbox.Stylesheet", string.Empty];

                        if (!string.IsNullOrEmpty(lightboxStylesheet))
                        {
                            styles.Add(lightboxStylesheet);
                            styles.Add("/css/Site4/template/fancybox.css");
                        }
                    }

                    foreach (var style in styles)
                    {
                        var resource = String.Format(url, style, v);
            %>
            <link rel="stylesheet" href="<%= style %>" media="print" onload="this.media='all'; this.onload=null;">
            <noscript>
                <link rel="stylesheet" href="<%= style %>">
            </noscript>
            <%
                }


                // request deferred scripts. inform browser to defer script execution to document parse completion
                var scripts = new List<string>
                {
                    "/js/default/app.js",
                    "/js/default/observer.js",
                    "/js/default/lazy.js",
                    "/js/default/page.js",
                    "/js/default/nav.js",
                    "/js/default/shoppingcart.js",
                    "/Shared/facebox/facebox.js",
                    "/Shared/js/ModalMaster/modal.js"
                };

                if (isCheckout) {
                    scripts.Add("/js/default/checkout.js");
                    scripts.Add("/js/default/express-checkout.js");
                    scripts.Add("/js/default/validation.js");
                    scripts.Add("/js/default/validateaddress.js");
                }

                if (requireSlide) {
                    scripts.Add("/js/Site4/carousel.es5.js");
                }

                if (requireFancybox) {
                    var lightboxScript = SettingsManager.ContextSettings["FrameworkJS/CSS.DtmStyle.Lightbox.Script", string.Empty];

                    if (!string.IsNullOrEmpty(lightboxScript))
                    {
                        scripts.Add(lightboxScript);
                        scripts.Add("/js/template/fancybox.js");
                    }
                }

                foreach (var script in scripts)
                {
                    var resource = String.Format(url, script, v);
                    %>
                    <script defer src="<%= script %>"></script>
                    <%
                }

                if (isFrontPage) {
                    %>
                    <script defer src="/js/default/email-subscribe.js" id="emaiSubscribeJs" data-context='{ "PageCode" : "<%= DtmContext.PageCode %>" }'></script>
                    <%
                }
            }
%>