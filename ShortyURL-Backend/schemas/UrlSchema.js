import mongoose from "mongoose";

const UrlSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    urlUniqueCode: { type: String, required: true, unique: true },
    originalURL: { type: String, required: true },
    shortURL: { type: String, required: true },
    visited: { type: Number, required: true },
  },
  { timestamps: true }
);

export default UrlSchema;
