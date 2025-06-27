import { Router } from "express";

const router = Router();
import { getWishlist, addToWishlist, removeFromWishlist, addwishlist } from "../controllers/wishlist.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

router.use(authenticateToken);

router.get("/:id", getWishlist);
router.post("/:id", addToWishlist);
router.delete("/:id", removeFromWishlist);
router.post("/create", addwishlist);

export default router;
