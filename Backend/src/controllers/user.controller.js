import { ApiError } from "../utils/Api_Error.js";
import { ApiResponse } from "../utils/Api_respons.js";
import { User } from "../moduls/user.moduls.js";
import jwt from "jsonwebtoken";
import { upload } from "../middlewears/multer.js";
import {cloudinaryupload} from '../utils/cloudinary.js'

// token create
const generateTokens = (userId) => {
 
  const accessToken = jwt.sign(
    { _id: userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { _id: userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

export default generateTokens;


export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber, role } = req.body;

    // Validation
    if (!fullname || !email || !password || !phoneNumber || !role) {
      throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, "User already exists");
    }

    // Create new user
    const newUser = await User.create({
      fullname,
      email,
      password,
      phoneNumber,
      role,
    });

    // Fetch user without password
    const createdUser = await User.findById(newUser._id).select("-password");
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering");
    }

    // Success Response
    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User registered successfully"));
  } catch (error) {
    console.error(error);

    // Clean error response
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json(
      error instanceof ApiError
        ? error.toJSON()
        : {
            statusCode,
            message: error.message || "Internal Server Error",
            data: null,
            success: false,
            errors: [],
          }
    );
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.ispasswordCorrect(password))) {
      throw new ApiError(401, "Invalid email or password");
    }

    if (user.role.toLowerCase() !== role.toLowerCase()) {
      throw new ApiError(403, "User role is not correct");
    }

    const { accessToken, refreshToken } = generateTokens(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        { user, accessToken, refreshToken },
        "Login successful"
      )
    );

  } catch (error) {
    return res.status(error.statusCode || 500).json({
      statusCode: error.statusCode || 500,
      message: error.message || "Login failed",
      data: null,
      success: false,
    });
  }
};


    export const logoutUser = async (req, res) => {
  try {
    // Optional: Clear refresh token from database
    // if you are storing it in DB
    const userId = req.user?._id;
    if (userId) {
      await User.findByIdAndUpdate(userId, { refreshToken: null });
    }

    // Clear cookies
    return res
      .status(200)
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: true, // set true if using HTTPS
        sameSite: "None",
      })
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: true, // set true if using HTTPS
        sameSite: "None",
      })
      .json(new ApiResponse(200, null, "User Logout Successfully"));
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      statusCode: error.statusCode || 500,
      message: error.message || "Logout failed",
      data: null,
      success: false,
      errors: error.errors || [],
    });
  }
};

export const updateprofile = async (req, res) => {
  try {
    // 🔍 Debug 
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("USER:", req.user);

    const userId = req.user._id; 
    const { fullname, email, phoneNumber, bio, skill } = req.body;

    let skillArray = [];
    if (skill) {
      skillArray = skill.split(",").map((s) => s.trim());
    }
    
    const avaterlocalpath = req.file?.path
    if (!avaterlocalpath) {
        throw new ApiError(400,"Avatar file is missing")
    }
    const avatar = await cloudinaryupload(avaterlocalpath)
    if (!avatar.url) {
        throw new ApiError(400,"uploading cloudinary fail Avatar")
    }
    

  const updatedUser = await User.findByIdAndUpdate(
  userId,
  {
    fullname,
    email,
    phoneNumber,
    "profile.bio": bio,
    "profile.skill": skillArray,
    ...(avatar?.url && { "profile.profilephoto": avatar.url }),
  },
  { new: true }
);

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating profile",
      error: error.message,
    });
  }
};
