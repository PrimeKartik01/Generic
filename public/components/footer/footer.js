export function initFooter({
    containerId,
    footer
}) {

    const container = document.getElementById(containerId);
    if (!container) return;

    const columns = footer.columns.map(col => `
        <div>
            <h4 class="font-mono text-xs uppercase tracking-widest text-paper/50 mb-4">${col.heading}</h4>
            <ul class="space-y-2">
                ${col.links.map(link => `<li><a href="${link.href}" class="text-sm text-paper/80 hover:text-brass-soft transition-colors">${link.label}</a></li>`).join("")}
            </ul>
        </div>
    `).join("");

    const social = footer.social.map(item => `<a href="${item.href}" class="text-sm text-paper/80 hover:text-brass-soft transition-colors">${item.label}</a>`).join("");

    const privacyNoteHtml = footer.privacyNote ? `<p class="text-xs text-paper/40 max-w-md mt-4 leading-relaxed">${footer.privacyNote}</p>` : "";

    container.innerHTML = `
        <footer class="bg-ink text-paper border-t border-paper/10">
            <div class="mx-auto px-6 md:px-10 py-16 grid md:grid-cols-4 gap-10">
                <div class="md:col-span-2">
                    <span class="font-display text-xl font-medium tracking-wide">${footer.brand.name}</span>
                    <p class="text-sm text-paper/60 mt-3 max-w-xs leading-relaxed">${footer.brand.note}</p>
                    <div class="flex gap-5 mt-6">${social}</div>
                    ${privacyNoteHtml}
                </div>
                ${columns}
            </div>
            <div class="border-t border-paper/10 mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-paper/50 gap-4">
                <div class="flex gap-6 items-center">
                    <a href="privacy.html" class="hover:text-brass-soft transition-colors underline-offset-4 hover:underline">Privacy Policy</a>
                    <span class="text-paper/20">•</span>
                    <a href="contact.html" class="hover:text-brass-soft transition-colors underline-offset-4 hover:underline">Contact Us</a>
                </div>
            </div>
        </footer>
    `;

}
