import express from "express";

import {
    createEnquiry,
    checkEnquiryDuplicate
} from "../controllers/enquiry.controller.js";

const router = express.Router();

router.get("/enquiry/check", checkEnquiryDuplicate);
router.post("/enquiry", createEnquiry);

export default router;