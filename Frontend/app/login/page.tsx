"use client";
import React from "react";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation"; // ⬅️ NEW: Import useRouter for client-side navigation
import "./login.css";

import { loginUser } from "../services/frontend";
import { LoginFormValues } from "../types";

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: LoginFormValues) => {
    try {
      const response = await loginUser(values);
      console.log("Login response:", response);

      if (response.success) {
        message.success("Login successful!");

        if (response.token) {
          localStorage.setItem("token", response.token); 
        }
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data)); 
        }

        router.push("/dashboard");
      } else {
        message.error(response.message || "Invalid credentials!");
      }
    } catch {
      message.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>

      <Form
        form={form}
        layout="vertical"
        className="login-form"
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Enter a valid email" },
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
          Login
        </Button>

        <div className="register-redirect">
          Don t have an account? <a href="/register">Register</a>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
