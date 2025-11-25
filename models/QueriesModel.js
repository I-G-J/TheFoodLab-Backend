import mongoose from "mongoose";

const queriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_on", updatedAt: "updated_on" } }
);

export default mongoose.model("Queries", queriesSchema);
