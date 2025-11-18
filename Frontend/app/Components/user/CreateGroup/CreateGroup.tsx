"use client";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Select, Radio, notification } from "antd";
import { CreateGroup as CreateGroupService } from "@/app/services/createGroup";
import { getFriendsList } from "@/app/services/addFriend";
import GroupHistory from "./GroupHistory";
const { TextArea } = Input;
const { Option } = Select;

interface GroupFormData {
  groupName: string;
  groupDescription: string;
  members: string[];
  visibility: "public" | "private";
}

const CreateGroupModal = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState<Array<{ friendId: string; friendName: string }>>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setUserId(JSON.parse(user).id);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchFriends = async () => {
      try {
        const friendsList = await getFriendsList(userId);
        setFriends(friendsList.data); // assuming your API returns data array
      } catch (error) {
        console.error("Failed to fetch friends list:", error);
      }
    };

    fetchFriends();
  }, [userId]);

  const handleCreateGroup = async (values: GroupFormData) => {
    if (!userId) return;

    setLoading(true);
    try {
      const groupData = {
        groupName: values.groupName,
        groupDescription: values.groupDescription,
        members: values.members,
        visibility: values.visibility,
        admin: userId,
      };

      const result = await CreateGroupService(groupData);

      api.success({
        message: "Group Created Successfully!",
        description: `Group "${result?.groupName || values.groupName}" created.`,
        placement: "topRight",
      });

      form.resetFields();
      setVisible(false);
    } catch (error: any) {
      api.error({
        message: "Group Creation Failed",
        description: error.message || "Unknown error",
        placement: "topRight",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {contextHolder}

      <Button type="primary" onClick={() => setVisible(true)}>
        Create Group
      </Button>

      <Modal
        title="Create New Group"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null} // we use form submit instead
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateGroup}
          initialValues={{ visibility: "public" }}
        >
          <Form.Item
            label="Group Name"
            name="groupName"
            rules={[{ required: true, message: "Enter group name" }]}
          >
            <Input placeholder="Group name" />
          </Form.Item>

          <Form.Item label="Group Description" name="groupDescription">
            <TextArea rows={3} placeholder="Group description" />
          </Form.Item>

          <Form.Item label="Members" name="members">
            <Select mode="multiple" placeholder="Select members">
              {friends.map(friend => (
                <Option key={friend.friendId} value={friend.friendId}>
                  {friend.friendName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Visibility" name="visibility" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value="public">Public</Radio>
              <Radio value="private">Private</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" block htmlType="submit" loading={loading}>
              {loading ? "Creating..." : "Create Group"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

        <GroupHistory />
    </div>

  );
};

export default CreateGroupModal;
