import { Router } from "express";
import { registerUser, loginUser, token } from "../controllers/auth.controller.js";
import { authenticateToken, authenticateRefreshToken } from "../middleware/auth.middleware.js";

const router = Router()

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/token", authenticateRefreshToken, token);


export default router;