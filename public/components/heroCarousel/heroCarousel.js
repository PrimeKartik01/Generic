export function initHeroCarousel({
    containerId,
    carousel
}) {

    const container = document.getElementById(containerId);
    if (!container) return;

    const slides = carousel.slides.map((slide, index) => `
        <div class="hero-slide absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === 0 ? "opacity-100" : "opacity-0 pointer-events-none"}" data-slide-index="${index}">
            <img src="${slide.image}" alt="${slide.imageAlt}" class="w-full h-full object-cover" loading="${index === 0 ? "eager" : "lazy"}">
            <div class="absolute inset-0 bg-black/35"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
            <div class="absolute bottom-24 md:bottom-20 max-md:text-center left-0 right-0 p-6 md:p-10">
                <p class="font-mono text-xs hidden md:block uppercase tracking-widest text-brass-soft mb-3">${slide.eyebrow}</p>
                <h1 class="font-display text-3xl md:text-5xl text-paper leading-[1.05] tracking-tight max-w-xl">${slide.title}</h1>
                <p class="text-paper/80 text-white hidden md:block mt-4 max-w-md text-sm md:text-base leading-relaxed">${slide.subtitle}</p>
            </div>
        </div>
    `).join("");

    const dots = carousel.slides.map((_, index) => `
        <button class="hero-dot w-8 h-1.5 transition-colors ${index === 0 ? "bg-brass" : "bg-paper/40"}" data-dot-index="${index}" aria-label="Go to slide ${index + 1}"></button>
    `).join("");

    const stats = carousel.stats.map(stat => `
        <div class="border-l border-hairline pl-4">
            <div class="font-mono text-xl md:text-2xl text-ink">${stat.value}</div>
            <div class="text-xs text-slate mt-1">${stat.label}</div>
        </div>
    `).join("");

    container.innerHTML = `
        <div class=" relative h-[300px] md:h-[620px] overflow-hidden rounded-[2px]">
            ${slides}
            <a class="absolute md:hidden left-1/2 -translate-x-1/2 bottom-12 text-black text-xs p-1.5 shadow-xl font-mono bg-white" href="contact.html">
                Contact-Us
            </a>

            <div class="absolute bottom-6 right-6 flex gap-2 z-10">
                ${dots}
            </div>
        </div>
    `;

    const slideEls = container.querySelectorAll(".hero-slide");
    const dotEls = container.querySelectorAll(".hero-dot");
    let activeIndex = 0;
    let timer = null;

    function goTo(index) {
        slideEls[activeIndex].classList.add("opacity-0", "pointer-events-none");
        slideEls[activeIndex].classList.remove("opacity-100");
        dotEls[activeIndex].classList.remove("bg-brass");
        dotEls[activeIndex].classList.add("bg-paper/40");

        activeIndex = index;

        slideEls[activeIndex].classList.remove("opacity-0", "pointer-events-none");
        slideEls[activeIndex].classList.add("opacity-100");
        dotEls[activeIndex].classList.add("bg-brass");
        dotEls[activeIndex].classList.remove("bg-paper/40");
    }

    function next() {
        goTo((activeIndex + 1) % slideEls.length);
    }

    function start() {
        timer = setInterval(next, carousel.intervalMs);
    }

    function stop() {
        clearInterval(timer);
    }

    dotEls.forEach(dot => {
        dot.addEventListener("click", () => {
            const index = Number(dot.dataset.dotIndex);
            if (index === activeIndex) return;
            goTo(index);
            stop();
            start();
        });
    });

    container.addEventListener("mouseenter", stop);
    container.addEventListener("mouseleave", start);

    start();

}
