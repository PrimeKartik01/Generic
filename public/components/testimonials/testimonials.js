export function initTestimonials({
    containerId,
    testimonials
}) {

    const container = document.getElementById(containerId);
    if (!container) return;

    const items = testimonials.items.map(item => `
        <figure class="bg-sand p-8 flex flex-col justify-between h-full">
            <blockquote class="font-display text-lg md:text-xl text-ink leading-snug">"${item.quote}"</blockquote>
            <figcaption class="mt-6 font-mono text-xs text-slate uppercase tracking-wide">
                ${item.name} — ${item.context}
            </figcaption>
        </figure>
    `).join("");

    container.innerHTML = `
        <section class="mx-auto px-6 md:px-10 py-20 md:py-28">
            <p class="eyebrow mb-3">${testimonials.eyebrow}</p>
            <h2 class="font-display text-3xl md:text-4xl text-ink tracking-tight mb-12">${testimonials.title}</h2>
            <div class="grid md:grid-cols-3 gap-6">
                ${items}
            </div>
        </section>
    `;

}
