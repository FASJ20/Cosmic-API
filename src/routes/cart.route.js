import { Router } from "express";
import { ShowCartItems, ShowOneItem, AddCartItems, updateCartItems, deleteCartItems, deleteCart } from "../controllers/cart.controllers.js";

const router = Router()

router.get("/", ShowCartItems);
router.get("/:id", ShowOneItem);
router.post("/", AddCartItems);
router.put("/:id", updateCartItems);
router.delete("/:id", deleteCartItems);
router.delete("/", deleteCart);

export default router;
