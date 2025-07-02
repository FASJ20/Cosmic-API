import jwt from "jsonwebtoken";
import { jwtsecret } from "../config/env.config.js"



export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token is required" });
    }
    jwt.verify(token, jwtsecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
};



 