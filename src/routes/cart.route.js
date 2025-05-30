import { Router } from "express";
import { ShowCartItems, AddItem, updateCartItems, deleteCartItems, deleteCart, createCart } from "../controllers/cart.controllers.js";

const router = Router()

router.get("/:id", ShowCartItems);
router.post("/", createCart);
router.post("/:id", AddItem);
router.put("/:id", updateCartItems);
router.delete("/:id", deleteCartItems);
router.delete("/", deleteCart);

export default router;
