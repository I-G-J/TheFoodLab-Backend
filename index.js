import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";

import userRouter from "./routes/userRoutes.js";
import foodRouter from "./routes/foodRoute.js";
import orderRouter from "./routes/orderRoute.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import QueriesRoutes from "./routes/QueriesRoutes.js";
import trackOrderRoutes from "./routes/trackOrderRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

const app = express();

// Middleware
app.use(express.json());

// CORS CONFIG
app.use(
  cors({
    origin: process.env.VITE_FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    credentials: true,
  })
);

// Allow preflight requests (VERY IMPORTANT)
app.options("*", cors());

// ENV VARIABLES
const PORT = process.env.PORT || 5000;

app.use("/images", express.static("uploads"));

app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/order", orderRouter);
app.use("/api/booking", bookingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/queries", QueriesRoutes);
app.use("/api/trackorder", trackOrderRoutes);
app.use("/api/profile", profileRoutes);

// CONNECT TO DATABASE
connectDB();

// TEST ROUTES
app.get("/", (req, res) => {
  res.json({ message: "Welcome to TheFoodLab API!" });
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working fine!" });
});

// SERVER START
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
