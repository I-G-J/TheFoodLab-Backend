import express from "express";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { placeOrder, placeCodOrder, verifyOrder, userOrders, listOrders, updateStatus, removeOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

// User-facing routes
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/place-cod", authMiddleware, placeCodOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);

// Admin-facing routes
orderRouter.get('/list', adminMiddleware, listOrders);
orderRouter.post('/status', adminMiddleware, updateStatus);
orderRouter.post('/remove', adminMiddleware, removeOrder); 

export default orderRouter;