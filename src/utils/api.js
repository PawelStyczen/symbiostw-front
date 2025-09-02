import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Axios intercepted error:", error.response);

      // Ustaw przyjazny komunikat błędu
      error.message =
        error.response.data?.message ||
        `HTTP ${error.response.status}: ${error.response.statusText}`;

      // Jeśli token wygasł (401 lub 403), usuń go i przekieruj
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");

        // Opcjonalnie: przekieruj użytkownika do /login
        // if (window.location.pathname !== "/login") {
        //   window.location.href = "/login";
        // }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
