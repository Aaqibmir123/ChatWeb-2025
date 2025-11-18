'use client'
import React from "react";
import { Form, Input, Button, message } from "antd";
import "antd/dist/reset.css"; 
import "./register.css";  
import { RegisterFormValues } from "../types"; 
import Link from "next/link";
import { registerUser } from "../services/frontend";

export default function RegisterPage() {
  const [form] = Form.useForm<RegisterFormValues>(); 

  // Form submit handler
  const onFinish = async (values: RegisterFormValues) => {
    try {
      const result = await registerUser(values);
      console.log("Form Submitted:", result);

      // Show success message
      message.success(result?.message || "Registration successful! Please login.");

      // Optional: reset the form
      form.resetFields();
    } catch  {
      message.error( "Registration failed. Try again.");
    }
  };


  return (
    <div className="register-container">
      <h2 className="title">Create Account</h2>

      <Form
        layout="vertical"
        className="register-form"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Button type="primary" block htmlType="submit">
          Register
        </Button>

        <div className="login-redirect">
          Already have an account? <Link href="/login">Login</Link>
        </div>
      </Form>
    </div>
  );
}
