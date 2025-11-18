import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
  groupDescription: {
    type: String,
    default: "",
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
}, { timestamps: true });

export default mongoose.model("Group", groupSchema);
