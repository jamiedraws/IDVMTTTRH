<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>
<%@ Import Namespace="IDVMTTTRH.Models" %>
<%
    var v = 9;
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

    var pagesRequireFancybox = new string[] { "Checkout" };
    var requireFancybox = pagesRequireFancybox.Contains(DtmContext.PageCode);

    var pagesRequireSlide = new string[] { productCategory.PageCode };
    var requireSlide = pagesRequireSlide.Contains(DtmContext.PageCode) || isFrontPage;

    // inform browser to preload all critical resources ahead of schedule
    if (preload || all)
    {
        // preload critical stylesheets
        var styles = new List<string>
        {
            "/css/default/shell.css",
            "https://use.typekit.net/kqg8map.css"
        };

        if (isIndex)
        {
            styles.Add("/css/default/index.crp.css");
        }

        if (isLandingPage)
        {
            styles.Add("/css/default/landing-page.crp.css");
        }

        if (isProductDetailPage)
        {
            styles.Add("/css/default/product-detail-page.crp.css");
        }

        if (isConfirmation)
        {
            styles.Add("/css/default/confirmation.css");
        }

        if (isPaymentPage) {
            styles.Add("/css/default/payment.css");
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
            "https://use.typekit.net/af/ebcd51/00000000000000007735a081/30/l?primer=388f68b35a7cbf1ee3543172445c23e26935269fadd3b392a13ac7b2903677eb&fvd=n7&v=3",
            "https://use.typekit.net/af/a4f125/00000000000000007735c8bb/30/l?primer=388f68b35a7cbf1ee3543172445c23e26935269fadd3b392a13ac7b2903677eb&fvd=n6&v=3"
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
            <link rel="preload" href="<%= resource %>" as="script">
            <%
        }

        // preload critical images
        if (isIndex)
        {
            %>
            <%
        }
    }

    // inform browser to request resources on document parse. dispatch as critical resources
    if (!preload && !defer || all)
    {
        // request critical stylesheets
        var styles = new List<string>
        {
            "/css/default/shell.css",
            "https://use.typekit.net/kqg8map.css"
        };

        if (isIndex)
        {
            styles.Add("/css/default/index.crp.css");
        }

        if (isLandingPage)
        {
            styles.Add("/css/default/landing-page.crp.css");
        }

        if (isProductDetailPage)
        {
            styles.Add("/css/default/product-detail-page.crp.css");
        }

        if (isConfirmation)
        {
            styles.Add("/css/default/confirmation.css");
        }

        if (isPaymentPage) {
            styles.Add("/css/default/payment.css");
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
            <script src="<%= resource %>"></script>
            <%
                    }
                }

                // inform browser to request resources on document parse. dispatch as deferred resources
                if (!preload && defer || all)
                {
                    // request deferred stylesheets
                    var styles = new List<string> {

                    };

                    if (isIndex)
                    {
                        styles.Add("/css/default/index.css");
                    }

                    if (isLandingPage)
                    {
                        styles.Add("/css/default/landing-page.css");
                    }

                    if (isProductDetailPage)
                    {
                        styles.Add("/css/default/product-detail-page.css");
                    }

                    if (requireFancybox) {
                        var lightboxStylesheet = SettingsManager.ContextSettings["FrameworkJS/CSS.DtmStyle.Lightbox.Stylesheet", string.Empty];

                        if (!string.IsNullOrEmpty(lightboxStylesheet))
                        {
                            styles.Add(lightboxStylesheet);
                            //styles.Add("/css/template/fancybox.css");
                        }
                    }

                    foreach (var style in styles)
                    {
                        var resource = String.Format(url, style, v);
            %>
            <link rel="stylesheet" href="<%= resource %>" media="print" onload="this.media='all'; this.onload=null;">
            <noscript>
                <link rel="stylesheet" href="<%= resource %>">
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
                    scripts.Add("/js/default/validation.js");
                    scripts.Add("/js/default/validateaddress.js");
                }

                if (requireSlide) {
                    scripts.Add("/js/default/slide/slide.js");
                    scripts.Add("/js/default/slide/components/slide.a11y.js");
                    scripts.Add("/js/default/slide/components/slide.thumbnails.js");
                    scripts.Add("/js/default/carousel.js");
                }

                if (requireFancybox) {
                    var lightboxScript = SettingsManager.ContextSettings["FrameworkJS/CSS.DtmStyle.Lightbox.Script", string.Empty];

                    if (!string.IsNullOrEmpty(lightboxScript))
                    {
                        scripts.Add(lightboxScript);
                        //scripts.Add("/js/template/fancybox.js");
                    }
                }

                foreach (var script in scripts)
                {
                    var resource = String.Format(url, script, v);
            %>
            <script defer src="<%= resource %>"></script>
            <%
        
                        if(isIndex) {
                            %>
                        <script defer src="/js/default/email-subscribe.js" id="emaiSubscribeJs" data-context='{ "PageCode" : "<%= DtmContext.PageCode %>" }'></script> <%
                    }
           }

    }
%>