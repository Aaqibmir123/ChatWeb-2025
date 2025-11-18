'use client';
import React, { useState } from 'react';
import { Form, Input, Button, Upload, Avatar } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';

const UserProfile = () => {
  const [imageUrl, setImageUrl] = useState(null);

  // ---- Image Upload Handler ----
  const handleImageUpload = (info) => {
    const file = info.file.originFileObj;
    if (file) {
      const preview = URL.createObjectURL(file);
      setImageUrl(preview); // show preview image
    }
  };

  return (
    <div style={{ maxWidth: "400px", }}>
      
      {/* ---- Profile Picture ---- */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Avatar
          size={100}
          src={imageUrl}
          icon={!imageUrl && <UserOutlined />}
          style={{ marginBottom: "10px" }}
        />
      </div>

      {/* ---- Upload Button ---- */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <Upload
          showUploadList={false}
          beforeUpload={() => false}
          onChange={handleImageUpload}
        >
          <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
        </Upload>
      </div>

      {/* ---- Form Fields ---- */}
      <Form
        name="userProfile"
        layout="vertical"
      >
        <Form.Item label="Username" name="username">
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserProfile;
