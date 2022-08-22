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
        const response = await fetch(
          `https://app-shorting-link-fullstack.netlify.app${url}`,
          {
            method,
            body,
            headers,
          }
        );
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
