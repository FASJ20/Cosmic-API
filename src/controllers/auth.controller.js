import { hashPassword, comparePassword } from "../utils/hashpassword.js";
import { User } from "../models/User.model.js";
import { validationResult } from "express-validator";
import { createToken, createrefreshToken} from "../config/jwt.js";
import { RefreshToken } from "../models/RefreshToken.model.js";
import jwt from "jsonwebtoken";
import { refreshsecrete } from "../config/env.config.js";

export const registerUser = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const { body } = req;
    let hashedPassword = await hashPassword(body.password);
    console.log(body.password);
    try {
    
         const user = new User({...body, password: hashedPassword})
         await user.save().then((user) => {
            console.log("User created,", user.toJSON());
            return res.status(201).json(user)
        }).catch((err) => {
            console.error("Error creating user:", err);
            return res
            .status(500)
            .json({ message: "Error creating user", error: err.message });
        })
    } catch (err) {
        console.error("error", err);
        res.sendStatus(400);
    }
};
export const loginUser = async (req, res) => {
    const { body: {email, password} } = req;
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = createToken(user._id, user.role);
        const refreshToken = createrefreshToken(user._id, user.role);
        // Save the refresh token in the database
        const newRefreshToken = new RefreshToken({ 
            userId: user._id,
            token: refreshToken,
            role: user.role });
        await newRefreshToken.save();
        res.json({ user: {  email: user.email }, token, refreshToken });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

export const token = async (req, res) => {
  const { body: { token } } = req;
    try {
        const findToken = await RefreshToken.findOne({ token: token });
        if (token === undefined || token === null) {
            return res.status(401).json({ message: "Refresh token is required" });
        }
        if (!findToken) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        jwt.verify(token, refreshsecrete, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid refresh token" });
            }
            const newToken = createToken(decoded.id);
            res.json({ token: newToken });
        });

    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};
export const logout = async (req, res) => {
  const { body: { token } } = req;
    try {
        if (!token) {
            return res.status(401).json({ message: "Refresh token is required" });
        }
        await RefreshToken.deleteOne({ refreshtoken: token });
        res.json({ message: "Logged out successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};