import { createPropertyCard } from "../propertyCard/propertyCard.js";

/**
 * Renders a full property listing page section
 * with hero banner, breadcrumb, and property grid.
 *
 * @param {{ containerId: string, category: string, heading: object, properties: Array }} config
 */
export function initPropertyListingsPage({
    containerId,
    category,        // "Residential" | "Commercial"
    heading,
    properties
}) {

    const container = document.getElementById(containerId);
    if (!container) return;

    const filtered = properties.filter(p => p.category === category);
    const cards = filtered.map(createPropertyCard).join("");

    const isResidential = category === "Residential";
    const accentIcon = isResidential
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>`;
    const eyebrow = isResidential ? "Residential Properties" : "Commercial Properties";
    const title = isResidential ? "Luxury Homes & Apartments" : "Premium Offices & Retail Spaces";
    const desc = isResidential
        ? "Curated residential properties — handpicked for quality, location, and lifestyle."
        : "Strategic commercial spaces — offices, retail, and business hubs in prime locations.";

    const emptyState = filtered.length === 0 ? `
        <div class="col-span-full text-center py-24">
            <div class="flex justify-center mb-5 text-slate/40">
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="7" width="20" height="15" rx="1"/>
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                    <line x1="12" y1="12" x2="12" y2="16"/>
                    <line x1="10" y1="14" x2="14" y2="14"/>
                </svg>
            </div>
            <p class="font-display text-2xl text-ink mb-2">No listings yet</p>
            <p class="text-sm text-slate">Check back soon — new inventory added weekly.</p>
        </div>
    ` : cards;

    container.innerHTML = `
        <!-- Page Hero Banner -->
        <section class="property-page-hero bg-sand border-b border-hairline">
            <div class="mx-auto px-6 md:px-10 py-14 md:py-20">
                <!-- Breadcrumb -->
                <nav class="flex items-center gap-2 text-xs font-mono text-slate mb-8" aria-label="Breadcrumb">
                    <a href="index.html" class="hover:text-brass transition-colors">Home</a>
                    <span class="text-line">›</span>
                    <a href="#" class="hover:text-brass transition-colors">Properties</a>
                    <span class="text-line">›</span>
                    <span class="text-ink font-medium">${category}</span>
                </nav>

                <div class="flex items-start gap-4 md:gap-6">
                    <span class="property-page-icon property-page-icon--svg">${accentIcon}</span>
                    <div>
                        <p class="eyebrow mb-3">${eyebrow}</p>
                        <h1 class="font-display text-4xl md:text-5xl text-ink tracking-tight leading-tight">${title}</h1>
                        <p class="mt-4 text-slate text-sm md:text-base max-w-xl leading-relaxed">${desc}</p>
                        <p class="mt-5 font-mono text-xs text-brass">
                            ${filtered.length} ${filtered.length === 1 ? "property" : "properties"} available
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Listings Grid -->
        <section class="mx-auto px-6 md:px-10 py-10 md:py-16">
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 listings-grid">
                ${emptyState}
            </div>

            <!-- Back link -->
            <div class="mt-16 pt-10 border-t border-hairline flex items-center justify-between flex-wrap gap-4">
                <a href="index.html" class="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-slate hover:text-ink transition-colors group">
                    <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    Back to Home
                </a>
                <a href="${isResidential ? 'commercial.html' : 'residential.html'}" 
                   class="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-slate hover:text-brass transition-colors group">
                    View ${isResidential ? "Commercial" : "Residential"} Properties
                    <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </a>
            </div>
        </section>
    `;

    // Enquire button delegation
    container.addEventListener("click", (event) => {
        const button = event.target.closest(".js-enquire-btn");
        if (!button) return;
        window.location.href = "contact.html";
    });

}
