export function initCtaBanner({
    containerId,
    ctaBanner
}) {

    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <section class="bg-brass">
            <div class=" mx-auto px-6 md:px-10 py-16 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                    <h2 class="font-display text-2xl md:text-3xl text-ink tracking-tight">${ctaBanner.title}</h2>
                    <p class="text-sm text-ink/70 mt-2 max-w-md">${ctaBanner.description}</p>
                </div>
                <a href="${ctaBanner.cta.href}" class="shrink-0 bg-ink text-paper px-6 py-3 text-sm font-mono uppercase tracking-wide hover:bg-ink-soft transition-colors">${ctaBanner.cta.label}</a>
            </div>
        </section>
    `;

}
