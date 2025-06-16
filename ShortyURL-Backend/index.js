import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserSchema from "./routes/UserRoutes.js";
import UrlRouter from "./routes/UrlRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// MIDDLEWARE
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "PUT", "DELETE", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// API ROUTES
app.use("/user", UserSchema);
app.use("/url", UrlRouter);

// STATIC FILES (React frontend)
app.use(express.static(path.join(__dirname, "dist")));

// SPA fallback (MUST come after all API routes)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// CONNECT DB and START SERVER
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Connected to DB.");
  app.listen(process.env.PORT || 5050, () => {
    console.log("Backend Started on port : ", process.env.PORT);
  });
});
