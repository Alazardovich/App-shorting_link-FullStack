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
        const response = await fetch(url, { method, body, headers });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "response Something went wrong");
        }
        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
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
