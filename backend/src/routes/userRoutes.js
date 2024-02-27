import {
  authUser,
  registerUser,
  updateUser,
  getUserProfile,
  getUsers,
  deleteUser,
  getUserbyId,
  updateUserProfile,
  logoutUser,
} from "../controllers/userController.js";
import express from "express";
import { protect, admin } from "../middleware/authMiddle.js";

const userRouter = express.Router();

userRouter.post("/login", authUser);
userRouter.post("/logout", logoutUser);
userRouter.route("/register").post(registerUser);
userRouter.get("/", protect, admin, getUsers);
userRouter
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
userRouter
  .route("/:id")
  .get(protect, admin, getUserbyId)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);

export default userRouter;
