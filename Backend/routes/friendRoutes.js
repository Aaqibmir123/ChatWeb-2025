import express from "express";
import {
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  declineFriendRequest,
  getFriendsList,
} from "../controllers/friendController.js";

const router = express.Router();

// Send Request
router.post("/send-friend-request", sendFriendRequest);

// Get Requests of receiver
router.get("/get-friend-requests/:receiverId", getFriendRequests);

// Accept friend request
router.post("/accept-friend-request", acceptFriendRequest);

// Decline
router.post("/decline-friend-request/:requestId", declineFriendRequest);

// Friends List
router.post("/accept-friend-requests/:userId", getFriendsList);

export default router;
