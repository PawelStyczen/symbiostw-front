import api from "../utils/api";

export const fetchLocations = async () => {
  try {
    const response = await api.get("/api/Public/PublicLocation");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch locations:", error);
    throw error;
  }
};

export const fetchLocationById = async (id) => {
  const response = await api.get(`/api/Public/Publiclocation/${id}`);
  return response.data;
};
