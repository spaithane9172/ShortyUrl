import express from "express";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticateUser from "../middleware/IsUserLogin.js";

const router = express.Router();

const createAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

router.get("/logout", authenticateUser, (request, response) => {
  try {
    response.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    response.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return response.status(200).json({ message: "User Logout Successfully." });
  } catch (error) {
    return response.status(500).json({ message: "Internal Server Error." });
  }
});

router.get("/", authenticateUser, async (request, response) => {
  try {
    const { id } = request.user;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return response.status(401).json({ message: "Unautherized User." });
    }
    return response.status(200).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    return response.status(500).json({ message: error });
  }
});

router.put("/updateUser", authenticateUser, async (request, response) => {
  try {
    const { id } = request.user;
    const { firstName, lastName } = request.body;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return response.status(400).json({ message: "User not found." });
    }
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();
    return response.status(200).json({
      message: "User Updated Successsfully.",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    return response.status(500).json({ message: error });
  }
});

router.post("/signup", async (request, response) => {
  try {
    const { firstName, lastName, email, password } = request.body;
    if (!firstName || !lastName || !email || !password) {
      return response.status(400).json({ message: "All Fields Required." });
    }
    const existingOne = await User.findOne({ email });
    if (existingOne) {
      return response.status(400).json({ message: "User Already exists" });
    }
    const passwordWithPaper = password + process.env.PAPER;
    const passwordHash = await bcrypt.hash(passwordWithPaper, 10);
    console.log(passwordHash);
    await User.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    return response.status(200).json({ message: "Account Created." });
  } catch (error) {
    return response.status(500).json({ message: error });
  }
});

router.post("/refreshToken", async (request, response) => {
  try {
    const { refreshToken } = request.cookies;
    if (!refreshToken) {
      return response.status(401).json({ message: "Authentication Faild." });
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (error, user) => {
      if (error) {
        return response
          .status(401)
          .json({ message: "Authentication Faild..." });
      }
      const accessToken = createAccessToken(user.id);
      response.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 15,
      });
      return response.status(200).json({ message: "Token Refreshed." });
    });
  } catch (error) {
    return response.status(500).json({ message: error });
  }
});

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(400).json({ message: "All fields required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(400).json({ message: "Invalid Credentials." });
    }
    const passwordWithPaper = password + process.env.PAPER;
    const isPasswordValid = await bcrypt.compare(
      passwordWithPaper,
      user.password
    );

    if (!isPasswordValid) {
      return response.status(400).json({ message: "Invalid Credentials." });
    }

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    response.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 15,
    });
    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return response.status(200).json({ message: "Login SUccessful." });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: error });
  }
});
export default router;
