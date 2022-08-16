//@ts-nocheck
import React, { useEffect, useCallback, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import LinkCard from "../components/LinkCard";
import { AuthContext } from "../context/AuthContext";
import useHttp from "../hooks/http.hook";
import Loader from "../components/Loader";

const DetailPage = () => {
  const [link, setLink] = useState(null);
  const { request, loading } = useHttp();
  const linkId = useParams().id;
  const { token } = useContext(AuthContext);
  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLink(fetched);
    } catch (error) {}
  }, [linkId, request, token]);

  useEffect(() => {
    getLink();
  }, [getLink]);
  if (loading) {
    return <Loader />;
  }
  return <> {!loading && link && <LinkCard link={link} />}</>;
};

export default DetailPage;
