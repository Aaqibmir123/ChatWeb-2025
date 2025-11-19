'use client'
import React from 'react'
import { Row, Col, Card } from 'antd'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

const ChatContainer = ({ groupId }) => {
  return (
    <Row style={{ height: "100vh", background: "#f0f2f5", padding: 10 }}>

      {/* Header */}
      <Col span={24}>
        <Card style={{ borderRadius: 10 }}>
          <strong>Group ID: {groupId}</strong>
        </Card>
      </Col>

      {/* Message List */}
      <Col span={24} style={{ 
        flex: 1, 
        overflowY: "auto", 
        marginTop: 10,
        marginBottom: 70   // bottom input ki jagah
      }}>
        <MessageList />
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
          boxShadow: "0 -2px 6px rgba(0,0,0,0.1)"
        }}
      >
        <MessageInput />
      </Col>

    </Row>
  )
}

export default ChatContainer
