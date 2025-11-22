import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import foodRouter from "./routes/foodRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
app.use(cors({
  origin: ["http://localhost:5173"], // Your frontend URL
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(express.json());

// Use environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/TheFoodLab";

// API Endpoints
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/order", orderRouter);

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Welcome to TheFoodLab API!" });
});

// Test Route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working fine!" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
