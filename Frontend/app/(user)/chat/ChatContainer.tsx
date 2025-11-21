"use client";
import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "antd";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { groupChatAPi } from "@/app/services/createGroup";
import { GetGroupById } from '@/app/services/createGroup';


const ChatContainer = ({ groupId }) => {
    const [senderId, setSenderId] = useState(null);
    const [groupName, setGroupName] = useState('');

    useEffect(() => {
        const userJSON = localStorage.getItem("user");

        if (userJSON) {
            try {
                const userObject = JSON.parse(userJSON);
                setSenderId(userObject._id);
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        } else {
            console.error("Authentication Error: User data is missing.");
        }
    }, []);

    useEffect(() => {
        const fetchGroupDetails = async () => {
            if (!groupId) {
                setGroupName('No Group Selected');
                return;
            }

            try {
                const user = localStorage.getItem("user");
                if (!user) return;
                const userId = JSON.parse(user)._id;
                const response = await GetGroupById(userId);
                const groupsArray = response.data || response;

                const currentGroup = groupsArray.find(
                    (group) => group._id === groupId
                );
                
                if (currentGroup) {
                    setGroupName(currentGroup.groupName);
                } else {
                    setGroupName('Group Not Found');
                }
                
            } catch (error) {
                console.error("Failed to fetch group details:", error);
                setGroupName('Error Loading Name');
            }
        };
        fetchGroupDetails();
    }, [groupId]);

    const handleSendMessage = async (messageText) => {
        if (!messageText.trim() || !senderId) {
            return;
        }

        const messagePayload = {
            groupId: groupId,
            senderId: senderId,
            message: messageText,
        };

        try {
            await groupChatAPi(messagePayload);
        } catch (error) {
            console.error("Failed to send message:", error);
            alert("Failed to send message. Please try again.");
        }
    };

    if (!senderId) {
        return (
            <Row style={{ height: "100vh", background: "#f0f2f5", padding: 10 }}>
                <Col span={24}>
                    <Card style={{ borderRadius: 10 }}>
                        <strong>Loading User Data...</strong>
                    </Card>
                </Col>
            </Row>
        );
    }

    return (
        <Row style={{ height: "100vh", background: "#f0f2f5", padding: 10 }}>
            <Col span={24}>
                <Card style={{ borderRadius: 10 }}>
                    <strong>{groupName || `Loading: ${groupId}`}</strong>
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
                <MessageInput onSend={handleSendMessage} />
            </Col>
        </Row>
    );
};

export default ChatContainer;