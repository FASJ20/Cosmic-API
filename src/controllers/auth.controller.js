import { hashPassword, comparePassword } from "../utils/hashpassword.js";
import { User } from "../models/User.model.js";
import { validationResult } from "express-validator";
import { createToken, refreshToken} from "../config/jwt.js";
import { RefreshToken } from "../models/RefreshToken.model.js";

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
    const {
    body: { email, password },
  } = req;
  // const user = new User();
  try {
    // To find user from the user database
    const findUser = await User.findOne({ email });
    
    
    if (!findUser) throw new Error("User not found");

    // Importing the compare password variable to see if the user password matches with the hashed password in the database
    if (!comparePassword(password, findUser.password)) {
      return res.status(404).send("Bad Credentials");
    }
    //creat both access and refresh tokens
    const token = createToken(findUser._id, findUser.role);
    const token2 = refreshToken(findUser._id, findUser.role);
    let StoredRefreshtoken = await RefreshToken.findOne({userId: findUser._id});
    if(!StoredRefreshtoken){
      const NewRefreshToken = new RefreshToken ({
        userId: findUser._id,
        token: token2
      });
      await NewRefreshToken.save()
    } else {
      let new_token = await RefreshToken.findOneAndUpdate({userId: findUser._id},{token: token2},{new: true})
    }
    console.log(token2)
    res.set('Authorization', `Bearer ${token}`);
    res.set('X-Custom-Header', 'CustomHeaderValue');
    return res.status(200).json({
      message: 'Login successful',
      token,
      refreshToken: token2,
      user: findUser,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message || "Login failed" });
  }
};

export const token = async (req, res) => {
    const findUser= req.user.sub
    const token = createToken(findUser._id);
    const token2 = refreshToken(findUser._id);
    let StoredRefreshtoken = await RefreshToken.findOne({userId: findUser._id});
    if(!StoredRefreshtoken){
      const NewRefreshToken = new RefreshToken ({
        userId: findUser._id,
        token: token2
      });
      await NewRefreshToken.save()
    } else {
      let new_token = await RefreshToken.findOneAndUpdate({userId: findUser._id},{token: token2},{new: true})
    }
    return res.json({status: true, message: "success", data: {token, token2}})
}