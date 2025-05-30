import { Router } from "express";
import { registerUser, loginUser, token } from "../controllers/auth.controller.js";
import { checkSchema } from "express-validator";
import { createUserValidationSchema } from "../middleware/validation.middleware.js";
import { authenticateToken, authenticateRefreshToken } from "../middleware/auth.middleware.js";

const router = Router()

router.post("/register", checkSchema(createUserValidationSchema), registerUser);
router.post("/login", loginUser);
router.post("/token", authenticateRefreshToken, token);


export default router;