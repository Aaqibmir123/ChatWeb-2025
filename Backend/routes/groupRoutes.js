import express from "express";
import { createGroup, getGroupById } from "../controllers/groupController.js";

const router = express.Router();

router.post("/create-group", createGroup);
router.get("/group/:id", getGroupById);

export default router;
