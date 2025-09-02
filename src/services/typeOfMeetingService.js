import api from "../utils/api";

export const fetchTypeOfMeetings = async () => {
  const response = await api.get("/api/Public/PublicTypeOfMeeting");
  return response.data;
};

export const fetchTypeOfMeetingById = async (id) => {
  const response = await api.get(`/api/Public/PublicTypeOfMeeting/${id}`);
  return response.data;
};

export const fetchHighlightedTypesOfMeetings = async () => {
  try {
    const response = await api.get(
      "/api/Public/PublicTypeOfMeeting/highlighted"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching highlighted types of meetings:", error);
    throw error;
  }
};
