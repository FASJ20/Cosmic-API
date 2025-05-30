import { Router } from "express";
import { GetAddress, AddNewAddress, updateUserProfile, DeleteAddress, GetUserprofile, UpdateAddress, changePassword } from "../controllers/user.controller.js";
import { authenticateToken, authenticateRefreshToken } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.get("/:id", authenticateToken, authorizeRoles("user"), GetUserprofile);
router.get("/addresses/:id", authenticateToken, authorizeRoles("user"), GetAddress);
router.post("/addresses/:id", authenticateToken, authorizeRoles("user"), AddNewAddress);
router.put("/password/:id", authenticateToken, authorizeRoles("user"), changePassword);
router.put("/:id", authenticateToken, authorizeRoles("user"), updateUserProfile);
router.put("/addresses/:id", authenticateToken, authorizeRoles("user"), UpdateAddress);
router.delete("/addresses/:id", authenticateToken, authorizeRoles("user"), DeleteAddress);

export default router;