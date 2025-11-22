"use client";
import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "antd";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { groupChatAPi, GetGroupById } from "@/app/services/createGroup";
import socket from "@/utils/socket";
import { GroupData, MessagePayload } from "@/app/types";

interface ChatContainerProps {
  groupId: string;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ groupId }) => {
  const [senderId, setSenderId] = useState<string | null>(null);
  const [groupName, setGroupName] = useState<string>("");

  // Load current user
useEffect(() => {
  const userJSON = localStorage.getItem("user");
  if (userJSON) {
    try {
      const userObject = JSON.parse(userJSON);
      // async setState to avoid sync warning
      Promise.resolve().then(() => setSenderId(userObject._id));
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }
}, []);



  // Socket connection
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  // Fetch group details
  useEffect(() => {
    const fetchGroupDetails = async () => {
      if (!groupId) {
        setGroupName("No Group Selected");
        return;
      }

      try {
        const user = localStorage.getItem("user");
        if (!user) return;
        const userId: string = JSON.parse(user)._id;

        const response = await GetGroupById(userId);
        const groupsArray: GroupData[] = response.data || response;

        const currentGroup = groupsArray.find((g) => g._id === groupId);
        setGroupName(currentGroup?.groupName || "Group Not Found");
      } catch (error) {
        console.error("Failed to fetch group details:", error);
        setGroupName("Error Loading Name");
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  // Send message
  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || !senderId) return;

    const payload: MessagePayload = {
      groupId,
      senderId,
      message: messageText,
    };

    socket.emit("groupMessage", payload);

    try {
      await groupChatAPi(payload); // save to DB
    } catch (err) {
      console.log("Message Send Error: ", err);
    }
  };

  return (
    <Row style={{ height: "100vh", background: "#f0f2f5", padding: 10 }}>
      <Col span={24}>
        <Card style={{ borderRadius: 10 }}>
          <strong>{groupName}</strong>
        </Card>
      </Col>

      <Col span={24}>
        <MessageList groupId={groupId} currentUserId={senderId} />
      </Col>

      <Col
        span={24}
        style={{
          position: "fixed",
          bottom: 30,
          left: 275,
          width: "75%",
          background: "#fff",
          padding: 10,
          boxShadow: "0 -2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <MessageInput onSend={handleSendMessage} groupId={groupId} senderId={senderId} />
      </Col>
    </Row>
  );
};

export default ChatContainer;
