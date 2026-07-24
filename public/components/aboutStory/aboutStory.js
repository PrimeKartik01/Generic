export function initAboutStory({
    containerId,
    about
}) {

    const container = document.getElementById(containerId);
    if (!container) return;

    const paragraphs = about.paragraphs.map(p => `<p class="text-slate max-md:text-sm mt-2 leading-relaxed mb-5">${p}</p>`).join("");

    const stats = about.stats.map(stat => `
        <div class="border-l border-hairline pl-4 ">
            <div class="font-mono text-lg md:text-2xl text-ink">${stat.value}</div>
            <div class="text-xs text-slate mt-1">${stat.label}</div>
        </div>
    `).join("");

    container.innerHTML = `
        <section class=" mx-auto px-6 md:px-10 grid md:grid-cols-2 py-5 md:pt-10 gap-14 items-start">
            <div class="blueprint-frame">
                <img src="${about.image}" alt="${about.imageAlt}" class="w-full h-[200px] md:h-[460px] object-cover" loading="lazy">
            </div>
            <div>
            <div class="mb-2">
                <p class=" text-lg md:text-5xl border-b pb-2">About Us</p>
            </div">
                ${paragraphs}
                <div class="grid grid-cols-3 gap-4 mt-10 max-w-md ">
                    ${stats}
                </div>
            </div>
        </section>
    `;

}
