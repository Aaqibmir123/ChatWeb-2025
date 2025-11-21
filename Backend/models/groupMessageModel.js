import mongoose from "mongoose";

const groupMessageSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  message: {
    type: String,
    required: true
  },
  // 👈 'members' field yahan se remove kar diya gaya hai
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("GroupMessage", groupMessageSchema);