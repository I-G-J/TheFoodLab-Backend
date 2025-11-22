import express from "express";
import { loginUser, registerUser, getUserProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
// Note: The getUserProfile route was not in the provided controller, so it's commented out for now.
// You can uncomment it once it's implemented in userController.js
userRouter.get("/profile", authMiddleware, getUserProfile);

export default userRouter;