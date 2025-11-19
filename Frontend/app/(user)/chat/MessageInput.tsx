'use client'
import React, { useState } from 'react'
import { Row, Col, Input, Button } from 'antd'
import { SendOutlined } from '@ant-design/icons'

const MessageInput = () => {
  const [message, setMessage] = useState("");

  return (
    <Row gutter={10}>
      <Col span={20}>
        <Input 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
        >
          Send
        </Button>
      </Col>
    </Row>
  )
}

export default MessageInput
