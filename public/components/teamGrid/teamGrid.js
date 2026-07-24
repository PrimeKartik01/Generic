export function initTeamGrid({
    containerId,
    team
}) {

    const container = document.getElementById(containerId);
    if (!container) return;

    const members = team.members.map(member => `
        <div class="blueprint-frame group">
            <div class="overflow-hidden">
                <img src="${member.image}" alt="${member.name}" class="w-full h-72 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" loading="lazy">
            </div>
            <h3 class="font-display text-lg text-ink mt-4">${member.name}</h3>
            <p class="font-mono text-xs text-brass uppercase tracking-wide mt-1">${member.role}</p>
        </div>
    `).join("");

    container.innerHTML = `
        <section class="mx-auto px-6 md:px-10 py-20 md:py-28">
            <p class="eyebrow mb-3">${team.eyebrow}</p>
            <h2 class="font-display text-3xl md:text-4xl text-ink tracking-tight mb-12">${team.title}</h2>
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                ${members}
            </div>
        </section>
    `;

}
