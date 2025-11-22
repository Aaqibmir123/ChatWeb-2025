import groupMessageModel from "../models/groupMessageModel.js";
import Group from "../models/groupModel.js";

export const groupChat = async (req, res) => {
  try {
    const { groupId, senderId, message } = req.body;

    // Validate fields
    if (!groupId || !senderId || !message) {
      return res.status(400).json({
        message: "groupId, senderId and message are required",
      });
    }

    // Check if group exists
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if sender is part of the group
    if (!group.members.includes(senderId)) {
      return res.status(403).json({
        message: "You are not allowed to send a message in this group",
      });
    }

    // Create message in message collection
    const newMessage = await groupMessageModel.create({
      groupId,
      senderId,
      message,
      members: group.members,
    });

    return res.status(200).json({
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const getGroupMessages = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    if (!groupId) {
      return res.status(400).json({ message: "Group id is required" });
    }

    const messages = await groupMessageModel
      .find({ groupId })
      .sort({ createdAt: 1 })
      .populate("senderId", "name");

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
