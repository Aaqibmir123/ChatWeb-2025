const API_BASE_URL = "http://localhost:5000/api";

export const addFriend = async (data: any): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/send-friend-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Add Friend request failed");
    }
    return result;
  } catch (error: unknown) {
    const err = error as Error;
    throw new Error(err.message || "Something went wrong");
  }
};

export const getFriendRequests = async (receiverId: string): Promise<any> => {
    try {
    const response = await fetch(
      `${API_BASE_URL}/get-friend-requests/${receiverId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch friend requests");
    }

    return result;
  } catch (error: unknown) {
    const err = error as Error;
    throw new Error(err.message || "Something went wrong");
  }
};

export const respondToFriendRequest = async (requestId: string): Promise<any> => {

  try {
    const response = await fetch(`${API_BASE_URL}/accept-friend-request/${requestId}`, {
      method: "POST",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to respond to friend request");
    }

    return result;
  } catch (error: unknown) {
    const err = error as Error;
    throw new Error(err.message || "Something went wrong");
  }
};

export const cancelFriendRequest = async (requestId: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/decline-friend-request/${requestId}`, {
      method: "POST",
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to cancel friend request");
    } 
    return result;
  } catch (error: unknown) {
    const err = error as Error; 
    throw new Error(err.message || "Something went wrong");
  }
};

export const getFriendsList = async (userId: string): Promise<any> => {
  console.log("Fetching friends list for userId:", userId);
  try {
    const response = await fetch( 
      `${API_BASE_URL}/accept-friend-requests/${userId}`,
      {
        method: "POST",  
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json", 
        },  
      }
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch friends list");
    } 
    return result;
  } catch (error: unknown) {
    const err = error as Error;
    throw new Error(err.message || "Something went wrong");
  } 
};






