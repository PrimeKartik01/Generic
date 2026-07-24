export const enquiryPopupData = {
    title: "Don't miss this one.",
    description: "Leave your details and an agent will call you back today.",
    fields: [
        { id: "popupName", name: "name", label: "Full name", type: "text", required: true },
        { id: "popupPhone", name: "phone", label: "Phone", type: "tel", required: true },
        { id: "popupEmail", name: "email", label: "Email", type: "email", required: true }

    ],
    submitLabel: "Request a call back",
    firstShowMs: 10000,
    secondShowMs: 50000
};
