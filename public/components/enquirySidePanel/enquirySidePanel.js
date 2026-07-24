import { markEnquirySubmitted } from "../../js/enquiryState.js";
import { attachEnquiryDuplicateGuard, validateEnquiryFields } from "../../js/enquiryDuplicateCheck.js";

export function initEnquirySidePanel({
    containerId,
    panel
}) {

    const container = document.getElementById(containerId);
    if (!container) return;

    const fields = panel.fields.map(field => {
        const isPhone = field.type === "tel" || field.name === "phone" || field.id === "phone";
        const isEmail = field.type === "email" || field.name === "email" || field.id === "email";
        return `
            <div>
                <label for="${field.id}" class="block text-xs font-mono uppercase tracking-wide text-ink mb-2">${field.label}${field.required ? " *" : ""}</label>
                <input id="${field.id}" name="${field.name || field.id}" type="${field.type}" ${field.required ? "required" : ""} ${isPhone ? 'pattern="[0-9]{10}" maxlength="10" inputmode="numeric" placeholder="10-digit phone number"' : ''} ${isEmail ? 'placeholder="example@mail.com"' : ''} class="w-full border border-hairline bg-paper px-4 py-3 text-sm focus:border-brass outline-none">
            </div>
        `;
    }).join("");

    container.innerHTML = `
        <div class="hidden md:block m-2 bg-paper/95 backdrop-blur-sm border border-hairline shadow-[0_20px_60px_rgba(27,36,48,0.12)] p-6 md:p-7">
            <h2 class="font-display text-xl text-ink">${panel.title}</h2>
            <p class="text-sm text-slate mt-2 leading-relaxed">${panel.description}</p>
            <form id="sidePanelForm" class="mt-6 space-y-4" novalidate>
                ${fields}
                <button type="submit" class="w-full bg-ink text-paper py-3 text-sm font-mono uppercase tracking-wide hover:bg-ink-soft transition-colors">${panel.submitLabel}</button>
                <p id="sidePanelStatus" class="text-sm text-brass hidden" role="status"></p>
            </form>
        </div>
    `;

    const form = document.getElementById("sidePanelForm");
    const status = document.getElementById("sidePanelStatus");
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

            status.textContent = result.message;
            status.classList.remove("hidden", "text-red-600");

            form.reset();

        } catch (error) {

            status.textContent = "Unable to connect to server.";
            status.classList.remove("hidden");

            console.error(error);

        }

    });

}
