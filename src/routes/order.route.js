import { Router } from "express";
import { ShowOneOrder, getOrders, getOrderTracking, AddOrders, updateOrderStatus, payment } from "../controllers/order.controller.js";
import { checkSchema } from "express-validator";
import { orderValSchema } from "../middleware/validation.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getOrders);
router.get("/:id", ShowOneOrder);
router.post("/:id", checkSchema(orderValSchema), AddOrders);
router.put("/:id", authorizeRoles("admin"), updateOrderStatus);
router.get("/:id/tracking", getOrderTracking);
router.get("/payment/:id", authenticateToken, payment)


export default router;