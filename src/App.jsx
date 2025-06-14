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
import SuperAdminGuard from "./guard/SuperAdminGuard";
import Home from "./pages/admin/Home";
import MakePayment from "./pages/MakePayment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Restaurants from "./pages/admin/Restaurants";
import Users from "./pages/admin/Users";
import RestaurantDetails from "./pages/admin/RestaurantDetails";
import UserDetails from "./pages/admin/UserDetails";
import UserGuard from "./guard/UserGuard";
import QRScanner from "./pages/QRScanner";
import AIScreen from "./pages/AIScreen";

const stripePromise = loadStripe(
  "pk_test_51R9KnzP7PZBSVcUMr2gYSKBnYYRtYfWEEx4LBTdRvawHgdsKi1JNkPk7FNza78zgPDSQoq9zZphqgNerBKuMPQcJ003enJ5gDD"
);

export default function App() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <Toaster position="top-right" richColors />
        <Routes>
          <Route element={<AdminGuard />}>
            <Route element={<RootLayout />}>
              <Route path="interface" element={<Interface />} />
              {/* <Route path="/" element={<Navigate to={"/interface"} />} /> */}
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
              <Route path="make-payment" element={<MakePayment />} />
            </Route>
          </Route>
          <Route path="/admin" element={<SuperAdminGuard />}>
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="restaurants" element={<Restaurants />} />
              <Route
                path="restaurants/:restaurantId"
                element={<RestaurantDetails />}
              />
              <Route path="users" element={<Users />} />
              <Route path="users/:userId" element={<UserDetails />} />
              <Route path="support" element={<Home />} />
            </Route>
          </Route>
          <Route element={<UserGuard />}>
          </Route>
            <Route path="scanqr" element={<QRScanner />} />
            <Route path="ai" element={<AIScreen />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          <Route path="/" element={<Navigate to="/scanqr" />} />
        </Routes>
      </Elements>
    </>
  );
}

// export default function App(){
//   return(
//     <>
//       <div className="w-screen h-screen bg-black text-white flex items-center justify-center">
//       <p className="text-5xl font-semibold text-white">Pay My Money!!!</p>
//       </div>
//     </>
//   )
// }
