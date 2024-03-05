<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ClientSiteViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>

<%
    var isFrontPage = DtmContext.Page.IsStartPageType;
    var productName = SettingsManager.ContextSettings["Label.ProductName"];
%>

<footer aria-label="Social media channels, store policies and site map" class="view footer section bg bg--dark @print-only-hide">
    <div id="footer" class="view__anchor"></div>
    <div class="view__in section__in">
        <div class="section__block">
            <picture class="contain contain--logo footer__logo">
                <img src="/images/4.0000/microtouch-logo-wordmark.svg" width="261" height="57" loading="lazy" alt="<%= productName %>" />
            </picture>
        </div>

        <svg class="svg-symbols">
            <symbol id="icon-facebook" viewBox="0 0 32 32">
                <path d="M19 6h5v-6h-5c-3.86 0-7 3.14-7 7v3h-4v6h4v16h6v-16h5l1-6h-6v-3c0-0.542 0.458-1 1-1z"></path>
            </symbol>

            <symbol id="icon-tiktok" viewBox="0 0 512 512">
                <path d="M412.19,118.66c-3.24-1.67-6.39-3.51-9.45-5.5c-8.89-5.88-17.04-12.8-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h0.1
	C349.14,23.9,350,16,350.13,16h-82.44v318.78c0,4.28,0,8.51-0.18,12.69c0,0.52-0.05,1-0.08,1.56c0,0.23,0,0.47-0.05,0.71
	c0,0.06,0,0.12,0,0.18c-1.76,23.23-14.97,44.05-35.22,55.56c-10.39,5.91-22.15,9.02-34.11,9c-38.41,0-69.54-31.32-69.54-70
	s31.13-70,69.54-70c7.27-0.01,14.5,1.14,21.41,3.39l0.1-83.94c-42.43-5.48-85.22,7.04-118,34.52
	c-14.21,12.35-26.16,27.08-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24c-1,22.21,5.67,45.22,8.85,54.73v0.2
	c2,5.6,9.75,24.71,22.38,40.82c10.18,12.92,22.22,24.27,35.71,33.69v-0.2l0.2,0.2c39.91,27.12,84.16,25.34,84.16,25.34
	c7.66-0.31,33.32,0,62.46-13.81c32.32-15.31,50.72-38.12,50.72-38.12c11.75-13.63,21.1-29.16,27.64-45.93
	c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,0.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9
	v-81.84C453.86,132.37,433.27,129.17,412.19,118.66z"/>
            </symbol>

            <symbol id="icon-instagram" viewBox="0 0 32 32">
                <path d="M16 2.881c4.275 0 4.781 0.019 6.462 0.094 1.563 0.069 2.406 0.331 2.969 0.55 0.744 0.288 1.281 0.638 1.837 1.194 0.563 0.563 0.906 1.094 1.2 1.838 0.219 0.563 0.481 1.412 0.55 2.969 0.075 1.688 0.094 2.194 0.094 6.463s-0.019 4.781-0.094 6.463c-0.069 1.563-0.331 2.406-0.55 2.969-0.288 0.744-0.637 1.281-1.194 1.837-0.563 0.563-1.094 0.906-1.837 1.2-0.563 0.219-1.413 0.481-2.969 0.55-1.688 0.075-2.194 0.094-6.463 0.094s-4.781-0.019-6.463-0.094c-1.563-0.069-2.406-0.331-2.969-0.55-0.744-0.288-1.281-0.637-1.838-1.194-0.563-0.563-0.906-1.094-1.2-1.837-0.219-0.563-0.481-1.413-0.55-2.969-0.075-1.688-0.094-2.194-0.094-6.463s0.019-4.781 0.094-6.463c0.069-1.563 0.331-2.406 0.55-2.969 0.288-0.744 0.638-1.281 1.194-1.838 0.563-0.563 1.094-0.906 1.838-1.2 0.563-0.219 1.412-0.481 2.969-0.55 1.681-0.075 2.188-0.094 6.463-0.094zM16 0c-4.344 0-4.887 0.019-6.594 0.094-1.7 0.075-2.869 0.35-3.881 0.744-1.056 0.412-1.95 0.956-2.837 1.85-0.894 0.888-1.438 1.781-1.85 2.831-0.394 1.019-0.669 2.181-0.744 3.881-0.075 1.713-0.094 2.256-0.094 6.6s0.019 4.887 0.094 6.594c0.075 1.7 0.35 2.869 0.744 3.881 0.413 1.056 0.956 1.95 1.85 2.837 0.887 0.887 1.781 1.438 2.831 1.844 1.019 0.394 2.181 0.669 3.881 0.744 1.706 0.075 2.25 0.094 6.594 0.094s4.888-0.019 6.594-0.094c1.7-0.075 2.869-0.35 3.881-0.744 1.050-0.406 1.944-0.956 2.831-1.844s1.438-1.781 1.844-2.831c0.394-1.019 0.669-2.181 0.744-3.881 0.075-1.706 0.094-2.25 0.094-6.594s-0.019-4.887-0.094-6.594c-0.075-1.7-0.35-2.869-0.744-3.881-0.394-1.063-0.938-1.956-1.831-2.844-0.887-0.887-1.781-1.438-2.831-1.844-1.019-0.394-2.181-0.669-3.881-0.744-1.712-0.081-2.256-0.1-6.6-0.1v0z"></path>
                <path d="M16 7.781c-4.537 0-8.219 3.681-8.219 8.219s3.681 8.219 8.219 8.219 8.219-3.681 8.219-8.219c0-4.537-3.681-8.219-8.219-8.219zM16 21.331c-2.944 0-5.331-2.387-5.331-5.331s2.387-5.331 5.331-5.331c2.944 0 5.331 2.387 5.331 5.331s-2.387 5.331-5.331 5.331z"></path>
                <path d="M26.462 7.456c0 1.060-0.859 1.919-1.919 1.919s-1.919-0.859-1.919-1.919c0-1.060 0.859-1.919 1.919-1.919s1.919 0.859 1.919 1.919z"></path>
            </symbol>

            <symbol id="icon-twitter" viewBox="0 0 310 310">
                <path xmlns="http://www.w3.org/2000/svg" id="XMLID_827_" d="M302.973,57.388c-4.87,2.16-9.877,3.983-14.993,5.463c6.057-6.85,10.675-14.91,13.494-23.73   c0.632-1.977-0.023-4.141-1.648-5.434c-1.623-1.294-3.878-1.449-5.665-0.39c-10.865,6.444-22.587,11.075-34.878,13.783   c-12.381-12.098-29.197-18.983-46.581-18.983c-36.695,0-66.549,29.853-66.549,66.547c0,2.89,0.183,5.764,0.545,8.598   C101.163,99.244,58.83,76.863,29.76,41.204c-1.036-1.271-2.632-1.956-4.266-1.825c-1.635,0.128-3.104,1.05-3.93,2.467   c-5.896,10.117-9.013,21.688-9.013,33.461c0,16.035,5.725,31.249,15.838,43.137c-3.075-1.065-6.059-2.396-8.907-3.977   c-1.529-0.851-3.395-0.838-4.914,0.033c-1.52,0.871-2.473,2.473-2.513,4.224c-0.007,0.295-0.007,0.59-0.007,0.889   c0,23.935,12.882,45.484,32.577,57.229c-1.692-0.169-3.383-0.414-5.063-0.735c-1.732-0.331-3.513,0.276-4.681,1.597   c-1.17,1.32-1.557,3.16-1.018,4.84c7.29,22.76,26.059,39.501,48.749,44.605c-18.819,11.787-40.34,17.961-62.932,17.961   c-4.714,0-9.455-0.277-14.095-0.826c-2.305-0.274-4.509,1.087-5.294,3.279c-0.785,2.193,0.047,4.638,2.008,5.895   c29.023,18.609,62.582,28.445,97.047,28.445c67.754,0,110.139-31.95,133.764-58.753c29.46-33.421,46.356-77.658,46.356-121.367   c0-1.826-0.028-3.67-0.084-5.508c11.623-8.757,21.63-19.355,29.773-31.536c1.237-1.85,1.103-4.295-0.33-5.998   C307.394,57.037,305.009,56.486,302.973,57.388z"/>
            </symbol>

            <symbol id="icon-youtube" viewBox="0 0 24 28">
                <path d="M15.172 19.437v3.297c0 0.703-0.203 1.047-0.609 1.047-0.234 0-0.469-0.109-0.703-0.344v-4.703c0.234-0.234 0.469-0.344 0.703-0.344 0.406 0 0.609 0.359 0.609 1.047zM20.453 19.453v0.719h-1.406v-0.719c0-0.703 0.234-1.062 0.703-1.062s0.703 0.359 0.703 1.062zM5.359 16.047h1.672v-1.469h-4.875v1.469h1.641v8.891h1.563v-8.891zM9.859 24.938h1.391v-7.719h-1.391v5.906c-0.313 0.438-0.609 0.656-0.891 0.656-0.187 0-0.297-0.109-0.328-0.328-0.016-0.047-0.016-0.219-0.016-0.547v-5.688h-1.391v6.109c0 0.547 0.047 0.906 0.125 1.141 0.125 0.391 0.453 0.578 0.906 0.578 0.5 0 1.031-0.313 1.594-0.953v0.844zM16.562 22.625v-3.078c0-0.719-0.031-1.234-0.141-1.547-0.172-0.578-0.562-0.875-1.109-0.875-0.516 0-1 0.281-1.453 0.844v-3.391h-1.391v10.359h1.391v-0.75c0.469 0.578 0.953 0.859 1.453 0.859 0.547 0 0.938-0.297 1.109-0.859 0.109-0.328 0.141-0.844 0.141-1.563zM21.844 22.469v-0.203h-1.422c0 0.562-0.016 0.875-0.031 0.953-0.078 0.375-0.281 0.562-0.625 0.562-0.484 0-0.719-0.359-0.719-1.078v-1.359h2.797v-1.609c0-0.828-0.141-1.422-0.422-1.813-0.406-0.531-0.953-0.797-1.656-0.797-0.719 0-1.266 0.266-1.672 0.797-0.297 0.391-0.438 0.984-0.438 1.813v2.703c0 0.828 0.156 1.437 0.453 1.813 0.406 0.531 0.953 0.797 1.687 0.797s1.313-0.281 1.687-0.828c0.172-0.25 0.297-0.531 0.328-0.844 0.031-0.141 0.031-0.453 0.031-0.906zM12.344 8.203v-3.281c0-0.719-0.203-1.078-0.672-1.078-0.453 0-0.672 0.359-0.672 1.078v3.281c0 0.719 0.219 1.094 0.672 1.094 0.469 0 0.672-0.375 0.672-1.094zM23.578 19.938c0 1.797-0.016 3.719-0.406 5.469-0.297 1.234-1.297 2.141-2.5 2.266-2.875 0.328-5.781 0.328-8.672 0.328s-5.797 0-8.672-0.328c-1.203-0.125-2.219-1.031-2.5-2.266-0.406-1.75-0.406-3.672-0.406-5.469v0c0-1.813 0.016-3.719 0.406-5.469 0.297-1.234 1.297-2.141 2.516-2.281 2.859-0.313 5.766-0.313 8.656-0.313s5.797 0 8.672 0.313c1.203 0.141 2.219 1.047 2.5 2.281 0.406 1.75 0.406 3.656 0.406 5.469zM7.984 0h1.594l-1.891 6.234v4.234h-1.563v-4.234c-0.141-0.766-0.453-1.859-0.953-3.313-0.344-0.969-0.688-1.953-1.016-2.922h1.656l1.109 4.109zM13.766 5.203v2.734c0 0.828-0.141 1.453-0.438 1.844-0.391 0.531-0.938 0.797-1.656 0.797-0.703 0-1.25-0.266-1.641-0.797-0.297-0.406-0.438-1.016-0.438-1.844v-2.734c0-0.828 0.141-1.437 0.438-1.828 0.391-0.531 0.938-0.797 1.641-0.797 0.719 0 1.266 0.266 1.656 0.797 0.297 0.391 0.438 1 0.438 1.828zM19 2.672v7.797h-1.422v-0.859c-0.562 0.656-1.094 0.969-1.609 0.969-0.453 0-0.781-0.187-0.922-0.578-0.078-0.234-0.125-0.609-0.125-1.172v-6.156h1.422v5.734c0 0.328 0 0.516 0.016 0.547 0.031 0.219 0.141 0.344 0.328 0.344 0.281 0 0.578-0.219 0.891-0.672v-5.953h1.422z"></path>
            </symbol>

            <symbol id="icon-star" viewBox="0 0 808.22 768.67">
                <style>
                    #icon-star .st0{fill:#FEE12C;}
                    #icon-star .st1{fill:#FDC240;}
                </style>
                <path class="st0" d="M404.11,226.74l28.73,88.67l15.68,48.39l50.86-0.04l93.21-0.08l-75.45,54.72l-41.17,29.86l15.76,48.36
                l28.88,88.62l-75.36-54.85l-41.12-29.93l-41.12,29.93l-75.36,54.85l28.88-88.62l15.76-48.36l-41.17-29.86l-75.45-54.72l93.21,0.08
                l50.86,0.04l15.68-48.39L404.11,226.74 M404.11,0l-95.2,293.87L0,293.6l250.07,181.36l-95.71,293.71l249.75-181.79l249.75,181.79
                l-95.71-293.71L808.22,293.6l-308.91,0.27L404.11,0L404.11,0z"/>
                <path class="st1" d="M404.11,111.71l44.81,138.33l24.45,75.48l79.35-0.07l145.4-0.13l-117.71,85.36l-64.23,46.58l24.58,75.44
                l45.05,138.25l-117.56-85.57l-64.15-46.69l-64.15,46.69L222.4,670.96l45.05-138.25l24.58-75.44l-64.23-46.58L110.1,325.32
                l145.4,0.13l79.35,0.07l24.45-75.48L404.11,111.71"/>
            </symbol>

            <symbol id="icon-chevron" viewBox="0 0 188.82 492.07">
                <style>
                    #icon-chevron .st0{fill:currentColor;}
                </style>
                <polygon class="st0" points="188.82,0 160.08,0 0,248.85 161.22,492.07 188.82,492.07 28.82,246.03 "/>
            </symbol>

        </svg>

        <span class="svg-symbols">
            <svg>
                <symbol id="icon-plus" x="0px" y="0px" viewBox="0 0 11 11" style="enable-background:new 0 0 11 11;">
                    <path d="M10.1,5.5H5.5v4.6 M5.5,5.5H0.9 M5.5,0.9v4.6"/>
                </symbol>
                <symbol id="icon-minus" x="0px" y="0px" viewBox="0 0 11 11" style="enable-background:new 0 0 11 11;">
                    <path d="M10.1,5.5H5.4 M5.4,5.5H0.7 M5.4,5.5"/>
                </symbol>
                <symbol id="icon-cart" viewBox="0 0 72 62">
                    <style>
                        #icon-cart path {
                            fill: currentColor;
                        }
                    </style>
                    <g>
                        <path d="M39,55a7,7,0,1,0,7-7,7,7,0,0,0-7,7m4,0a3,3,0,1,1,3,3,3,3,0,0,1-3-3" />
                        <path d="M7,55a7,7,0,1,0,7-7,7,7,0,0,0-7,7m4,0a3,3,0,1,1,3,3,3,3,0,0,1-3-3" />
                        <path d="M14,52H46a2,2,0,0,0,1.9-1.37L63.44,4H70a2,2,0,0,0,0-4H62a2,2,0,0,0-1.9,1.37L44.56,48H14a2,2,0,0,0,0,4" />
                        <path d="M10,40H50a2,2,0,1,0,0-4H11.44L4.77,16H58a2,2,0,1,0,0-4H2A2,2,0,0,0,.1,14.63l8,24A2,2,0,0,0,10,40" />
                        <path d="M6,28H54a2,2,0,1,0,0-4H6a2,2,0,0,0,0,4" /><path d="M37.5,40a2,2,0,0,0,2-1.75l3-24a2,2,0,0,0-4-.5l-3,24A2,2,0,0,0,37.25,40l.25,0" />
                        <path d="M22.5,40l.25,0a2,2,0,0,0,1.74-2.23l-3-24a2,2,0,0,0-4,.5l3,24a2,2,0,0,0,2,1.75" />
                    </g>
                </symbol>
                <symbol id="icon-search"
                    x="0px" y="0px" viewBox="0 0 34.2 34.3" style="enable-background:new 0 0 34.2 34.3;" xml:space="preserve">
                    <style type="text/css">
                        .st0{fill:none;stroke:currentColor;stroke-width:2;stroke-miterlimit:10;}
                        .st1{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
                    </style>
                    <path class="st0" d="M29.1,32.4l-9.7-9.7c-0.1-0.1-0.1-0.1-0.2-0.2C14.7,25.5,8.6,25,4.6,21c-4.5-4.5-4.5-11.9,0-16.5
                        s11.9-4.5,16.5,0c4,4,4.5,10.1,1.5,14.6c0.1,0.1,0.1,0.1,0.2,0.2l9.7,9.7c0.5,0.5,0.7,1.1,0.7,1.7c0,0.6-0.2,1.2-0.7,1.7
                        C31.6,33.4,30,33.4,29.1,32.4z"/>
                    <line class="st1" x1="22.6" y1="19.1" x2="19.2" y2="22.5"/>
                </symbol>

            </svg>
        </span>

    <nav aria-label="Social media channels" class="social">
        <a href="https://www.facebook.com/MicroTouchGroom" aria-label="Facebook" target="_blank">
            <svg class="icon social__icon"><use xlink:href="#icon-facebook"></use></svg>
        </a>

        <a href="https://www.instagram.com/microtouchgroom" aria-label="Instagram" target="_blank">
            <svg class="icon social__icon"><use xlink:href="#icon-instagram"></use></svg>
        </a>

        <a href="https://www.youtube.com/user/microtouchbrand/videos" aria-label="Youtube" target="_blank">
            <svg class="icon social__icon" ><use xlink:href="#icon-youtube"></use></svg>
        </a>

        <a href="https://twitter.com/microtouchgroom" aria-label="Twitter" target="_blank">
            <svg class="icon social__icon" ><use xlink:href="#icon-twitter"></use></svg>
        </a>

        <a href="https://www.tiktok.com/@microtouchgroom" aria-label="TikTok" target="_blank">
            <svg class="icon social__icon" ><use xlink:href="#icon-tiktok"></use></svg>
        </a>
    </nav>
    <% 
        if (isFrontPage)
        {
            %>
            <div class="footer__nav">
                <% Html.RenderPartial("SitemapList"); %>
            </div>
            <%
        }
        else
        {
            Html.RenderSnippet("COMMON-FOOTER");
        }
    %>
    <% if (DtmContext.Page.PageCode == "Checkout") { %>
    <script>
        const klaviyoDiv = document.getElementById('klaviyoDiv');

        addEventListener("ECDrawFormComplete", (event) => {
            if (!klaviyoDiv) return;

            klaviyoDiv.classList.add("hide");
        });

        addEventListener("PaymentOptionSelected", event => {
            if (!klaviyoDiv) return;

            const isDefault = event.detail === "";
            
            isDefault ? klaviyoDiv.classList.remove("hide") : klaviyoDiv.classList.add("hide");
        });
    </script>
    <% } %>
</div>
</footer>