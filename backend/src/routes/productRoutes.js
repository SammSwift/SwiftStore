import express from "express";
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";

import { protect, admin } from "../middleware/authMiddle.js";

const productRouter = express.Router();

productRouter.route("/").get(getProducts).post(protect, admin, createProduct);
productRouter.get("/top", getTopProducts);
productRouter
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
productRouter.route("/:id/reviews").post(protect, createProductReview);

export default productRouter;
