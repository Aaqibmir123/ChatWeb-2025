"use client";
import React, { useEffect, useState } from "react";
import { getFriendRequests } from "@/app/services/addFriend";
import { Row, Col, Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import AcceptRequest from "./AcceptRequest";
import CancelRequest from "./CancelRequest";

const Request = () => {
  const userId = localStorage.getItem("user");
  const recievedId = userId ? JSON.parse(userId)._id : null;
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      if (!recievedId) return;

      try {
        const res = await getFriendRequests(recievedId);
        setRequests(res.requests);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };
    fetchFriendRequests();
  }, [recievedId]);


  return (
    <div style={{ maxWidth: "600px", margin: "auto", marginTop: "20px" }}>
      <h2>Friend Requests</h2>

      {requests.length === 0 && <p>No Friend Requests Found</p>}

      {requests.map((req) => (
        <Card
          key={req.senderId}
          style={{ marginBottom: "15px", borderRadius: 10 }}
        >
          <Row align="middle">
            {/* Avatar */}
            <Col span={4}>
              <Avatar
                size={60}
                src={req.senderImage ? req.senderImage : null}
                icon={!req.senderImage && <UserOutlined />}
              />
            </Col>

            {/* Sender Name */}
            <Col span={12}>
              <h3 style={{ margin: 0 }}>{req.senderName}</h3>
              <p style={{ margin: 0, color: "gray" }}>
                sent you a friend request
              </p>
            </Col>

            <Col span={4} style={{ textAlign: "center" }}>
              <AcceptRequest requestId={req._id} /> 
            </Col>

            <Col span={4} style={{ textAlign: "center" }}>
              <CancelRequest requestId={req.senderId} />
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default Request;
