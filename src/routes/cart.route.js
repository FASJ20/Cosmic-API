import { Router } from "express";
import { ShowCartItems, AddItem, updateCartItems, deleteCartItems, deleteCart, createCart } from "../controllers/cart.controllers.js";
import { checkSchema } from "express-validator";
import { cartvalschema, itemValSchema } from "../middleware/validation.middleware.js";

const router = Router()

router.get("/:id", ShowCartItems);
router.post("/", checkSchema(cartvalschema),createCart);
router.post("/:id", checkSchema(itemValSchema), AddItem);
router.put("/:id", checkSchema(itemValSchema), updateCartItems);
router.delete("/:id", deleteCartItems);
router.delete("/", deleteCart);

export default router;
