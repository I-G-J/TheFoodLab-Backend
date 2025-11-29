import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    role: { type: String, default: "user" },
  },
  { minimize: false },
  { timestamps: { createdAt: "created_on", updatedAt: "updated_on" } }
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;
