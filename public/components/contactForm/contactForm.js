import { markEnquirySubmitted } from "../../js/enquiryState.js";
import { attachEnquiryDuplicateGuard, validateEnquiryFields } from "../../js/enquiryDuplicateCheck.js";

export function initContactForm({
    containerId,
    contact
}) {

    const container = document.getElementById(containerId);
    if (!container) return;

    const details = contact.details.map(detail => `
        <div class="pt-5 border-t border-hairline">
            <dt class="font-mono text-xs uppercase tracking-wide text-brass">${detail.label}</dt>
            <dd class="text-sm text-ink mt-1">${detail.value}</dd>
        </div>
    `).join("");

    const fields = contact.form.fields.map(field => {
        const isPhone = field.type === "tel" || field.id === "phone" || field.name === "phone";
        const isEmail = field.type === "email" || field.id === "email" || field.name === "email";
        return `
            <div>
                <label for="${field.id}" class="block text-xs font-mono uppercase tracking-wide text-ink mb-2">${field.label}${field.required ? " *" : ""}</label>
                <input id="${field.id}" name="${field.name || field.id}" type="${field.type}" ${field.required ? "required" : ""} ${isPhone ? 'pattern="[0-9]{10}" maxlength="10" inputmode="numeric" placeholder="10-digit phone number"' : ''} ${isEmail ? 'placeholder="example@mail.com"' : ''} class="w-full border border-hairline bg-paper px-4 py-3 text-sm focus:border-brass outline-none">
            </div>
        `;
    }).join("");

    container.innerHTML = `
        <section class=" mx-auto px-6 md:px-10 py-16 md:py-24">
            <div class="max-w-2xl mb-14">
                <p class="eyebrow mb-4">${contact.eyebrow}</p>
                <h1 class="font-display text-3xl md:text-5xl tracking-tight text-ink leading-tight">${contact.title}</h1>
                <p class="text-slate mt-5 leading-relaxed">${contact.description}</p>
            </div>
            <div class="grid md:grid-cols-3 gap-14">
                <form id="contactFormEl" class="md:col-span-2 grid sm:grid-cols-2 gap-6" novalidate>
                    ${fields}
                    <div class="sm:col-span-2 flex items-center gap-5">
                        <button type="submit" class="bg-ink text-paper px-7 py-3 text-sm font-mono uppercase tracking-wide hover:bg-ink-soft transition-colors">${contact.form.submitLabel}</button>
                        <p id="contactFormStatus" class="text-sm text-brass hidden" role="status"></p>
                    </div>
                </form>
                <dl class="space-y-0">
                    ${details}
                </dl>
            </div>
        </section>
    `;

    const form = document.getElementById("contactFormEl");
    const status = document.getElementById("contactFormStatus");
    const duplicateGuard = attachEnquiryDuplicateGuard(form, status);

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!validateEnquiryFields(form, status)) {
            return;
        }

        if (duplicateGuard?.isDuplicate()) {
            return;
        }

        const formData = Object.fromEntries(new FormData(form));

        try {
            const response = await fetch("/api/enquiry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (!response.ok) {
                status.textContent = result.message || "Something went wrong.";
                status.classList.remove("hidden");
                if (response.status === 409) {
                    status.classList.add("text-red-600");
                }
                return;
            }

            markEnquirySubmitted();

            status.textContent = result.message || "Thanks — we'll be in touch within one business day.";
            status.classList.remove("hidden", "text-red-600");
            form.reset();

        } catch (error) {
            status.textContent = "Unable to connect to server.";
            status.classList.remove("hidden");
            console.error(error);
        }
    });

}
