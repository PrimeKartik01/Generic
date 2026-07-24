export function initPhilosophy({
    containerId,
    philosophy
}) {

    const container = document.getElementById(containerId);
    if (!container) return;

    const points = philosophy.points.map((point, index) => `
        <div class="pt-6 border-t border-hairline">
            <span class="font-mono text-xs text-brass uppercase tracking-wide">${point.label}</span>
            <h3 class="font-display text-lg text-ink mt-3">${point.title}</h3>
            <p class="text-sm text-slate mt-2 leading-relaxed">${point.copy}</p>
        </div>
    `).join("");

    container.innerHTML = `
        <section class="bg-ink text-paper">
            <div class="mx-auto px-6 md:px-10 py-20 md:py-28 grid md:grid-cols-2 gap-14">
                <div>
                    <p class="font-mono text-xs uppercase tracking-widest text-brass-soft mb-4">${philosophy.eyebrow}</p>
                    <h2 class="font-display text-3xl md:text-4xl tracking-tight leading-tight">${philosophy.title}</h2>
                    <p class="text-sm md:text-base text-paper/70 mt-6 max-w-md leading-relaxed">${philosophy.description}</p>
                </div>
                <div class="grid sm:grid-cols-3 gap-8">
                    ${points}
                </div>
            </div>
        </section>
    `;

}
