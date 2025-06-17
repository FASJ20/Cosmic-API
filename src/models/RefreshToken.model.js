// models/RefreshToken.js
import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
    },
    role: {
      type: mongoose.Schema.Types.String,
      enum: ['user', 'admin'],
      default: 'user'
    },
  token: { 
    type: String, 
    required: true 
    },
});

export const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
