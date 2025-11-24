import mongoose from "mongoose";

const TrackOrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true },
    items: [
      {
        name: String,
        quantity: Number,
      },
    ],
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Placed", "Food Processing", "Out for delivery", "Delivered"],
      default: "Placed",
    },
  },
  { timestamps: true }
);

const TrackOrderModel = mongoose.model("TrackOrder", TrackOrderSchema);
export default TrackOrderModel;
