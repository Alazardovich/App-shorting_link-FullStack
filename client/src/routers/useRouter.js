// @ts-nocheck
import React from "react";
import { Routes, Route } from "react-router-dom";
import CreatePage from "../pages/CreatePage";
import LinksPage from "../pages/LinksPage";
import DetailPage from "../pages/DetailPage";
import AuthPage from "../pages/AuthPage";
export const useRouter = (isAuthentication) => {
  if (isAuthentication) {
    return (
      <Routes>
        <Route path="/links" element={<LinksPage />} />

        <Route path="/create" element={<CreatePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="*" element={<CreatePage />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<AuthPage />} />
    </Routes>
  );
};
