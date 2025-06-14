import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserSchema from "./routes/UserRoutes.js";
import UrlRouter from "./routes/UrlRoutes.js";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.31.166:5173/"],
    methods: ["POST", "PUT", "DELETE", "GET"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/user", UserSchema);
app.use("/url", UrlRouter);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Connected to DB.");
  app.listen(process.env.PORT || 5050, () => {
    console.log("Backend Started on port : ", process.env.PORT);
  });
});
