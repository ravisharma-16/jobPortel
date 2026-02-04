import { ApiError } from "../utils/Api_Error.js";
import jwt from "jsonwebtoken";
import { User } from "../moduls/user.moduls.js";
import  generateTokens  from "../controllers/user.controller.js"; 

const verifyJWT = async (req, res, next) => {
  try {
    let token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return next(new ApiError(401, "Access token is required"));
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      // If token expired, try to refresh it
      if (error.name === "TokenExpiredError") {
        const refreshToken =
          req.cookies?.refreshToken || req.header("x-refresh-token");

        if (!refreshToken) {
          return next(new ApiError(401, "Access token expired. Refresh token required"));
        }

        try {
          const refreshDecoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
          );

          const user = await User.findById(refreshDecoded._id);

          if (!user || user.refreshToken !== refreshToken) {
            return next(new ApiError(401, "Invalid refresh token"));
          }

          // Generate new tokens
          const { accessToken, refreshToken: newRefreshToken } = generateTokens(
            user._id
          );

          // Save new refreshToken
          user.refreshToken = newRefreshToken;
          await user.save();

          // Set cookies for client
          res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
          });
          res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: true,
          });

          // Attach user & move to next middleware
          req.user = user;
          return next();
        } catch (refreshErr) {
          return next(new ApiError(401, "Refresh token expired, login again"));
        }
      }

      // Other JWT errors
      if (error.name === "JsonWebTokenError") {
        return next(new ApiError(401, "Invalid access token"));
      }

      return next(
        new ApiError(
          error.statusCode || 500,
          error.message || "Internal Server Error"
        )
      );
    }

    // Access token still valid
    if (!decoded?._id) {
      return next(new ApiError(401, "Invalid token payload"));
    }

    const user = await User.findById(decoded._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return next(new ApiError(401, "User not found"));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(500, "Something went wrong in verifyJWT"));
  }
};

export default verifyJWT;
