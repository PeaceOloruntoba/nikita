import React from "react";
import { Route, Routes } from "react-router";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login";
import Feedback from "./pages/Feedback";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="" element={<Feedback />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}
