import groupModel from "../models/groupModel.js";

export const createGroup = async (req, res) => {
  try {
    const { admin, groupName, groupDescription, members } = req.body;

    if (!admin || !groupName) {
      return res.status(400).json({ message: "Admin & Group Name required" });
    }

    const newGroup = await groupModel.create({
      admin,
      groupName,
      groupDescription: groupDescription || "",
      members: members || [],
    });

    return res.status(201).json({
      message: "Group created successfully",
      group: newGroup,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating group",
      error: error.message,
    });
  }
};

export const getGroupById = async (req, res) => {
  try {
    const { id } = req.params;

    const group = await groupModel.find({
      $or: [
        { admin: id }, // Check if user (id) is the admin
        { members: id }, // Check if user (id) is in the members list
      ],
    });

    if (!group || group.length === 0) {
      return res.status(404).json({ message: "Group not found" });
    }

    return res.status(200).json(group);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching group",
      error: error.message,
    });
  }
};
