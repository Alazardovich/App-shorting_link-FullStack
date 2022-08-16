//@ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import useHttp from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { request, error, loading, clearError } = useHttp();
  const message = useMessage();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError, loading]);

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (err) {}
  };
  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (err) {}
  };
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="row center">
      <div className="col s6 offset-s3">
        <h2>Link Shortening</h2>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div style={{ color: "white" }}>
              <div className="row">
                <div className="input-field">
                  <input
                    onChange={changeHandler}
                    name="email"
                    autoComplete="off"
                    id="email"
                    type="text"
                    value={form.email}
                    className="validate yellow-input "
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field">
                  <input
                    onChange={changeHandler}
                    name="password"
                    id="password"
                    type="password"
                    value={form.password}
                    className="validate yellow-input "
                    autoComplete="off"
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              onClick={loginHandler}
              disabled={loading}
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
            >
              Login
            </button>
            <button
              disabled={loading}
              onClick={registerHandler}
              className="btn grey lighten-1 black-text"
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
