import { Router } from "express";
import { ShowOneOrder, getOrders, getOrderTracking, AddOrders, updateOrderStatus } from "../controllers/order.controller.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.get("/", getOrders);
router.get("/:id", ShowOneOrder);
router.post("/", AddOrders);
router.put("/:id", authorizeRoles("admin"), updateOrderStatus);
router.get("/:id/tracking", getOrderTracking);

export default router;