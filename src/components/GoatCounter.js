// src/components/GoatCounter.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCookieConsent } from "./CookieConsentProvider";

const GOAT_COUNTER_SCRIPT_ID = "goatcounter-script";

const GoatCounter = () => {
  const location = useLocation();
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!consent?.analytics) return;

    const existingScript = document.getElementById(GOAT_COUNTER_SCRIPT_ID);

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = GOAT_COUNTER_SCRIPT_ID;
      script.async = true;
      script.dataset.goatcounter = "https://symbiostw.goatcounter.com/count";
      script.src = "https://gc.zgo.at/count.js";
      document.body.appendChild(script);
      return;
    }

    if (window.goatcounter && typeof window.goatcounter.count === "function") {
      window.goatcounter.count({
        path: location.pathname + location.search,
        title: document.title,
      });
    }
  }, [consent?.analytics, location]);

  return null;
};

export default GoatCounter;
