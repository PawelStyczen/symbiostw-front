import { useEffect, useRef } from "react";

export function useErrorNotification({ isError, error, showAlert }) {
  const hasNotifiedRef = useRef(false);

  useEffect(() => {
    if (isError && error && !hasNotifiedRef.current) {
      showAlert(error.message || "An error occurred", "danger");
      hasNotifiedRef.current = true;
    }

    if (!isError && hasNotifiedRef.current) {
      hasNotifiedRef.current = false;
    }
  }, [isError, error, showAlert]);
}
