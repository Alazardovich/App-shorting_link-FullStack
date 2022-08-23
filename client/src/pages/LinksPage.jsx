//@ts-nocheck
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import useHttp from "../hooks/http.hook";
import Loader from "../components/Loader";
import { nanoid } from "nanoid";
import LinksList from "../components/LinksList";

const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);
  const deleteHandler = async (code) => {
    try {
      const linkId = await request("api/link/delete", "DELETE", { code });
      console.log(linkId);
      return linkId;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLinks = useCallback(async () => {
    try {
      const data = await request("/api/link", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLinks(data);
    } catch (error) {}
  }, [request, token]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!loading && (
        <LinksList key={nanoid()} links={links} deleteHandler={deleteHandler} />
      )}
    </>
  );
};

export default LinksPage;
