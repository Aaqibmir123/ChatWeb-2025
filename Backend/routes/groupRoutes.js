import express from "express";
import { createGroup ,getGroupById} from "../controllers/groupController.js";
import { groupChat ,getGroupMessages} from "../controllers/groupChatConytroller.js";
const router = express.Router();

router.post("/create-group", createGroup);
router.get("/group/:id", getGroupById);
router.post('/group-chat', groupChat);
router.get('/group-messages/:groupId', getGroupMessages);

export default router;
