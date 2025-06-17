import { Router } from "express";
import { GetAddress, AddNewAddress, updateUserProfile, DeleteAddress, GetUserprofile, UpdateAddress, changePassword } from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.use(authenticateToken);
router.use(authorizeRoles('user'));

router.get("/:id", GetUserprofile);
router.get("/addresses/:id", GetAddress);
router.post("/addresses/:id", AddNewAddress);
router.put("/password/:id", changePassword);
router.put("/:id", updateUserProfile);
router.put("/addresses/:id", UpdateAddress);
router.delete("/addresses/:id", DeleteAddress);

export default router;