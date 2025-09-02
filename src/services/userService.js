import api from "../utils/api";

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/api/User/Account/LoginUser", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("User login failed:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/api/User/Account/RegisterUser", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const fetchCurrentUser = async () => {
  try {
    const response = await api.get("/api/User/Account/CurrentUser");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    throw error;
  }
};

export const updateCurrentUser = async (userData) => {
  const response = await api.put("/api/User/Account/CurrentUser", userData);
  return response.data;
};
