const DUPLICATE_MESSAGE = "An enquiry with this email or phone number already exists.";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;

export function validateEnquiryFields(form, statusEl) {

    const emailInput = form.querySelector('[name="email"]');
    const phoneInput = form.querySelector('[name="phone"]');

    if (phoneInput) {

        const phone = phoneInput.value.trim();

        if (!phone) {
            showError(statusEl, "Phone number is required.");
            phoneInput.focus();
            return false;
        }

        if (!PHONE_REGEX.test(phone)) {
            showError(statusEl, "Phone number must be exactly 10 digits.");
            phoneInput.focus();
            return false;
        }

    }

    if (emailInput) {

        const email = emailInput.value.trim();

        if (!email) {
            showError(statusEl, "Email address is required.");
            emailInput.focus();
            return false;
        }

        if (!EMAIL_REGEX.test(email)) {
            showError(statusEl, "Please enter a valid email address.");
            emailInput.focus();
            return false;
        }

    }

    return true;

}

function showError(statusEl, message) {

    if (!statusEl) return;

    statusEl.textContent = message;
    statusEl.classList.remove("hidden");
    statusEl.classList.add("text-red-600");

}

export function attachEnquiryDuplicateGuard(form, statusEl) {

    const emailInput = form.querySelector('[name="email"]');
    const phoneInput = form.querySelector('[name="phone"]');

    if (!emailInput || !phoneInput || !statusEl) return;

    let debounceTimer = null;
    let isDuplicate = false;
    let customDuplicateMsg = DUPLICATE_MESSAGE;

    // Enforce digit-only input and 10 digits max on phone input
    phoneInput.setAttribute("maxlength", "10");
    phoneInput.setAttribute("inputmode", "numeric");
    phoneInput.setAttribute("pattern", "[0-9]{10}");
    phoneInput.setAttribute("placeholder", "10-digit phone number");

    emailInput.setAttribute("placeholder", "example@mail.com");

    phoneInput.addEventListener("input", () => {
        let val = phoneInput.value.replace(/\D/g, "");
        if (val.length > 10 && val.startsWith("91")) {
            val = val.slice(2);
        } else if (val.length > 10 && val.startsWith("0")) {
            val = val.slice(1);
        }
        phoneInput.value = val.slice(0, 10);
    });

    const clearDuplicateState = () => {

        isDuplicate = false;
        if (statusEl.textContent.includes("already exists") || statusEl.textContent.includes("registered")) {
            statusEl.textContent = "";
            statusEl.classList.add("hidden");
            statusEl.classList.remove("text-red-600");
        }

    };

    const showDuplicateState = (msg) => {

        isDuplicate = true;
        customDuplicateMsg = msg || DUPLICATE_MESSAGE;
        statusEl.textContent = customDuplicateMsg;
        statusEl.classList.remove("hidden");
        statusEl.classList.add("text-red-600");

    };

    const checkDuplicate = async () => {

        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();

        const hasValidPhone = PHONE_REGEX.test(phone);
        const hasValidEmail = EMAIL_REGEX.test(email);

        if (!hasValidPhone && !hasValidEmail) {
            clearDuplicateState();
            return;
        }

        try {

            const params = new URLSearchParams();
            if (hasValidPhone) params.append("phone", phone);
            if (hasValidEmail) params.append("email", email);

            const response = await fetch(`/api/enquiry/check?${params}`);
            const result = await response.json();

            if (!response.ok) {
                clearDuplicateState();
                return;
            }

            if (result.exists) {
                showDuplicateState(result.message);
                return;
            }

            clearDuplicateState();

        } catch (error) {

            console.error(error);

        }

    };

    const scheduleCheck = () => {

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(checkDuplicate, 300);

    };

    emailInput.addEventListener("input", scheduleCheck);
    phoneInput.addEventListener("input", scheduleCheck);

    form.addEventListener("submit", (event) => {

        if (isDuplicate) {
            event.preventDefault();
            showDuplicateState(customDuplicateMsg);
        }

    });

    return {

        isDuplicate: () => isDuplicate

    };

}
