import { Router } from "express";
import { registerUser, loginUser, token, logout } from "../controllers/auth.controller.js";
import { checkSchema } from "express-validator";
import { createUserValidationSchema } from "../middleware/validation.middleware.js";
import { authenticateToken } from "../middleware/auth.middleware.js";


const router = Router()

router.post("/register", checkSchema(createUserValidationSchema), registerUser);
router.post("/login", loginUser);
router.post("/token", token);
router.post("/logout", authenticateToken, logout);


export default router;