import jwt from "jsonwebtoken";
import { jwtsecret, refreshsecrete } from "../config/env.config.js"
import { RefreshToken } from "../models/RefreshToken.model.js";


export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // 1. Try verifying access token
    try {
      const decoded = jwt.verify(token, jwtsecret);
      req.user = decoded;
      console.log("Access token valid:", decoded);
      return next();
    } catch (err) {
      if (err.name !== "TokenExpiredError") {
        return res.status(403).json({ message: "Invalid access token" });
      }
    }

    // 2. If access token expired, try refresh token
    try {
      const decodedRefresh = jwt.verify(token, refreshsecrete);
      req.user = decodedRefresh;
      console.log(" Access expired checking refresh token:", decodedRefresh);

      const storedToken = await RefreshToken.findOne({ userId: decodedRefresh.sub._id, role: decodedRefresh.sub.role || decodedRefresh.sub });
      if (!storedToken || storedToken.token !== token) {
        return res.status(403).json({ message: "Refresh token invalid or not found" });
      }

      // Optionally, you can issue a new access token here automatically and attach it
      // req.newAccessToken = createToken(decodedRefresh.sub, decodedRefresh.role);

      return next();
    } catch (err) {
      return res.status(403).json({ message: "Refresh token expired or invalid" });
    }
  } catch (err) {
    console.error("Token middleware error:", err);
    return res.status(500).json({ message: "Internal auth error" });
  }
};



 