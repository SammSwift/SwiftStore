import { protect, admin } from "../middleware/authMiddle.js";
import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrders,
  getOrderById,
  updateOrderToDeliver,
  updateOrderToPaid,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter
  .route("/")
  .get(protect, admin, getOrders)
  .post(protect, addOrderItems);
orderRouter.get("/myorders", protect, getMyOrders);
orderRouter.get("/:id", protect, getOrderById);
orderRouter.put("/:id/pay", protect, admin, updateOrderToPaid);
orderRouter.put("/:id/deliver", protect, admin, updateOrderToDeliver);

export default orderRouter;
