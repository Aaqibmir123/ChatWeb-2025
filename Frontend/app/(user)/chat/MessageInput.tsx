'use client'
import React, { useState } from 'react'
import { Row, Col, Input, Button } from 'antd'
import { SendOutlined } from '@ant-design/icons'

const MessageInput = ({ onSend }) => { 
    const [message, setMessage] = useState("");

    const handleSendClick = () => {
        const trimmedMessage = message.trim();
        if (!trimmedMessage) return; 

        if (onSend) {
            onSend(trimmedMessage); 
            setMessage(""); 
        }
    };
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendClick();
        }
    };

    return (
        <Row gutter={10}>
            <Col span={20}>
                <Input 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
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
    )
}

export default MessageInput