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
import AdminGuard from "./guard/AdminGuard";
import Interface from "./pages/Interface";
import UpdateProfile from "./pages/UpdateProfile";
import FoodMenu from "./pages/FoodMenu";
import WineMenu from "./pages/WineMenu";

export default function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="interface" element={<Interface />} />
          <Route element={<AdminGuard />}>
            <Route path="" element={<Navigate to={"/login"} />} />
            <Route path="interface/food-menu" element={<FoodMenu />} />
            <Route path="interface/wine-menu" element={<WineMenu />} />
            <Route path="insights" element={<Feedback />} />
            <Route path="qr-codes" element={<Feedback />} />
            <Route path="training" element={<Feedback />} />
            <Route path="reviews" element={<Feedback />} />
            <Route path="support" element={<Feedback />} />
            <Route path="settings" element={<Settings />} />

            <Route path="feedback" element={<Feedback />} />
            <Route path="menu" element={<Menu />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="questionaries" element={<Questionaries />} />
            <Route path="restaurant" element={<Restaurant />} />
          </Route>
        </Route>
        <Route path="update-profile" element={<UpdateProfile />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </>
  );
}
