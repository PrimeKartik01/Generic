import { createPropertyCard } from "../propertyCard/propertyCard.js";

export function initFeaturedListings({
    containerId,
    heading,
    properties
}) {

    const container = document.getElementById(containerId);
    if (!container) return;

    const cards = properties.map(createPropertyCard).join("");

    container.innerHTML = `
        <section class=" mx-auto px-6 md:px-10 py-5 md:py-16">
            <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
                <div>
                    <p class="eyebrow mb-3">${heading.eyebrow}</p>
                    <h2 class="font-display text-3xl md:text-4xl text-ink tracking-tight">${heading.title}</h2>
                </div>
                <p class="text-sm text-slate max-w-sm">${heading.description}</p>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                ${cards}
            </div>
        </section>
    `;

    container.addEventListener("click", (event) => {
        const button = event.target.closest(".js-enquire-btn");
        if (!button) return;
        window.location.href = "contact.html";
    });

}
