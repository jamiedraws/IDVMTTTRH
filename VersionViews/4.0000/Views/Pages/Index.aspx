<%@ Page Language="C#" MasterPageFile="~/VersionViews/4.0000/Views/Layouts/InternalLayout.master" Inherits="System.Web.Mvc.ViewPage<OrderPageViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server"></asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script runat="server">
        public class Review
        {
            public int DisplayRank { get; set; }
            public int ProductType { get; set; }
            public string Comment { get; set; }
            public string Author { get; set; }
        }
    </script>

    <main aria-labelledby="main-title" class="view section content">
        <div id="main" class="view__anchor"></div>
        <picture class="contain contain--product-banner content--product-banner">
            <source srcset="/images/4.0000/product-banner-square.jpg" media="(max-width: 650px)">
            <source srcset="/images/4.0000/product-banner-900w.jpg" media="(min-width: 650px)">
            <img
                src="/images/4.0000/product-banner-900w.jpg"
                width="1482"
                height="359"
                alt="MicroTouch Titanium"
            />
        </picture>
    </main>

    <%= Html.Partial("ProductCategory", Model, new ViewDataDictionary
        {
            { "Placeholders", new List<string> 
                {
                    @"<img src=""/images/4.0000/MTT_FreeShippingOver50.png"" alt=""Free Shipping Over $50"">"
                }
            }
        }) %> 

    <section aria-label="Product animations" class="view animation-carousel section">
        <div id="product-animation" class="view__anchor"></div>
        <div class="view__in animation-carousel__in section__contain">
            <div class="slide slide--vimeo-carousel">
                <div class="slide__into" id="vimeo-carousel">
                    <div id="vimeo-carousel-slide-1" class="slide__item">
                        <!-- MicroTouch Titanium MAX Animation -->
                        <div
                            data-src-img=""
                            data-vimeo-carousel-id="772052083&background=1&loop=0"
                            class="contain contain--video"
                        ></div>
                    </div>
                    <div id="vimeo-carousel-slide-2" class="slide__item">
                        <!-- MicroTouch Titanium ROVOR Animation -->
                        <div
                            data-src-img=""
                            data-vimeo-carousel-id="780850682&background=1&loop=0"
                            class="contain contain--video"
                        ></div>
                    </div>
                    <div id="vimeo-carousel-slide-3" class="slide__item">
                        <!-- MicroTouch Titanium Head Shaver Animation -->
                        <div
                            data-src-img=""
                            data-vimeo-carousel-id="801347754&background=1&loop=0"
                            class="contain contain--video"
                        ></div>
                    </div>
                    <div id="vimeo-carousel-slide-4" class="slide__item">
                        <!-- MicroTouch SOLO Titanium Animation -->
                        <div
                            data-src-img=""
                            data-vimeo-carousel-id="591916571&background=1&loop=0"
                            class="contain contain--video"
                        ></div>
                    </div>
                    <div id="vimeo-carousel-slide-5" class="slide__item">
                        <!-- MicroTouch Titanium Trim Animation -->
                        <div
                            data-src-img=""
                            data-vimeo-carousel-id="591916436&background=1&loop=0"
                            class="contain contain--video"
                        ></div>
                    </div>
                </div>
                <div class="slide__js">
                    <nav aria-label="Animation menu" class="slide__thumbnails">
                        <a
                            href="#vimeo-carousel-slide-1"
                            class="slide__thumbnail slide__dot"
                            title="Select the first slide"
                            data-slide-index="0"
                        >
                            <span>1</span>
                        </a>
                        <a
                            href="#vimeo-carousel-slide-2"
                            class="
                                slide__thumbnail slide__dot slide__thumbnail--is-selected
                            "
                            title="Select the second slide"
                            data-slide-index="1"
                        >
                            <span>2</span>
                        </a>
                        <a
                            href="#vimeo-carousel-slide-3"
                            class="slide__thumbnail slide__dot"
                            title="Select the last slide"
                            data-slide-index="2"
                        >
                            <span>3</span>
                        </a>
                        <a
                            href="#vimeo-carousel-slide-4"
                            class="slide__thumbnail slide__dot"
                            title="Select the last slide"
                            data-slide-index="3"
                        >
                            <span>4</span>
                        </a>
                        <a
                            href="#vimeo-carousel-slide-5"
                            class="slide__thumbnail slide__dot"
                            title="Select the last slide"
                            data-slide-index="4"
                        >
                            <span>5</span>
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    </section>

    <section aria-label="Customer reviews" class="view review section">
        <div id="customer-reviews" class="view__anchor"></div>
        <div class="view__in section__in">
            <div class="content content--title-desc">
                <h2 class="title" id="customer-reviews-title">Customers With Five Star Reviews</h2>
                <div class="review__stars review__stars--title">
                    <svg class="icon"><use xlink:href="#icon-star"></use></svg>
                    <svg class="icon"><use xlink:href="#icon-star"></use></svg>
                    <svg class="icon"><use xlink:href="#icon-star"></use></svg>
                    <svg class="icon"><use xlink:href="#icon-star"></use></svg>
                    <svg class="icon"><use xlink:href="#icon-star"></use></svg>
                </div>
            </div>
            <div
        class="slide slide--responsive slide--review"
        data-carousel-config='{ "steps" : 3 }'
    >
                <div class="slide__into" id="responsive-carousel" data-slide-config='{ "steps" : 3 }'>
                    <%
                        var customerReviews = new List<Review>
                        {
                            new Review
                            {
                                DisplayRank = 1,
                                ProductType = 1,
                                Comment = "If you can comb it, you can cut it... simple",
                                Author = "Justin W."
                            },
                            new Review
                            {
                                DisplayRank = 2,
                                ProductType = 2,
                                Comment = "It was awesome. The power, the way it cuts. The Solo Titanium&trade; takes it  to the next level.",
                                Author = "Nick F."
                            },
                            new Review
                            {
                                DisplayRank = 5,
                                ProductType = 3,
                                Comment = "It is the ultimate finish. You look fresh and dialed, just like you would coming out of a barber shop.",
                                Author = "Corey M."
                            },
                            new Review
                            {
                                DisplayRank = 4,
                                ProductType = 4,
                                Comment = "If you want a smooth clean, shave with no bumps or burns, get the Titanium ROVOR.",
                                Author = "Darin M."
                            },
                            new Review
                            {
                                DisplayRank = 7,
                                ProductType = 1,
                                Comment = "I can give myself a professional at-home haircut, how I like it.",
                                Author = "Fred J."
                            },
                            new Review
                            {
                                DisplayRank = 8,
                                ProductType = 2,
                                Comment = "Never seen anything like this, ever. Going from what I&rsquo;ve used before to this was a huge step up.",
                                Author = "Quentin S."
                            },
                            new Review
                            {
                                DisplayRank = 9,
                                ProductType = 4,
                                Comment = "The ROVOR goes everywhere! Face, neck, shoulders, head...no nicks, no cuts. Perfect shave.",
                                Author = "Jamal A."
                            },
                            new Review
                            {
                                DisplayRank = 11,
                                ProductType = 3,
                                Comment = "It&rsquo;s the difference between having a good groom, and then taking it to a great groom.",
                                Author = "Matthew F."
                            },
                            new Review
                            {
                                DisplayRank = 12,
                                ProductType = 1,
                                Comment = "The extra little extension made it so easy. I would never use any other clippers.",
                                Author = "Matthew D."
                            },
                            new Review
                            {
                                DisplayRank = 13,
                                ProductType = 2,
                                Comment = "Perfect &rsquo;barber-style&rsquo; look, right out of the box.",
                                Author = "Nick F."
                            },
                            new Review
                            {
                                DisplayRank = 14,
                                ProductType = 4,
                                Comment = "This is next-level shaving.",
                                Author = "Ricky M."
                            },
                            new Review
                            {
                                DisplayRank = 15,
                                ProductType = 3,
                                Comment = "It is what I use to finish my groom the right way, every time.",
                                Author = "Rob A."
                            },
                            new Review
                            {
                                DisplayRank = 3,
                                ProductType = 5,
                                Comment = "It's awesome. Best shaver I've used in my entire life of shaving my head.",
                                Author = "James B."
                            },
                            new Review
                            {
                                DisplayRank = 6,
                                ProductType = 5,
                                Comment = "5 minutes and my whole head is done. It's perfect.",
                                Author = "Kevin W."
                            },
                            new Review
                            {
                                DisplayRank = 10,
                                ProductType = 5,
                                Comment = "My head has never been this smooth before until I used this.",
                                Author = "D.R."
                            }
                        };

                        var productTitleTypes = new Dictionary<int, string>
                        {
                            { 1, "TITANIUM TRIM<sup>&trade;</sup>" },
                            { 2, "SOLO TITANIUM" },
                            { 3, "TITANIUM MAX" },
                            { 4, "TITANIUM ROVOR<sup>&trade;</sup>" },
                            { 5, "TITANIUM HEAD SHAVER" }
                        };

                        foreach (var customerReview in customerReviews.OrderBy(r => r.DisplayRank).ToList())
                        {
                            var title = productTitleTypes[customerReview.ProductType];
                            %>
                            <div class="slide__item">
                                <figure class="review__figure">
                                    <div class="review__title"><%= title %></div>
                                    <div class="review__stars review__stars--customer">
                                        <svg class="icon"><use xlink:href="#icon-star"></use></svg>
                                        <svg class="icon"><use xlink:href="#icon-star"></use></svg>
                                        <svg class="icon"><use xlink:href="#icon-star"></use></svg>
                                        <svg class="icon"><use xlink:href="#icon-star"></use></svg>
                                        <svg class="icon"><use xlink:href="#icon-star"></use></svg>
                                    </div>
                                    <div class="review__body">
                                        <blockquote>&quot;<%= customerReview.Comment %>&quot;</blockquote>
                                        <figcaption>&mdash; <%= customerReview.Author %></figcaption>
                                    </div>
                                </figure>
                            </div>
                            <%
                        }
                    %>
                </div>
                <div class="slide__js">
                    <nav aria-label="Customer reviews navigation" class="slide__nav">
                        <button
                            aria-label="Select the previous slide"
                            class="slide__prev"
                            type="button"
                        >
                            <svg class="icon"><use xlink:href="#icon-chevron"></use></svg>
                        </button>
                        <button
                            aria-label="Select the next slide"
                            class="slide__next"
                            type="button"
                        >
                            <svg class="icon"><use xlink:href="#icon-chevron"></use></svg>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    </section>

</asp:Content>