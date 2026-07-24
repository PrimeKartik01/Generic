export function createPropertyCard(property) {

    return `
        <article class="blueprint-frame group bg-paper border border-hairline flex flex-col h-full">
            <div class="relative overflow-hidden shrink-0">
                <img src="${property.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop'}" alt="${property.name}, ${property.location}" class="w-full h-30 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
                <span class="absolute top-4 left-4 bg-ink text-paper text-xs font-mono uppercase tracking-wide px-3 py-1">${property.category || 'Featured'}</span>
            </div>
            <div class="p-3 md:p-6 flex flex-col grow">
                <div class="flex items-start justify-between gap-1 md:gap-4">
                    <div>
                        <h3 class="font-display text-lg md:text-xl text-ink">${property.name}</h3>
                        <p class="text-xs md:text-sm text-slate mt-1">${property.location}</p>
                    </div>
                    <p class="font-display font-semibold text-sm text-brass whitespace-nowrap pt-1">${property.price}</p>
                </div>
                <dl class="mt-2 md:mt-5 grid grid-cols-2 gap-2 pt-1 md:pt-4 border-t border-hairline font-mono text-xs text-slate grow">
                    <div><dt class="uppercase text-[10px] text-ink/50">Type</dt><dd class="text-ink mt-1">${property.propertyType}</dd></div>
                    <div><dt class="uppercase text-[10px] text-ink/50">Category</dt><dd class="text-ink mt-1">${property.category}</dd></div>
                </dl>
                <button type="button" class="js-enquire-btn mt-6 w-full border border-ink text-ink py-2.5 text-xs font-mono uppercase tracking-wide hover:bg-ink hover:text-paper transition-colors " data-property="${property.name}">
                    Enquire about this property
                </button>
            </div>
        </article>
    `;

}
