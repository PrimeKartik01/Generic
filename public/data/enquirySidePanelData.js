export const enquirySidePanelData = {
    title: "Request a private viewing",
    description: "Tell us how to reach you — an agent will follow up within one business day.",
    fields: [
        { id: "sidePanelName", name: "name", label: "Full name", type: "text", required: true },
        { id: "sidePanelPhone", name: "phone", label: "Phone", type: "tel", required: true },
        { id: "sidePanelEmail", name: "email", label: "Email", type: "email", required: true }

    ],
    submitLabel: "Request viewing",
};
