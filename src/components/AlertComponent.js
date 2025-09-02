import React from "react";
import { Alert } from "react-bootstrap";
import { useAlert } from "./AlertContext";

const AlertComponent = () => {
  const { alert, hideAlert } = useAlert();

  if (!alert) return null;

  return (
    <Alert
      variant={alert.variant}
      onClose={hideAlert}
      dismissible
      className="position-fixed top-0 start-50 translate-middle-x mt-3"
      style={{ zIndex: 1050, width: "90%", maxWidth: "500px" }}
    >
      {alert.message}
    </Alert>
  );
};

export default AlertComponent;
