"use client";
import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Card, Spin } from "antd";
import { getGroupChat } from "@/app/services/createGroup";
import socket from "@/utils/socket";

const MessageList = ({ groupId, currentUserId }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const res = await getGroupChat(groupId);
        setMessages(res.data || res);
      } catch (e) {
        setMessages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();

    socket.emit("joinGroup", groupId);

    const handleNewMessage = (newMsg) => {
      if (newMsg.groupId === groupId) {
        setMessages((prev) => [...prev, newMsg]);
      }
    };

    socket.on("newGroupMessage", handleNewMessage);

    return () => {
      socket.off("newGroupMessage", handleNewMessage);
      socket.emit("leaveGroup", groupId);
    };
  }, [groupId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isLoading)
    return (
      <div style={{ textAlign: "center", padding: 20 }}>
        <Spin tip="Loading messages..." />
      </div>
    );

  return (
    <Row style={{ height: "80vh", overflowY: "auto", padding: 10 }}>
      {messages.map((msg, i) => (
        <Col
          key={msg._id || i}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: msg.senderId === currentUserId ? "flex-end" : "flex-start",
          }}
        >
          <Card
            style={{
              borderRadius: 10,
              background: msg.senderId === currentUserId ? "#d9fdd3" : "#f0f0f0",
              maxWidth: "65%",
            }}
          >
            <p style={{ margin: 0 }}>{msg.message}</p>
            <small style={{ color: "#777" }}>
              {new Date(msg.createdAt).toLocaleTimeString()}
            </small>
          </Card>
        </Col>
      ))}

      <div ref={bottomRef} />
    </Row>
  );
};

export default MessageList;
