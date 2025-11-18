const API_BASE_URL = "http://localhost:5000/api";

export const CreateGroup = async (data: any): Promise<any> => {
    try {
        const response = await fetch(`${API_BASE_URL}/create-group`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Error creating group:", error);
        throw error;
    }
};
export const GetGroupById = async (groupId: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/group/${groupId}`, {
      method: "GET", // <-- use GET
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching group by ID:", error);
    throw error;
  }
};
