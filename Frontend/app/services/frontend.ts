import { CreateGroup } from '@/app/Components/user/CreateGroup/CreateGroup';
import {
  RegisterFormValues,
  LoginFormValues,
  APIResponse,
  UserData,
  LoginResponse,
} from "../types";

// API base URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  
export const registerUser = async (
  data: RegisterFormValues
): Promise<APIResponse<UserData>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const result: APIResponse<UserData> = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Registration failed");
    }

    return result;
  } catch (error: unknown) {
    const err = error as Error;
    throw new Error(err.message || "Something went wrong");
  }
};


export const loginUser = async (
  data: LoginFormValues
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const result: LoginResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Login failed");
    }

    return result;
  } catch (error: unknown) {
    const err = error as Error;
    throw new Error(err.message || "Something went wrong");
  }
};

export const getAllUsers = async (): Promise<APIResponse<UserData[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const result: APIResponse<UserData[]> = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch users");
    }
    return result;
  } catch (error: unknown) {
    const err = error as Error;
    throw new Error(err.message || "Something went wrong");
  }
};



const api = { registerUser, loginUser,getAllUsers };
export default api;
