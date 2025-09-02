import api from "../utils/api";

export const fetchInstructors = async () => {
  const response = await api.get("/api/Public/Instructors");
  return response.data;
};

export const fetchInstructorById = async (id) => {
  const response = await api.get(`/api/Public/Instructors/${id}`);
  return response.data;
};
