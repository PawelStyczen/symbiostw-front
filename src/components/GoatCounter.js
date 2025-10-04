// src/components/GoatCounter.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GoatCounter = () => {
  const location = useLocation();

  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== "production") return;

    // Wait for GoatCounter to be loaded
    if (window.goatcounter && typeof window.goatcounter.count === "function") {
      window.goatcounter.count({
        path: location.pathname + location.search,
        title: document.title,
      });
    }
  }, [location]);

  return null;
};

export default GoatCounter;
