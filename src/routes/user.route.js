import { Router } from "express";
import { GetAddress, AddNewAddress, updateUserProfile, DeleteAddress, GetUserprofile, UpdateAddress } from "../controllers/user.controller.js";

const router = Router();

router.get("/:id", GetUserprofile);
router.get("/addresses", GetAddress);
router.post("/addresses/:id", AddNewAddress);
router.put("/", updateUserProfile);
router.put("/addresses/:id", UpdateAddress);
router.delete("/addresses/:id", DeleteAddress);

export default router;