'use client';
import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { GetGroupById } from '@/app/services/createGroup';
import { useRouter } from "next/navigation";

const GroupHistory = () => {

  const [groupHistory, setGroupHistory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchGroupHistory = async () => {
      try {
        const user = localStorage.getItem("user");
        if (!user) return;
        const userId = JSON.parse(user)._id;
        const response = await GetGroupById(userId);
        setGroupHistory(response);
      } catch (error) {
        console.error("Failed to fetch group history:", error);
      }
    };
    fetchGroupHistory();
  }, []);

  const handleGroupClick = (group) => {
  router.push(`/chat/${group._id}`);
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Group History</h2>

      {groupHistory.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>No groups found.</p>
      ) : (
        <Row gutter={[16, 16]}>
          {groupHistory.map(group => (
            <Col span={24} key={group._id}>
              <Card 
                hoverable
                style={{ borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                onClick={() => handleGroupClick(group)}
              >
                <strong>{group.groupName}</strong>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default GroupHistory;
