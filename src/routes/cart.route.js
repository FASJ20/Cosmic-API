import { Router } from "express";
import { ShowCartItems, AddItem, updateCartItems, deleteCartItems, deleteCart, createCart } from "../controllers/cart.controller.js";
import { checkSchema } from "express-validator";
import { cartvalschema, itemValSchema } from "../middleware/validation.middleware.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router()

router.use(authenticateToken);

router.get("/:id", ShowCartItems);
router.post("/", checkSchema(cartvalschema),createCart);
router.post("/:id", checkSchema(itemValSchema), AddItem);
router.put("/:id", checkSchema(itemValSchema), updateCartItems);
router.delete("/:id", deleteCartItems);
router.delete("/", deleteCart);

export default router;
