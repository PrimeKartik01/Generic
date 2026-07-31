import { initNavbar } from "../components/navbar/navbar.js";
import { initPropertyListingsPage } from "../components/propertyListingsPage/propertyListingsPage.js";
import { initFooter } from "../components/footer/footer.js";

import { navbarData } from "../data/navbarData.js";
import { properties } from "../data/properties.js";
import { footerData } from "../data/footerData.js";

initNavbar({
    containerId: "navbar",
    navbar: navbarData
});

initPropertyListingsPage({
    containerId: "residentialListings",
    category: "Residential",
    properties: properties
});

initFooter({
    containerId: "footer",
    footer: footerData
});
