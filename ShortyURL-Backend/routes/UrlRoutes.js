import express from "express";
import authenticateUser from "../middleware/IsUserLogin.js";
import Url from "../models/UrlModel.js";
import { nanoid } from "nanoid";

const router = express.Router();

const generateUnicode = async () => {
  const code = nanoid(8);
  const codeExists = await Url.findOne({ urlUniqueCode: code });
  if (codeExists) {
    return generateUnicode();
  } else {
    return code;
  }
};

router.get("/", authenticateUser, async (request, response) => {
  try {
    const { id } = request.user;
    const urls = await Url.find({ userId: id });

    return response.status(200).json({ urls: urls });
  } catch (error) {
    return response.status(500).json({ message: error });
  }
});

router.post("/", authenticateUser, async (request, response) => {
  try {
    const { id } = request.user;
    const { originalUrl } = request.body;
    if (!originalUrl) {
      return response.status(400).json({ message: "All fields are required." });
    }
    const unicode = await generateUnicode();
    await Url.create({
      userId: id,
      urlUniqueCode: unicode,
      originalURL: originalUrl,
      shortURL: "https://shortyURL.com/" + unicode,
      visited: 0,
    });
    return response
      .status(200)
      .json({ message: "Short Url created successfully." });
  } catch (error) {
    return response.status(500).json({ message: error });
  }
});

router.put("/", authenticateUser, async (request, response) => {
  try {
    const { _id, originalUrl } = request.body;
    if (!originalUrl) {
      return response.status(400).json({ message: "All fields required." });
    }
    const url = await Url.findOne({ _id });

    if (!url) {
      return response.status(404).json({ message: "Url not fouond." });
    }
    url.originalURL = originalUrl;
    url.save();
    return response.status(200).json({ message: "Url Updated successfully." });
  } catch (errro) {
    return response.status(500).json({ message: error });
  }
});
router.delete("/:_id", authenticateUser, async (request, response) => {
  try {
    const { _id } = request.params;
    if (!_id) {
      return response.status(400).json({ message: "Something wrong." });
    }
    const url = await Url.findOne({ _id });
    if (!url) {
      return response.status(400).json({ message: "Data not found." });
    }
    await Url.findByIdAndDelete(_id);
    return response.status(200).json({ message: "Data deleted successfully." });
  } catch (error) {
    return response.status(500).json({ message: error });
  }
});

router.get("/:uniqueCode", async (request, response) => {
  try {
    const { uniqueCode } = request.params;
    if (!uniqueCode) {
      return response.status(404).json({ message: "Not found." });
    }
    const url = await Url.findOne({ urlUniqueCode: uniqueCode });
    if (!url) {
      return response.status(404).json({ message: "Not Found." });
    }
    url.visited += 1;
    url.save();
    return response.redirect(url.originalURL);
  } catch (error) {
    return response.status(500).json({ message: error });
  }
});

export default router;
