<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<ClientSiteViewData>" %>

<%
var instagramLink = "https://www.instagram.com/microtouchgroom/";
%>

<section aria-label="Instagram pictures" class="view instagram section">
    <div class="view__in">
        <div class="slide slide--responsive slide--instagram">
            <div id="instagram-pictures" class="slide__into">
                <a href="<%= instagramLink %>" target="_blank" class="contain contain--square slide__item instagram__picture" data-instagram-img-src="/images/instagram/microtouch-1.jpg" title="View this post on Instagram">
                </a>
                <a href="<%= instagramLink %>" target="_blank" class="contain contain--square slide__item instagram__picture" data-instagram-img-src="/images/instagram/microtouch-2.jpg" title="View this post on Instagram">
                </a>
                <a href="<%= instagramLink %>" target="_blank" class="contain contain--square slide__item instagram__picture" data-instagram-img-src="/images/instagram/microtouch-3.jpg" title="View this post on Instagram">
                </a>
                <a href="<%= instagramLink %>" target="_blank" class="contain contain--square slide__item instagram__picture" data-instagram-img-src="/images/instagram/microtouch-4.jpg" title="View this post on Instagram">
                </a>
                <a href="<%= instagramLink %>" target="_blank" class="contain contain--square slide__item instagram__picture" data-instagram-img-src="/images/instagram/microtouch-5.jpg" title="View this post on Instagram">
                </a>
            </div>
        </div>
    </div>
</section>


