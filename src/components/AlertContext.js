import React, { createContext, useState, useContext } from "react";

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, variant = "success", duration = 3000) => {
    setAlert({ message, variant });

    if (duration > 0) {
      setTimeout(() => setAlert(null), duration);
    }
  };

  const hideAlert = () => setAlert(null);

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
