export function initNavbar({
    containerId,
    navbar
}) {

    const container = document.getElementById(containerId);
    if (!container) return;

    // Build desktop nav links (with dropdown support)
    const links = navbar.links.map(link => {
        if (link.dropdown) {
            const dropItems = link.dropdown.map(item => `
                <a href="${item.href}" 
                   class="nav-dropdown-item" 
                   data-filter="${item.filter}">
                    <span class="nav-dropdown-icon">${item.icon}</span>
                    <span class="nav-dropdown-text">
                        <span class="nav-dropdown-label">${item.label}</span>
                        <span class="nav-dropdown-desc">${item.desc}</span>
                    </span>
                </a>
            `).join("");

            return `
                <div class="nav-dropdown-wrapper">
                    <a href="${link.href}" class="nav-link nav-link-dropdown">
                        ${link.label}
                        <svg class="nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </a>
                    <div class="nav-dropdown-menu">
                        <div class="nav-dropdown-inner">
                            ${dropItems}
                        </div>
                    </div>
                </div>
            `;
        }
        return `<a href="${link.href}" class="nav-link">${link.label}</a>`;
    }).join("");

    // Build mobile links (flat list including dropdown items)
    const mobileLinks = navbar.links.flatMap(link => {
        if (link.dropdown) {
            return [
                `<span class="mobile-nav-group-label">Properties</span>`,
                ...link.dropdown.map(item =>
                    `<a href="${item.href}" class="mobile-nav-link" data-filter="${item.filter}">
                        <span>${item.icon}</span> ${item.label}
                    </a>`
                )
            ];
        }
        return [`<a href="${link.href}" class="mobile-nav-link">${link.label}</a>`];
    }).join("");

    container.innerHTML = `
        <header class="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-hairline">
            <nav class="mx-auto flex items-center justify-between px-6 md:px-10 py-5 relative" aria-label="Primary">
                <a href="index.html" class="flex items-center gap-3 group">
                    <span class="w-15 px-2 h-9 flex items-center justify-center bg-ink text-paper font-mono text-xl tracking-widest">${navbar.brand.mark}</span>
                </a>
                <div class="hidden md:flex items-center gap-8">
                    ${links}
                </div>
                <div class="flex items-center gap-4">
                    <a href="${navbar.cta.href}" class="hidden sm:inline-block border border-ink px-5 py-2 text-sm font-mono uppercase tracking-wide hover:bg-ink hover:text-paper transition-colors">${navbar.cta.label}</a>
                    <button id="navbarMenuToggle" class="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 z-50" aria-label="Toggle menu" aria-expanded="false">
                        <span id="hamburger-top" class="w-6 h-px bg-ink transition-transform duration-300"></span>
                        <span id="hamburger-bottom" class="w-6 h-px bg-ink transition-transform duration-300"></span>
                    </button>
                </div>
            </nav>
            <div id="navbarMobileOverlay" class="fixed inset-0 bg-ink/20 backdrop-blur-sm z-40 hidden md:hidden opacity-0 transition-opacity duration-300"></div>
            <div id="navbarMobileMenu" class="fixed top-0 left-0 w-full bg-paper z-40 p-8 pt-28 pb-10 flex flex-col gap-4 shadow-2xl -translate-y-full transition-transform duration-300 ease-out md:hidden">
                ${mobileLinks}
                <a href="${navbar.cta.href}" class="mt-4 border border-ink px-6 py-3 text-sm font-mono uppercase tracking-wide text-center hover:bg-ink hover:text-paper transition-colors">${navbar.cta.label}</a>
            </div>
        </header>
    `;

    // ── Mobile menu toggle ──────────────────────────────
    const toggle = document.getElementById("navbarMenuToggle");
    const menu = document.getElementById("navbarMobileMenu");
    const overlay = document.getElementById("navbarMobileOverlay");
    const topBar = document.getElementById("hamburger-top");
    const bottomBar = document.getElementById("hamburger-bottom");

    let isOpen = false;

    const toggleMenu = () => {
        isOpen = !isOpen;
        toggle.setAttribute("aria-expanded", String(isOpen));

        if (isOpen) {
            overlay.classList.remove("hidden");
            requestAnimationFrame(() => {
                overlay.classList.remove("opacity-0");
                menu.classList.remove("-translate-y-full");
                menu.classList.add("translate-y-0");
            });
            topBar.classList.add("translate-y-[3.5px]", "rotate-45");
            bottomBar.classList.add("-translate-y-[3.5px]", "-rotate-45");
            document.body.style.overflow = "hidden";
        } else {
            overlay.classList.add("opacity-0");
            menu.classList.remove("translate-y-0");
            menu.classList.add("-translate-y-full");
            topBar.classList.remove("translate-y-[3.5px]", "rotate-45");
            bottomBar.classList.remove("-translate-y-[3.5px]", "-rotate-45");
            document.body.style.overflow = "";
            setTimeout(() => { if (!isOpen) overlay.classList.add("hidden"); }, 300);
        }
    };

    toggle.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);

    // Close mobile menu when any link is clicked
    container.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (!link) return;
        if (isOpen) toggleMenu();
    });

}
