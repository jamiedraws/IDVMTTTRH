import Carousel from "Shared/ts/components/carousel";
import SlideCarouselAdapter from "Shared/ts/api/carousel/slide/adapters/slide-carousel";

import FadeCarousel from "Shared/ts/components/fade-carousel";
import FadeSlideCarouselAdapter from "Shared/ts/api/carousel/slide/adapters/fade-slide-carousel";

import VimeoCarousel from "Shared/ts/components/vimeo-carousel";
import VimeoSlideCarouselAdapter from "Shared/ts/api/carousel/slide/adapters/vimeo-slide-carousel";

import ResponsiveCarousel from "Shared/ts/components/responsive-carousel";
import ResponsiveSlideCarouselAdapter from "Shared/ts/api/carousel/slide/adapters/responsive-slide-carousel";

import MediaQuery from "Shared/ts/observers/media-query";

import { enumerateElements } from "Shared/ts/utils/html";
import { observer } from "Shared/ts/observers/intersection";

import ILazyApplication from "Shared/ts/interfaces/app/lazy";

import VimeoManager from "Shared/ts/utils/vimeo-manager";
import { initializeDocumentModalDialogsByTemplates } from "Shared/ts/applications/modal-dialog";

declare global {
    interface Window {
        app: ILazyApplication;
    }
}

const vimeoManager = new VimeoManager();

enumerateElements(
    document.querySelectorAll("[data-vimeo-carousel-id]")
).forEach((placeholder) => {
    const id = placeholder.getAttribute("data-vimeo-carousel-id");
    if (!id) return;

    const coords = placeholder.getBoundingClientRect();

    vimeoManager
        .generatePosterImage(id, {
            width: Math.ceil(coords.width).toString(),
            height: Math.ceil(coords.height).toString()
        })
        .then((src) => {
            placeholder.setAttribute("data-src-img", src);
        })
        .catch((error) => console.debug(error));
});

const preloadSlideImageByIndex = (container: Element, index: number): void => {
    if ("app" in window && window.app.require(["lazy"])) {
        const slide = container.querySelectorAll(".slide__item").item(index);

        window.app.lazy(slide);
    }
};

observer(".slide--vimeo-carousel", {
    inRange: (element) => {
        const carousel = new VimeoCarousel(
            new VimeoSlideCarouselAdapter(element)
        );

        carousel.autoplay();
        carousel.enableThumbnailControls();

        carousel.on("rotation", (currentIndex, prevIndex, nextIndex) => {
            if (currentIndex !== undefined) {
                preloadSlideImageByIndex(element, currentIndex);
            }

            if (nextIndex !== undefined) {
                preloadSlideImageByIndex(element, nextIndex);
            }
        });
    },
    options: {
        threshold: [0.5]
    }
});

const generateRandomIntegerInRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

observer(".slide--fade", {
    inRange: (element) => {
        let initialDelay = generateRandomIntegerInRange(3000, 5000);

        const carousel = new FadeCarousel(
            new FadeSlideCarouselAdapter(element)
        );

        carousel.setAttributes({ delay: initialDelay });
        carousel.autoplay();

        carousel.on("rotation", (currentIndex) => {
            const delay =
                currentIndex === 0 ? initialDelay : initialDelay * 1.5;

            carousel.setAttributes({ delay });
        });
    }
});

observer(".slide--review", {
    inRange: (element) => {
        const carousel = new ResponsiveCarousel(
            new ResponsiveSlideCarouselAdapter(element)
        );

        carousel.enablePrevNextControls();

        new MediaQuery("(min-width: 1201px)").inbound((event) => {
            carousel.setAttributes({ steps: 3 });
        });

        new MediaQuery("(min-width: 1001px) and (max-width: 1200px)").inbound(
            (event) => {
                carousel.setAttributes({ steps: 3 });
            }
        );

        new MediaQuery("(min-width: 801px) and (max-width: 1000px)").inbound(
            (event) => {
                carousel.setAttributes({ steps: 2 });
            }
        );

        new MediaQuery("(max-width: 800px)").inbound((event) => {
            carousel.setAttributes({ steps: 1 });
        });
    }
});

observer(".product--single .slide--product:not(.slide--fade)", {
    inRange: (element) => {
        const carousel = new Carousel(new SlideCarouselAdapter(element));

        carousel.enableThumbnailControls();

        carousel.on("rotation", (currentIndex) => {
            if (currentIndex !== undefined) {
                preloadSlideImageByIndex(element, currentIndex);
            }
        });
    }
});

initializeDocumentModalDialogsByTemplates();
