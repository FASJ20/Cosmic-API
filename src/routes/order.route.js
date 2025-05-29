import { Router } from "express";
import { ShowOneOrder, getOrders, getOrderTracking, AddOrders, updateOrderStatus } from "../controllers/order.controller.js";

const router = Router();

router.get("/", getOrders);
router.get("/:id", ShowOneOrder);
router.post("/", AddOrders);
router.put("/:id", updateOrderStatus);
router.get("/:id/tracking", getOrderTracking);

export default router;