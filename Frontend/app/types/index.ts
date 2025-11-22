// --------------------------------------
// User
// --------------------------------------
export interface UserData {
  _id: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

// --------------------------------------
// Group
// --------------------------------------
export interface GroupData {
  _id: string;
  admin: string | UserData;
  groupName: string;
  groupDescription?: string;
  members: (string | UserData)[];
  createdAt?: string;
  updatedAt?: string;
}


// --------------------------------------
// Group Message
// --------------------------------------
export interface GroupMessage {
  _id?: string;
  groupId: string | GroupData;
  senderId: string | UserData;
  message: string;
  createdAt?: string;
}

// --------------------------------------
// Friend Request
// --------------------------------------
export interface FriendRequest {
  _id: string;
  senderId: string;
  senderEmail: string;
  receiverId: string;
  receiverUsername: string;
  status: "pending" | "accepted" | "declined";
  createdAt?: string;
  updatedAt?: string;
}

// --------------------------------------
// Generic API Response
// --------------------------------------
export interface APIResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

// --------------------------------------
// Login / Register
// --------------------------------------
export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: UserData;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

// --------------------------------------
// Socket / Message Input
// --------------------------------------
export interface MessagePayload {
  groupId: string;
  senderId: string;
  message: string;
}

export interface MessageInputProps {
  onSend: (messageText: string) => Promise<void> | void;
  groupId: string;
  senderId: string | null;
}

export interface  FriendItem {
  _id: string;
  senderId: string;
  senderEmail: string;
}

export interface GroupFormData {
  groupName: string;
  groupDescription: string;
  members: string[];
  visibility: string;
  admin: string;
}
