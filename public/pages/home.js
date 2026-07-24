import { initNavbar } from "../components/navbar/navbar.js";
import { initHeroCarousel } from "../components/heroCarousel/heroCarousel.js";
import { initEnquirySidePanel } from "../components/enquirySidePanel/enquirySidePanel.js";
import { initEnquiryPopup } from "../components/enquiryPopup/enquiryPopup.js";
import { initAboutStory } from "../components/aboutStory/aboutStory.js";
import { initFeaturedListings } from "../components/featuredListings/featuredListings.js";
import { initPhilosophy } from "../components/philosophy/philosophy.js";
import { initTestimonials } from "../components/testimonials/testimonials.js";
import { initCtaBanner } from "../components/ctaBanner/ctaBanner.js";
import { initFooter } from "../components/footer/footer.js";

import { navbarData } from "../data/navbarData.js";
import { heroCarouselData } from "../data/heroCarouselData.js";
import { enquirySidePanelData } from "../data/enquirySidePanelData.js";
import { enquiryPopupData } from "../data/enquiryPopupData.js";
import { aboutData } from "../data/aboutData.js";
import { properties } from "../data/properties.js";
import { listingsHeading } from "../data/listingsSectionData.js";
import { philosophyData } from "../data/philosophyData.js";
import { testimonialsData } from "../data/testimonialsData.js";
import { ctaBannerData } from "../data/ctaBannerData.js";
import { footerData } from "../data/footerData.js";

initNavbar({
    containerId: "navbar",
    navbar: navbarData
});

initHeroCarousel({
    containerId: "heroCarousel",
    carousel: heroCarouselData
});

initEnquirySidePanel({
    containerId: "enquirySidePanel",
    panel: enquirySidePanelData
});

initEnquiryPopup({
    containerId: "enquiryPopup",
    popup: enquiryPopupData
});

initAboutStory({
    containerId: "aboutStory",
    about: aboutData
});

initFeaturedListings({
    containerId: "listings",
    heading: listingsHeading,
    properties: properties
});

initPhilosophy({
    containerId: "philosophy",
    philosophy: philosophyData
});

initTestimonials({
    containerId: "testimonials",
    testimonials: testimonialsData
});

initCtaBanner({
    containerId: "ctaBanner",
    ctaBanner: ctaBannerData
});

initFooter({
    containerId: "footer",
    footer: footerData
});
