import mongoose from "mongoose";
import Enquiry from "../models/enquiry.model.js";
import { sendEnquiryEmail } from "./email.service.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;

const buildDuplicateQuery = (email, phone) => {

    const conditions = [];

    if (email && EMAIL_REGEX.test(email)) {
        conditions.push({ email });
    }

    if (phone && PHONE_REGEX.test(phone)) {
        conditions.push({ phone });
    }

    return conditions.length ? { $or: conditions } : null;

};

const checkEnquiryDuplicateService = async ({ email, phone }) => {

    if (mongoose.connection.readyState !== 1) {
        return {
            success: false,
            statusCode: 503,
            message: "Database is not connected. Please check MongoDB Atlas IP Whitelist (0.0.0.0/0) and MONGO_URI in Hostinger."
        };
    }

    const normalizedEmail = email?.trim().toLowerCase() || "";
    const normalizedPhone = phone?.trim() || "";

    if (!normalizedEmail && !normalizedPhone) {

        return {

            success: false,
            statusCode: 400,
            message: "Email or phone is required."

        };

    }

    const query = buildDuplicateQuery(normalizedEmail, normalizedPhone);
    if (!query) {
        return {
            success: true,
            statusCode: 200,
            exists: false,
            message: null
        };
    }

    const existing = await Enquiry.findOne(query);

    return {

        success: true,
        statusCode: 200,
        exists: Boolean(existing),
        message: existing
            ? (existing.phone === normalizedPhone
                ? "An enquiry with this phone number already exists."
                : "An enquiry with this email address already exists.")
            : null

    };

};

const createEnquiryService = async (data) => {

    if (mongoose.connection.readyState !== 1) {
        return {
            success: false,
            statusCode: 503,
            message: "Database is not connected. Please check MongoDB Atlas IP Whitelist (0.0.0.0/0) and MONGO_URI in Hostinger."
        };
    }

    const {

        name,
        phone,
        email

    } = data;

    const normalizedEmail = email?.trim().toLowerCase() || "";
    const normalizedPhone = phone?.trim() || "";

    // Validation

    if (!name?.trim() || !normalizedPhone || !normalizedEmail) {

        return {

            success: false,
            statusCode: 400,
            message: "Name, Phone, and Email are required."

        };

    }

    // Strict 10-digit phone number check
    if (!PHONE_REGEX.test(normalizedPhone)) {

        return {

            success: false,
            statusCode: 400,
            message: "Phone number must be exactly 10 digits."

        };

    }

    // Email format check
    if (!EMAIL_REGEX.test(normalizedEmail)) {

        return {

            success: false,
            statusCode: 400,
            message: "Please enter a valid email address."

        };

    }

    const duplicateQuery = buildDuplicateQuery(normalizedEmail, normalizedPhone);

    if (duplicateQuery) {

        const existing = await Enquiry.findOne(duplicateQuery);

        if (existing) {

            const isPhoneMatch = existing.phone === normalizedPhone;

            return {

                success: false,
                statusCode: 409,
                message: isPhoneMatch
                    ? "An enquiry with this phone number already exists."
                    : "An enquiry with this email address already exists."

            };

        }

    }

    // Create Enquiry

    const enquiry = await Enquiry.create({

        name: name.trim(),
        phone: normalizedPhone,
        email: normalizedEmail

    });

    // Send email notification (fire-and-forget)

    sendEnquiryEmail({

        name: name.trim(),
        phone: normalizedPhone,
        email: normalizedEmail

    }).catch((err) => console.error("Failed to send enquiry email:", err.message));

    return {

        success: true,
        statusCode: 201,
        message: "Enquiry submitted successfully.",
        data: enquiry

    };

};

export {

    createEnquiryService,
    checkEnquiryDuplicateService

};