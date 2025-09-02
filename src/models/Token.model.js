import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        unique: true,
    },
    usertoken: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        required: true,
        default: Date.now,
        expires: 3600, // 1 hour
    },
},
)

export const Token = mongoose.model("Token", TokenSchema);
