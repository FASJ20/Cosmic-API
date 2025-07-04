import { Router } from "express";
import { GetOneProduct, addProduct, ShowProducts, deleteProduct, updateProduct, GetReviews } from "../controllers/product.controller.js";
import { checkSchema } from "express-validator";
import { createProductValidationScheme, ratingsValSchema } from "../middleware/validation.middleware.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.get("/", ShowProducts);
router.get("/:id",authenticateToken, GetOneProduct);
router.post("/", authenticateToken, authorizeRoles("admin"), checkSchema(createProductValidationScheme), addProduct);

router.put("/:id", authenticateToken, authorizeRoles("admin"), checkSchema(createProductValidationScheme), updateProduct);
router.delete("/:id", authenticateToken, authorizeRoles("admin"), deleteProduct);
router.put("/:id/reviews", authenticateToken, checkSchema(ratingsValSchema), GetReviews);

export default router;