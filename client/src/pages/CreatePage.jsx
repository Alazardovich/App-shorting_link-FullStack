//@ts-nocheck
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/http.hook";

import { AuthContext } from "../context/AuthContext";

const CreatePage = () => {
  const [link, setLink] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const { request } = useHttp();
  const changeHandler = (e) => {
    setLink(e.target.value);
  };
  const pressHandler = async (e) => {
    try {
      if (e.key === "Enter") {
        const data = await request(
          "/api/link/generate",
          "POST",
          {
            from: link,
          },
          { Authorization: `Bearer ${auth.token}` }
        );
        navigate(`/detail/${data.link._id}`);
      }
    } catch (err) {}
  };
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <label htmlFor="link">Creating link</label>
        <input
          onChange={changeHandler}
          name="link"
          id="link"
          type="text"
          value={link}
          placeholder="Add link"
          onKeyPress={pressHandler}
        />
      </div>
    </div>
  );
};

export default CreatePage;
