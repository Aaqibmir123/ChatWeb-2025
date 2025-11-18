import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema(
  {
    senderId: { type: String, required: true },
    senderEmail: { type: String, required: true },

    receiverId: { type: String, required: true },
    receiverUsername: { type: String, required: true },

    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("FriendRequest", friendRequestSchema);
