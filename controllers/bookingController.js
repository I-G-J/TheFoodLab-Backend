import Booking from "../models/Booking.js";

// ==================== CREATE BOOKING ====================
export const createBooking = async (req, res) => {
  try {
    const { name, phoneNo, numPersons, date, timeSlot } = req.body;

    if (!name || !phoneNo || !numPersons || !date || !timeSlot) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const booking = await Booking.create({
      name,
      phoneNo,
      numPersons,
      date,
      timeSlot,
    });

    res.status(201).json({ message: "Booking saved!", data: booking });
  } catch (err) {
    console.error("Error saving booking:", err);
    res.status(500).json({ error: "Server error while saving booking" });
  }
};

// ==================== GET ALL BOOKINGS ====================
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ error: "Server error while fetching bookings" });
  }
};

//Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Booking.findByIdAndDelete(id);

    if (!deleted) {
      return res.json({ success: false, message: "Booking not found" });
    }

    res.json({ success: true, message: "Booking deleted" });
  } catch (error) {
    console.log("Booking delete error:", error);
    res.json({ success: false, message: "Server error" });
  }
};
