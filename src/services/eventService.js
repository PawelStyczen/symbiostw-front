// services/eventService.js
import api from "../utils/api"; // albo axios public client (bez tokena) - zależnie jak masz

export const fetchCurrentOrNextEvents = async () => {
  const res = await api.get("/api/Public/Events/CurrentOrNext?count=3");
  // jeśli API zwróci 204 => react-query może wywalić. Upewnij się, że API zwraca [] zamiast 204
  return res.data ?? [];
};
