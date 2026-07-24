const SUBMITTED_KEY = "fv_enquiry_submitted";
const SHOWN_COUNT_KEY = "fv_enquiry_shown_count";

export function hasSubmittedEnquiry() {
    return sessionStorage.getItem(SUBMITTED_KEY) === "true";
}

export function markEnquirySubmitted() {
    sessionStorage.setItem(SUBMITTED_KEY, "true");
}

export function getPopupShownCount() {
    return Number(sessionStorage.getItem(SHOWN_COUNT_KEY) || "0");
}

export function incrementPopupShownCount() {
    sessionStorage.setItem(SHOWN_COUNT_KEY, String(getPopupShownCount() + 1));
}
