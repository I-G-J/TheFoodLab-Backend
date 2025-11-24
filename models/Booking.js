import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  numPersons: Number,
  phoneNo: String,
  date: String,
  timeSlot: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("TableBooking", bookingSchema);
