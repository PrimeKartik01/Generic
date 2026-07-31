export const navbarData = {
    brand: {
        name: "SS Prime",
        mark: "SS Prime"
    },
    links: [
        { label: "Home", href: "index.html" },
        {
            label: "Properties",
            href: "#",
            dropdown: [
                {
                    label: "Residential",
                    href: "residential.html",
                    filter: "Residential",
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>`,
                    desc: "Luxury homes & apartments"
                },
                {
                    label: "Commercial",
                    href: "commercial.html",
                    filter: "Commercial",
                    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>`,
                    desc: "Offices & retail spaces"
                }
            ]
        },
        { label: "Contact", href: "contact.html" },
    ],
    cta: {
        label: "Book a viewing",
        href: "contact.html"
    }
};

