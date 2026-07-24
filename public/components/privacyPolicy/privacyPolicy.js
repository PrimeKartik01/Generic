export function initPrivacyPolicy({
    containerId,
    privacy
}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const sectionsHtml = privacy.sections.map(section => `
        <article id="${section.id}" class="bg-paper p-8 md:p-10 rounded-xl border border-ink/10 shadow-sm transition-all hover:border-brass-soft/30">
            <h2 class="font-display text-2xl text-ink font-semibold mb-4 tracking-tight">${section.heading}</h2>
            <p class="text-slate text-base leading-relaxed mb-4 font-normal">${section.content}</p>
            ${section.bullets ? `
                <ul class="space-y-3 pl-2 text-slate text-sm leading-relaxed border-l-2 border-brass-soft/40 my-4">
                    ${section.bullets.map(b => `<li class="pl-4 relative">${b}</li>`).join("")}
                </ul>
            ` : ""}
            ${section.contactInfo ? `
                <div class="mt-6 p-5 bg-sand/40 rounded-lg border border-brass/20 space-y-2 text-sm text-ink font-mono">
                    <div><span class="text-slate uppercase tracking-wider text-xs block font-sans font-semibold text-brass">Email:</span> ${section.contactInfo.email}</div>
                    <div><span class="text-slate uppercase tracking-wider text-xs block font-sans font-semibold text-brass">Phone:</span> ${section.contactInfo.phone}</div>
                    <div><span class="text-slate uppercase tracking-wider text-xs block font-sans font-semibold text-brass">Office:</span> ${section.contactInfo.address}</div>
                </div>
            ` : ""}
        </article>
    `).join("");

    container.innerHTML = `
        <section class="bg-sand/30 py-16 md:py-24 border-b border-ink/5">
            <div class="max-w-4xl mx-auto px-6">
                <nav class="flex items-center gap-2 text-xs font-mono text-slate uppercase tracking-widest mb-6">
                    <a href="index.html" class="hover:text-brass transition-colors">Home</a>
                    <span>/</span>
                    <span class="text-ink font-semibold">Privacy Policy</span>
                </nav>
                <h1 class="font-display text-4xl md:text-5xl lg:text-6xl text-ink font-light tracking-tight leading-tight">${privacy.title}</h1>
                <p class="text-lg md:text-xl text-slate max-w-2xl mt-4 leading-relaxed font-light">${privacy.subtitle}</p>
            </div>
        </section>

        <section class="py-16 md:py-20 bg-paper">
            <div class="max-w-4xl mx-auto px-6">
                <div class="bg-sand/20 p-6 md:p-8 rounded-xl border border-brass/30 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <p class="text-sm md:text-base text-ink-soft leading-relaxed max-w-2xl">${privacy.intro}</p>
                    <a href="contact.html" class="inline-flex items-center justify-center px-6 py-3 bg-ink text-paper hover:bg-ink-soft text-sm font-mono tracking-wider uppercase rounded transition-colors shrink-0 shadow-sm">
                        Contact Us
                    </a>
                </div>

                <div class="space-y-8">
                    ${sectionsHtml}
                </div>
            </div>
        </section>
    `;
}
