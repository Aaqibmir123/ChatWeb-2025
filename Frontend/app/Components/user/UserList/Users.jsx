'use client';
import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../../services/frontend';
import { Row, Col, Card, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { addFriend } from '@/app/services/addFriend';

const { Meta } = Card;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setLoggedInUser(parsedUser);
      }
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const AddFriend = async (clickedUser) => {
    if (!loggedInUser) {
      alert('You must be logged in!');
      return;
    }

    const payload = {
      senderId: loggedInUser._id || loggedInUser.id,
      senderEmail: loggedInUser.email,
      receiverId: clickedUser._id,
      receiverUsername: clickedUser.username || clickedUser.email,
    };

    console.log('Payload:', payload);

    const response = await addFriend(payload);
    console.log('Add Friend Response:', response);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        {users.map((userItem) => {
          const isCurrentUser = loggedInUser && loggedInUser._id === userItem._id;

          if (isCurrentUser) {
            return null; // Don't show the currently logged-in user in the list
          }

          return (
            <Col key={userItem._id} xs={24} sm={12} md={8} lg={4}>
              <Card hoverable style={{ textAlign: 'center' }}>
                <Avatar size={64} icon={<UserOutlined />} />
                <Meta
                  title={userItem.username || userItem.email}
                  description={
                    <Button 
                      onClick={() => AddFriend(userItem)} 
                      type="primary" 
                      style={{ marginTop: 10 }}
                      disabled={!loggedInUser} // Disable button if user is not logged in
                    >
                      Add Friend
                    </Button>
                  }
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default UserList;