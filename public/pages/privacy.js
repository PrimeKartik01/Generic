import { initNavbar } from "../components/navbar/navbar.js";
import { initPrivacyPolicy } from "../components/privacyPolicy/privacyPolicy.js";
import { initFooter } from "../components/footer/footer.js";

import { navbarData } from "../data/navbarData.js";
import { privacyData } from "../data/privacyData.js";
import { footerData } from "../data/footerData.js";

initNavbar({
    containerId: "navbar",
    navbar: navbarData
});

initPrivacyPolicy({
    containerId: "privacyPolicy",
    privacy: privacyData
});

initFooter({
    containerId: "footer",
    footer: footerData
});
