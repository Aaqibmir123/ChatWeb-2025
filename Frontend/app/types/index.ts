// types.ts

// User data returned by backend
export interface UserData {
  id: string;
  name: string;
  email: string;
}

// Generic API Response (Reusable)
export interface APIResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

// Login response specifically
export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;       // token from backend
  user?: UserData;      // user object from backend
}

// Register form inputs
export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

// Login form inputs
export interface LoginFormValues {
  email: string;
  password: string;
}
