import { Router } from "express";
import { ShowCategories, GetProductsByCategory, DeleteProductByCategory } from "../controllers/categories.controller.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.get("/", ShowCategories);
router.get("/:category", GetProductsByCategory);
router.delete("/:category", authorizeRoles("admin"), DeleteProductByCategory);

export default router;
