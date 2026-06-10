import api from "../utils/api";

export const createLead = async (leadData) => {
  const response = await api.post("/api/Public/Leads", leadData, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};
