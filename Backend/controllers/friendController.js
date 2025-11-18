import FriendRequest from "../models/friendRequestModel.js";


// =============================
// 1️⃣ Send Friend Request
// =============================
export const sendFriendRequest = async (req, res) => {
  try {
    const { senderId, senderEmail, receiverId, receiverUsername } = req.body;
      console.log(req.body,'freind request body');
    if (!senderId || !receiverId) {
      return res.status(400).json({ message: "Sender & Receiver required" });
    }

    // Check duplicate
    const existing = await FriendRequest.findOne({
      senderId,
      receiverId,
      status: "pending",
    });

    if (existing) {
      return res.status(400).json({ message: "Request already sent" });
    }

    const request = await FriendRequest.create({
      senderId,
      senderEmail,
      receiverId,
      receiverUsername,
    });

    res.status(201).json({
      message: "Friend request sent",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error sending friend request",
      error: error.message,
    });
  }
};


// =============================
// 2️⃣ Get Friend Requests (Receiver)
// =============================
export const getFriendRequests = async (req, res) => {
  try {
    const { receiverId } = req.params;

    const requests = await FriendRequest.find({
      receiverId,
      status: "pending",
    });

    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching friend requests",
      error: error.message,
    });
  }
};


// =============================
// 3️⃣ Accept Friend Request
// =============================
export const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await FriendRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "accepted";
    await request.save();

    res.status(200).json({
      message: "Friend request accepted",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error accepting request",
      error: error.message,
    });
  }
};


// =============================
// 4️⃣ Decline Friend Request
// =============================
export const declineFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await FriendRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "declined";
    await request.save();

    res.status(200).json({
      message: "Friend request declined",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error declining request",
      error: error.message,
    });
  }
};


// =============================
// 5️⃣ Get Friends List
// =============================
export const getFriendsList = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all accepted
    const friends = await FriendRequest.find({
      $or: [
        { senderId: userId, status: "accepted" },
        { receiverId: userId, status: "accepted" },
      ],
    });

    res.status(200).json({ friends });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching friends list",
      error: error.message,
    });
  }
};
