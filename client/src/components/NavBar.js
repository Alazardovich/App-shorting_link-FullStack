//@ts-nocheck
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutHandler = (e) => {
    e.preventDefault();
    auth.logout();
    navigate("/");
  };
  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: "0 2rem" }}>
        <span className="brand-logo">Application for shorting links</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Create</NavLink>
          </li>
          <li>
            <NavLink to="/links">Links</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Exit
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

NavBar.propTypes = {};

export default NavBar;
