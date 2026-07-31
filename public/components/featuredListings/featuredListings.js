import { createPropertyCard } from "../propertyCard/propertyCard.js";

export function initFeaturedListings({
    containerId,
    heading,
    properties
}) {

    const container = document.getElementById(containerId);
    if (!container) return;

    // Available filters derived from data
    const filters = ["All", ...new Set(properties.map(p => p.category))];
    let activeFilter = "All";

    function getFilteredCards(filter) {
        const filtered = filter === "All"
            ? properties
            : properties.filter(p => p.category === filter);
        return filtered.map(createPropertyCard).join("");
    }

    // SVG icons for filter tabs
    const svgIcons = {
        All: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
        Residential: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>`,
        Commercial: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>`
    };

    function renderFilterTabs() {
        return filters.map(f => `
            <button 
                class="listings-filter-btn ${f === activeFilter ? 'active' : ''}" 
                data-filter="${f}">
                ${svgIcons[f] || ""}
                ${f}
            </button>
        `).join("");
    }


    function render() {
        container.innerHTML = `
            <section class="mx-auto px-6 md:px-10 py-5 md:py-16">
                <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                    <div>
                        <p class="eyebrow mb-3">${heading.eyebrow}</p>
                        <h2 class="font-display text-3xl md:text-4xl text-ink tracking-tight">${heading.title}</h2>
                    </div>
                    <p class="text-sm text-slate max-w-sm">${heading.description}</p>
                </div>

                <!-- Filter Tabs -->
                <div class="listings-filter-tabs mb-10">
                    ${renderFilterTabs()}
                </div>

                <!-- Property Grid -->
                <div id="listingsGrid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 listings-grid">
                    ${getFilteredCards(activeFilter)}
                </div>
            </section>
        `;

        // Attach filter tab click events
        container.querySelectorAll(".listings-filter-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                activeFilter = btn.dataset.filter;
                applyFilter(activeFilter);
            });
        });

        // Enquire button delegation
        container.addEventListener("click", (event) => {
            const button = event.target.closest(".js-enquire-btn");
            if (!button) return;
            window.location.href = "contact.html";
        });
    }

    function applyFilter(filter) {
        activeFilter = filter;

        // Update tab active states
        container.querySelectorAll(".listings-filter-btn").forEach(btn => {
            btn.classList.toggle("active", btn.dataset.filter === filter);
        });

        // Animate out → swap cards → animate in
        const grid = document.getElementById("listingsGrid");
        if (!grid) return;

        grid.classList.add("listings-grid-exit");

        setTimeout(() => {
            grid.innerHTML = getFilteredCards(filter);
            grid.classList.remove("listings-grid-exit");
            grid.classList.add("listings-grid-enter");
            setTimeout(() => grid.classList.remove("listings-grid-enter"), 400);
        }, 200);
    }

    // Listen for navbar dropdown filter events
    window.addEventListener("propertyFilterChange", (e) => {
        applyFilter(e.detail.filter);
    });

    render();

}
