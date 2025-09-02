import { hashPassword, comparePassword } from "../utils/hashpassword.js";
import { User } from "../models/User.model.js";
import { validationResult } from "express-validator";
import { createToken, createrefreshToken} from "../config/jwt.js";
import { RefreshToken } from "../models/RefreshToken.model.js";
import jwt from "jsonwebtoken";
import { refreshsecrete } from "../config/env.config.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendemail.js";
import { base_url } from "../config/env.config.js";
import { Token } from "../models/Token.model.js";

export const registerUser = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const { body } = req;
    let hashedPassword = await hashPassword(body.password);
    console.log(body.password);
    try {
    
         const user = new User({...body, password: hashedPassword});
         await user.save().then(async (user) => {
            const verificationToken = await new Token({ userId: user._id, usertoken: crypto.randomBytes(32).toString("hex") }).save();
            console.log("User created,", user.toJSON());
            const url = `${base_url}api/auth/verifyEmail/${verificationToken.usertoken}`;
            sendEmail(user.email, "Verify your email", `Click the link to verify your email: ${url}`);
            return res.status(201).json(user, { message: "An Email sent to your account please verify" });
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
        if (!user.verified) {
            let uservertoken = await Token.findOne({ userId: user._id });
            if (!uservertoken) {
                uservertoken = await new Token({ userId: user._id, usertoken: crypto.randomBytes(32).toString("hex") }).save();
                const url = `${base_url}api/auth/verifyEmail/${uservertoken.usertoken}`;
                await sendEmail(user.email, "Verify your email", `Click the link to verify your email: ${url}`);
            }
            return res.status(401).json({ message: "Email not verified. Please verify your email to login." });
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
export const verifyEmail = async (req, res) => {
    const { params: { token } } = req;
    try {
        const verificationToken = await Token.findOne({ usertoken: token });
        if (!verificationToken) {
            return res.status(404).json({ message: "Invalid or expired token" });
        }
        await User.updateOne({ _id: verificationToken.userId }, { verified: true });
        await Token.deleteOne({ _id: verificationToken._id });
        res.json({ message: "Email verified successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
}