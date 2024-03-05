// api
import InstagramMediaDTMAdapter from "Shared/ts/api/instagram/instagram-media-dtm-adapter";
import LoadItem from "Shared/ts/utils/load-item";

const instagramMedia = new InstagramMediaDTMAdapter();

const createInstagramGallery = (gallery: Element | null): void => {
    if (!gallery) return;

    const pictures = Array.from(
        gallery.querySelectorAll("[data-instagram-img-src]")
    );

    instagramMedia
        .requestImages()
        .then((media) => {
            pictures.forEach((picture, index): void => {
                const post = media[index];
                picture.setAttribute("data-instagram-img-src", post.media_url);

                picture.setAttribute(
                    "data-attr",
                    JSON.stringify({ alt: post.caption })
                );

                const link = picture.hasAttribute("href")
                    ? picture
                    : picture.querySelector(`a[href]`);
                if (!link) return;

                link.setAttribute("href", post.permalink);
            });
        })
        .catch((error) => {
            console.debug(error);
        })
        .finally(() => {
            pictures.forEach((picture) => {
                new LoadItem(picture, {
                    tag: "img",
                    src: "data-instagram-img-src"
                });
            });
        });
};

createInstagramGallery(document.querySelector(".slide--instagram"));
