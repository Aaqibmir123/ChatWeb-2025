import React from 'react'
import { Row, Col, Card } from 'antd'

const MessageList = () => {
  const messages = [
    { id: 1, text: "Hello!", sender: "me" },
    { id: 2, text: "Hi, how are you?", sender: "other" },
    { id: 3, text: "I'm good!", sender: "me" },
  ];

  return (
    <Row gutter={[0, 10]} style={{ padding: 10 }}>
      {messages.map(msg => (
        <Col
          span={24}
          key={msg.id}
          style={{
            display: "flex",
            justifyContent: msg.sender === "me" ? "flex-end" : "flex-start",
          }}
        >
          <Card
            style={{
              maxWidth: "70%",
              background: msg.sender === "me" ? "#d9fdd3" : "white",
              borderRadius: 10,
            }}
          >
            {msg.text}
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default MessageList
