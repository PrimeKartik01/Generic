import { initNavbar } from "../components/navbar/navbar.js";
import { initContactForm } from "../components/contactForm/contactForm.js";
import { initFooter } from "../components/footer/footer.js";

import { navbarData } from "../data/navbarData.js";
import { contactData } from "../data/contactData.js";
import { footerData } from "../data/footerData.js";

initNavbar({
    containerId: "navbar",
    navbar: navbarData
});

initContactForm({
    containerId: "contactForm",
    contact: contactData
});

initFooter({
    containerId: "footer",
    footer: footerData
});
