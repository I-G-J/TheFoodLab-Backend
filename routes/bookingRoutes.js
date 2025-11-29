import express from "express";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
  createBooking,
  getBookings,
  deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();
// Public route for users to create a booking
router.post("/", createBooking);
// Admin routes to view and delete bookings
router.get("/", adminMiddleware, getBookings);
router.delete("/:id", adminMiddleware, deleteBooking);

export default router;
