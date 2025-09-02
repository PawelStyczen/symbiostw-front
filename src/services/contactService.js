import api from "../utils/api";

export const sendContactMessage = async (messageData) => {
  try {
    const response = await api.post(
      "/api/Public/PublicContactMessage",
      messageData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message || "An error occurred. Please try again."
    );
  }
};
