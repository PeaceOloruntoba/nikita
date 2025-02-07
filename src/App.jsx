import React from "react";
import { Navigate, Route, Routes } from "react-router";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login";
import Feedback from "./pages/Feedback";
import Settings from "./pages/Settings";
import Subscription from "./pages/Subscription";
import Menu from "./pages/Menu";
import Questionaries from "./pages/Questionaries";
import Signup from "./pages/Signup";
import { Toaster } from "sonner";
import Restaurant from "./pages/Restaurant";

export default function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="" element={<Navigate to={"/login"} />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="menu" element={<Menu />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="settings" element={<Settings />} />
          <Route path="questionaries" element={<Questionaries />} />
          <Route path="restaurant" element={<Restaurant />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </>
  );
}
