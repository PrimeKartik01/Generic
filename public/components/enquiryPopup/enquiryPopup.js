import {
    hasSubmittedEnquiry,
    markEnquirySubmitted,
    getPopupShownCount,
    incrementPopupShownCount
} from "../../js/enquiryState.js";
import { attachEnquiryDuplicateGuard, validateEnquiryFields } from "../../js/enquiryDuplicateCheck.js";

let modalEl = null;
let formEl = null;
let statusEl = null;
let regardingEl = null;
let propertyInputEl = null;
let popupConfig = null;
let duplicateGuard = null;

export function initEnquiryPopup({
    containerId,
    popup
}) {

    const container = document.getElementById(containerId);
    if (!container) return;

    popupConfig = popup;

    const fields = popup.fields.map(field => {
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
        <div id="enquiryPopupOverlay" class="hidden fixed inset-0 bg-ink/70 z-[100] items-end md:items-center justify-center p-0 md:p-6" role="dialog" aria-modal="true" aria-labelledby="enquiryPopupTitle">
            <div class="bg-paper max-w-md w-full p-7 md:p-8 relative  md:rounded-none max-h-[90vh] overflow-y-auto">
                <button id="enquiryPopupClose" type="button" aria-label="Close" class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-ink hover:text-brass text-xl leading-none">&times;</button>
                <h2 id="enquiryPopupTitle" class="font-display text-2xl text-ink pr-6">${popup.title}</h2>
                <p class="text-sm text-slate mt-2 leading-relaxed">${popup.description}</p>
                <p id="enquiryPopupRegarding" class="text-xs font-mono uppercase tracking-wide text-brass mt-3 hidden"></p>
                <form id="enquiryPopupForm" class="mt-6 space-y-4" novalidate>
                    <input type="hidden" id="enquiryPopupProperty" name="property">
                    ${fields}
                    <button type="submit" class="w-full bg-ink text-paper py-3 text-sm font-mono uppercase tracking-wide hover:bg-ink-soft transition-colors">${popup.submitLabel}</button>
                    <p id="enquiryPopupStatus" class="text-sm text-brass hidden" role="status"></p>
                </form>
            </div>
        </div>
    `;

    modalEl = document.getElementById("enquiryPopupOverlay");
    formEl = document.getElementById("enquiryPopupForm");
    statusEl = document.getElementById("enquiryPopupStatus");
    regardingEl = document.getElementById("enquiryPopupRegarding");
    propertyInputEl = document.getElementById("enquiryPopupProperty");
    duplicateGuard = attachEnquiryDuplicateGuard(formEl, statusEl);

    document.getElementById("enquiryPopupClose").addEventListener("click", closeEnquiryPopup);
    modalEl.addEventListener("click", (event) => {
        if (event.target === modalEl) closeEnquiryPopup();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !modalEl.classList.contains("hidden")) closeEnquiryPopup();
    });

    formEl.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!validateEnquiryFields(formEl, statusEl)) {
            return;
        }

        if (duplicateGuard?.isDuplicate()) {
            return;
        }

        const formData = Object.fromEntries(new FormData(formEl));

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
                statusEl.textContent = result.message || "Something went wrong.";
                statusEl.classList.remove("hidden");
                statusEl.classList.add("text-red-600");
                return;
            }

            markEnquirySubmitted();
            statusEl.textContent = result.message || "Thanks — an agent will call you back today.";
            statusEl.classList.remove("hidden", "text-red-600");

            setTimeout(() => {
                closeEnquiryPopup();
                formEl.reset();
                statusEl.classList.add("hidden");
            }, 1400);

        } catch (error) {

            statusEl.textContent = "Unable to connect to server.";
            statusEl.classList.remove("hidden");
            statusEl.classList.add("text-red-600");
            console.error(error);

        }
    });

    scheduleAutoPopups();

}

function scheduleAutoPopups() {
    if (!popupConfig) return;

    setTimeout(() => {
        if (hasSubmittedEnquiry() || getPopupShownCount() >= 1) return;
        openEnquiryPopup();
        incrementPopupShownCount();
    }, popupConfig.firstShowMs);

    setTimeout(() => {
        if (hasSubmittedEnquiry() || getPopupShownCount() >= 2) return;
        openEnquiryPopup();
        incrementPopupShownCount();
    }, popupConfig.secondShowMs);
}

export function openEnquiryPopup(propertyName) {
    if (!modalEl || hasSubmittedEnquiry()) return;

    if (propertyName) {
        regardingEl.textContent = `Regarding: ${propertyName}`;
        regardingEl.classList.remove("hidden");
        propertyInputEl.value = propertyName;
    } else {
        regardingEl.classList.add("hidden");
        propertyInputEl.value = "";
    }

    modalEl.classList.remove("hidden");
    modalEl.classList.add("flex");
    document.body.classList.add("overflow-hidden");
}

export function closeEnquiryPopup() {
    if (!modalEl) return;
    modalEl.classList.add("hidden");
    modalEl.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
}
