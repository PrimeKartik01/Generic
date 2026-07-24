import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connection.on("connected", () => {
    console.log("✅ Mongoose connected to MongoDB Atlas");
});

mongoose.connection.on("error", (err) => {
    console.error("❌ Mongoose connection error:", err.message);
});

mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ Mongoose disconnected from MongoDB");
});

const connectDB = async () => {

    try {

        if (!process.env.MONGO_URI || process.env.MONGO_URI.includes("<db_password>")) {
            console.warn("⚠️ WARNING: MONGO_URI is missing or contains placeholder '<db_password>'. Please set your actual database password in Hostinger environment variables.");
            return;
        }

        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });

        console.log("✅ MongoDB Connected Successfully");

    } catch (error) {

        console.error("Full Error:", error);

    }

};

export default connectDB;