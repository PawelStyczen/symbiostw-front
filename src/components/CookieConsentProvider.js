import React, { createContext, useContext, useState } from "react";

const COOKIE_CONSENT_STORAGE_KEY = "symbio-cookie-consent";
const COOKIE_CONSENT_VERSION = 1;

const CookieConsentContext = createContext(null);

const readStoredConsent = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue);

    if (
      typeof parsedValue !== "object" ||
      parsedValue === null ||
      parsedValue.version !== COOKIE_CONSENT_VERSION
    ) {
      return null;
    }

    return parsedValue;
  } catch (error) {
    return null;
  }
};

const createConsentPayload = (analytics) => ({
  analytics,
  necessary: true,
  version: COOKIE_CONSENT_VERSION,
  decidedAt: new Date().toISOString(),
});

export const CookieConsentProvider = ({ children }) => {
  const [consent, setConsent] = useState(() => readStoredConsent());
  const [isBannerOpen, setIsBannerOpen] = useState(false);

  const saveConsent = (analytics) => {
    const nextConsent = createConsentPayload(analytics);

    setConsent(nextConsent);
    setIsBannerOpen(false);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        COOKIE_CONSENT_STORAGE_KEY,
        JSON.stringify(nextConsent),
      );
    }
  };

  const acceptAnalytics = () => saveConsent(true);
  const rejectOptional = () => saveConsent(false);
  const openPreferences = () => setIsBannerOpen(true);
  const closePreferences = () => setIsBannerOpen(false);

  const value = {
    consent,
    hasAnswered: Boolean(consent?.decidedAt),
    isBannerVisible: isBannerOpen || !consent?.decidedAt,
    acceptAnalytics,
    rejectOptional,
    openPreferences,
    closePreferences,
  };

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider",
    );
  }

  return context;
};

export default CookieConsentProvider;
