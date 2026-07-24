import {
    createEnquiryService,
    checkEnquiryDuplicateService
} from "../services/enquiry.service.js";

const createEnquiry = async (req, res) => {

    try {

        const result = await createEnquiryService(req.body);

        return res.status(result.statusCode).json(result);

    }

    catch (error) {

        console.error("❌ Controller Error (createEnquiry):", error);

        return res.status(500).json({

            success: false,
            message: error.message || "Internal Server Error"

        });

    }

};

const checkEnquiryDuplicate = async (req, res) => {

    try {

        const result = await checkEnquiryDuplicateService(req.query);

        return res.status(result.statusCode).json(result);

    }

    catch (error) {

        console.error("❌ Controller Error (checkEnquiryDuplicate):", error);

        return res.status(500).json({

            success: false,
            message: error.message || "Internal Server Error"

        });

    }

};

export {

    createEnquiry,
    checkEnquiryDuplicate

};