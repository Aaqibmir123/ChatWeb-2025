'use client';

import React from 'react';
import { Popconfirm, Button, message } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';


const Logout = () => {
    const router = useRouter();

    const logoutHandler = () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('user');    
            message.success('Logged out successfully');
            router.push('/login'); 
        } catch (error) {
            console.error("Logout error:", error);
            message.error('Failed to logout');
        }
    };

    const cancelHandler = () => {
        message.info('Logout cancelled');
    };

    return (
        <div style={styles.container}>
            <h2>Ready to leave?</h2>
            <p style={{ marginBottom: '20px' }}>Click the button below to sign out.</p>
            
            <Popconfirm
                title="Logout"
                description="Are you sure you want to logout?"
                onConfirm={logoutHandler}
                onCancel={cancelHandler}
                okText="Yes"
                cancelText="No"
            >
                <Button type="primary" danger icon={<LogoutOutlined />} size="large">
                    Logout
                </Button>
            </Popconfirm>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
    }
};

export default Logout;