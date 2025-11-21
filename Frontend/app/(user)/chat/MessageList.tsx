import React, { useState } from 'react'; 
import { Row, Col, Card, Spin } from 'antd'; 
import { getGroupChat } from '@/app/services/createGroup';
import { GetGroupById } from '@/app/services/createGroup';


const MessageList = ({ groupId, currentUserId }) => { 

    // 1. Create state to hold the messages
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [groupName,setGroupName] = useState('');


    React.useEffect(() => {
        const showGroupChat = async () => {
            if (!groupId) {
                setIsLoading(false);
                return;
            }
            try {
                setIsLoading(true);
                const response = await getGroupChat(groupId);
                setMessages(response.data || response); 
                
            } catch (error) {
                console.error("Error fetching group chat:", error);
                // Optionally handle error state
                setMessages([]);
            } finally {
                setIsLoading(false);
            }
        };
        showGroupChat();
    }, [groupId]);
    
    

    if (isLoading) {
        return (
            <div style={{ padding: 20, textAlign: 'center' }}>
                <Spin tip="Loading Messages..." />
            </div>
        );
    }
    
    if (messages.length === 0) {
        return (
            <div style={{ padding: 20, textAlign: 'center' }}>
                <p>Start a new conversation!</p>
            </div>
        );
    }

    return (
        <Row gutter={[0, 10]} style={{ padding: 10 }}>
            {/* 3. Map over the state variable 'messages' */}
            {messages.map(msg => (
                <Col
                    span={24}
                    // Use the MongoDB _id as the key
                    key={msg._id} 
                    style={{
                        display: "flex",
                        // Compare msg.senderId with the logged-in user's ID
                        // This determines if the message is 'me' or 'other'
                        justifyContent: msg.senderId === currentUserId ? "flex-end" : "flex-start",
                    }}
                >
                    <Card
                        style={{
                            maxWidth: "70%",
                            // Apply sender-specific styling
                            background: msg.senderId === currentUserId ? "#d9fdd3" : "#f0f0f0",
                            borderRadius: 10,
                        }}
                    >
                        {/* Display the actual message text */}

                        <h4>{msg.senderId.name}</h4>
                        <p style={{ margin: 0 }}>{msg.message} </p> 
                        {/* Optionally display sender ID or timestamp */}
                        <small style={{ color: '#888' }}>
                            {new Date(msg.createdAt).toLocaleTimeString()}
                        </small>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default MessageList;