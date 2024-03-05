<%@ Page Language="C#" MasterPageFile="~/VersionViews/2.0000/Views/Layouts/InternalLayout.master" Inherits="System.Web.Mvc.ViewPage<OrderPageViewData>" %>
<%@ Import Namespace="Dtm.Framework.ClientSites" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server"></asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<main aria-labelledby="main-title" class="view hero slide section">
    <div id="main" class="view__anchor"></div>
    <div id="hero-carousel" class="slide__into">
        <picture class="contain contain--hero slide__item">
            <img
                src="/images/carousels/hero/ST2.png"
                alt=""
            />
        </picture>
        <picture class="contain contain--hero slide__item" data-src-img="/images/carousels/hero/T2.png" data-attr='{ "alt" : "" }'></picture>
    </div>
         <nav aria-label="Reviews previous and next slides" class="review__nav slide__nav">
                    <button
                        id="slide-prev"
                        aria-label="Select the previous slide"
                        class="slide__prev"
                        type="button">
                        <svg class="icon icon-chevron"><use href="#icon-chevron"></use></svg>
                    </button>
                    <button
                        id="slide-next"
                        aria-label="Select the next slide"
                        class="slide__next"
                        type="button">
                        <svg class="icon icon-chevron"><use href="#icon-chevron"></use></svg>
                    </button>
                </nav>
</main>

</asp:Content>
