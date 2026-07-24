import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({

    name: {

        type: String,
        required: true,
        trim: true

    },

    phone: {

        type: String,
        required: true

    },

    email: {

        type: String,
        default: ""

    }

}, {

    timestamps: true

});

export default mongoose.model("Enquiry", enquirySchema);