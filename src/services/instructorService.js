import api from "../utils/api";

export const fetchInstructors = async () => {
  const response = await api.get("/api/Public/Instructors");
  return response.data;
};

export const fetchInstructorById = async (id) => {
  const response = await api.get(`/api/Public/Instructors/${id}`);
  return response.data;
};

export const fetchPublicInstructorById = async (id, isGuest = false) => {
  const endpoint = isGuest
    ? `/api/Public/GuestInstructors/${id}`
    : `/api/Public/Instructors/${id}`;

  const response = await api.get(endpoint);
  return response.data;
};
