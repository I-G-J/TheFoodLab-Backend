import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
    phoneNo: String,
  },
  { timestamps: { createdAt: "created_on", updatedAt: "updated_on" } }
);

export default mongoose.model("ContactMessage", contactSchema);
