import mongoose from "mongoose";
import UrlSchema from "../schemas/UrlSchema.js";

const UrlModel = mongoose.model("Url", UrlSchema);

export default UrlModel;
