import jwt from "jsonwebtoken";
import { jwtsecret, refreshsecrete } from "../config/env.config.js"
import { RefreshToken } from "../models/RefreshToken.model.js";


export const authenticateToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if(!token) {
      return res.status(401).json({message: "No token, login first"});
    }

    try{
      const decode = jwt.verify(token, `${jwtsecret}`);
      req.user = decode;
      console.log("decoded user is :", req.user);
      next()
    } catch (err){
      res.status(400).json({message: "Not valid"});
    }
  } else {
    return res.status(401).json({message: "No token, authorization denied"});
  }
};

export const authenticateRefreshToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if(!token) {
      return res.status(401).json({message: "No token, login first"});
    }

    try{
      const decode = jwt.verify(token, `${refreshsecrete}`);
      req.user = decode;
      console.log("decoded user is :", req.user);

      let StoredRefreshtoken = await RefreshToken.findone({data: decode.sub});
      if (!StoredRefreshtoken) return res.status(401).json({status: false, message: "invalid request. token not found"});
      if (StoredRefreshtoken.token != token) return res.status(401).json({status: false, message: "invalid request. token not the same"})
      next()
    } catch (err){
      res.status(400).json({message: "Not valid"});
    }
  } else {
    return res.status(401).json({message: "No token, authorization denied"});
  }
};

 