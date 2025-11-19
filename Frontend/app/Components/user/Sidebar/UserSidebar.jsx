'use client'; 

import React from "react";
import { Menu } from "antd";
import Link from "next/link"; 

import {
    UserOutlined,
    MessageOutlined,
    TeamOutlined,
    UserAddOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import "./UserSidebar.css";

const items = [
    {
        key: "1",
        label: <Link href="/profile">Profile</Link>, 
        icon: <UserOutlined />,
    },
    {
        key: "2",
        label: <Link href="/users">Users</Link>,
        icon: <UserOutlined />,
    },
    {
        key: "3",
        label: <Link href="/messages">Messages</Link>,
        icon: <MessageOutlined />,
    },
    {
        key: "4",
        label: <Link href="/friendList">Friend List</Link>,
        icon: <TeamOutlined />,
    },
    {
        key: "5",
        label: <Link href="/createGroup">Create Group</Link>,
        icon: <TeamOutlined />,
    },
    {
        key: "6",
        label: <Link href="/requests">Friend Requests</Link>,
        icon: <UserAddOutlined />,
    },
    {
        key: "7",
        label: <Link href="/logout">Logout</Link>, 
        icon: <LogoutOutlined />,
    },
];

const UserSidebar = () => {
    return (
        <div className="sidebar-container">
            <Menu
                mode="inline"
                defaultSelectedKeys={["1"]} 
                items={items}
                className="sidebar-menu"
            />
        </div>
    );
};

export default UserSidebar;
