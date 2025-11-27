import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    name: String,
    email: String,
    mobile: String,
    address: String,
    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: "created_on", updatedAt: "updated_on" } }
);

export default mongoose.model("Profile", profileSchema);
