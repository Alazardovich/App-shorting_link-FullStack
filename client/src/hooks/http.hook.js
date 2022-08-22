// @ts-nocheck
import { useState, useCallback } from "react";

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);

      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }
        const response = await fetch(`http://localhost:3223${url}`, {
          method,
          body,
          headers,
        });
        if (!response.ok) {
          throw new Error("response Something went wrong");
        }
        const data = await response.json();

        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        console.log(error);
        setError(error.message || "http hook Something went wrong");
        throw error;
      }
    },
    []
  );
  const clearError = useCallback(() => setError(null), []);
  return { loading, error, request, clearError };
};

export default useHttp;
