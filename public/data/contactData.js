export const contactData = {
    eyebrow: "Get in touch",
    title: "Let's talk about your next INVESTMENT",
    description: "Buying, selling, or just curious what your place is worth — tell us a bit about it and we'll reply within one business day.",
    details: [
        { label: "Office", value: "----" },
        { label: "Phone", value: "870-0002996" },
        { label: "Email", value: "hello@fosterandvale.com" },
        { label: "Hours", value: "24*7" }
    ],
    form: {
        fields: [
            { id: "name", label: "Full name", type: "text", required: true },
            { id: "email", label: "Email", type: "email", required: true },
            { id: "phone", label: "Phone", type: "tel", required: true }
        ],
        submitLabel: "Send message"
    }
};
