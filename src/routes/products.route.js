import { Router } from "express";
import { GetOneProduct, addProduct, ShowAllProducts, deleteProduct, updateProduct, GetReviews } from "../controllers/product.controller.js";
import { authenticateRefreshToken, authenticateToken } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.get("/", authenticateToken, ShowAllProducts);
router.get("/:id", authenticateToken, GetOneProduct);
router.post("/", authenticateToken, authorizeRoles("admin"), addProduct);
router.put("/:id", authenticateToken, authorizeRoles("admin"), updateProduct);
router.delete("/:id", authenticateToken, authorizeRoles("admin"), deleteProduct);
router.put("/:id/reviews", authenticateToken, GetReviews);

export default router;