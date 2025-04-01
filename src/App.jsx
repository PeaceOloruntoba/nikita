import { Navigate, Route, Routes } from "react-router";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import { Toaster } from "sonner";
import AdminGuard from "./guard/AdminGuard";
import Interface from "./pages/Interface";
import UpdateProfile from "./pages/UpdateProfile";
import FoodMenu from "./pages/FoodMenu";
import WineMenu from "./pages/WineMenu";
import Insights from "./pages/Insights";
import QrCodes from "./pages/QrCodes";
import Training from "./pages/Training";
import Reviews from "./pages/Reviews";
import Support from "./pages/Support";
import SubscriptionPage from "./pages/Subscription";

export default function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<AdminGuard />}>
            <Route path="interface" element={<Interface />} />
            <Route path="/" element={<Navigate to={"/interface"} />} />
            <Route path="update-profile" element={<UpdateProfile />} />
            <Route path="interface/food-menu" element={<FoodMenu />} />
            <Route path="interface/wine-menu" element={<WineMenu />} />
            <Route path="insights" element={<Insights />} />
            <Route path="qr-codes" element={<QrCodes />} />
            <Route path="training" element={<Training />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="support" element={<Support />} />
            <Route path="settings" element={<Settings />} />
            <Route path="subscription" element={<SubscriptionPage />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </>
  );
}
