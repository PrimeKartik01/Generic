import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import enquiryRoutes from "./routes/enquiry.routes.js";

const app = express();

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", enquiryRoutes);

app.listen(PORT, () => {

    console.log(`Server Running On Port ${PORT}`);

});