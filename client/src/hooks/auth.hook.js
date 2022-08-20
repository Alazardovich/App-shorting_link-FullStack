//@ts-nocheck
import { useCallback, useEffect, useState } from "react";

const localName = "userData";

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [ready, setReady] = useState(false);

  const login = useCallback((jwttoken, id) => {
    setToken(jwttoken);
    setUserId(id);
    localStorage.setItem(
      localName,
      JSON.stringify({ userId: id, token: jwttoken })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(localName);
  }, []);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(localName));
    if (data && data.token) {
      login(data.token, data.userId);
    }
    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready };
};

export default useAuth;
