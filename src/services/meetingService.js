import api from "../utils/api";

export const fetchMeetings = async () => {
  try {
    console.log("fetchMeetings called");
    const response = await api.get("/api/Public/PublicMeeting");
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "fetchMeetings error caught:",
      error.response || error.message
    );

    throw new Error(
      error.response?.data?.message ||
        `Error: ${error.response?.status} ${error.response?.statusText}`
    );
  }
};

export const fetchMeetingById = async (id) => {
  const response = await api.get(`/api/Public/PublicMeeting/${id}`);
  return response.data;
};

export const addParticipantToMeeting = async (meetingId) => {
  const response = await api.post("/api/Public/PublicMeeting/add-participant", {
    meetingId, // Send meetingId as DTO
  });
  return response.data;
};

export const removeParticipantFromMeeting = async (meetingId) => {
  const response = await api.post(
    "/api/Public/PublicMeeting/remove-participant",
    {
      meetingId,
    }
  );
  return response.data;
};

export const fetchUserMeetings = async () => {
  const response = await api.get("/api/Public/PublicMeeting/my-meetings");
  return response.data;
};

export const fetchHighlightedMeetings = async (count = 8) => {
  try {
    const response = await api.get(
      `/api/Public/PublicMeeting/highlighted?count=${count}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching highlighted meetings:", error);
    throw error;
  }
};
