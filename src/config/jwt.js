import jwt from "jsonwebtoken";
import "dotenv/config"
import { jwtsecret } from "./env.config.js";
import { refreshsecrete } from "./env.config.js";


export const MaxAge= '40m'
export const createToken = (id, role) => {
    return jwt.sign({ id, role }, 
    `${jwtsecret}`, 
    {
    expiresIn: MaxAge,
  });
};
export const refreshToken = (id, role) => {
    return jwt.sign({ id, role }, `${refreshsecrete}`, {
    expiresIn: "7d",
  });
};


