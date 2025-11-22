"use client";
import React, { useState, useRef } from "react";
import { Row, Col, Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import socket from "@/utils/socket";
import { MessageInputProps } from "@/app/types";

const MessageInput: React.FC<MessageInputProps> = ({ onSend, groupId, senderId }) => {
  const [message, setMessage] = useState("");
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const emitTyping = (isTyping: boolean) => {
    if (!groupId || !senderId) return;
    const eventName = isTyping ? "typingStart" : "typingStop";
    socket.emit(eventName, { groupId, senderId });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    emitTyping(true);

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      emitTyping(false);
    }, 1500);
  };

  const handleSendClick = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    onSend(trimmedMessage);
    setMessage("");
    emitTyping(false);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendClick();
  };

  return (
    <Row gutter={10}>
      <Col span={20}>
        <Input
          value={message}
          onChange={handleInputChange}
          onPressEnter={handleKeyPress}
          placeholder="Type a message..."
          size="large"
        />
      </Col>
      <Col span={4}>
        <Button
          type="primary"
          icon={<SendOutlined />}
          size="large"
          block
          onClick={handleSendClick}
          disabled={!message.trim()}
        >
          Send
        </Button>
      </Col>
    </Row>
  );
};

export default MessageInput;
