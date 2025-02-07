import React from "react";
import { Navigate, Route, Routes } from "react-router";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login";
import Feedback from "./pages/Feedback";
import Settings from "./pages/Settings";
import Subscription from "./pages/Subscription";
import Menu from "./pages/Menu";
import Questionaries from "./pages/Questionaries";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="" element={<Navigate to={"/login"} />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="menu" element={<Menu />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="settings" element={<Settings />} />
          <Route path="questionaries" element={<Questionaries />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}
