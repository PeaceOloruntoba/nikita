import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router";
import axiosInstance from "../utils/axiosConfig";
import Stripe from "stripe";
import Spinner from "../components/shared/Spinner";

const MakePayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const priceId = "price_1R9KrgP7PZBSVcUMoNOF2NwK"; // Manually input your price ID
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `/subscription/product-details/${priceId}`
        );
        setProductDetails(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Failed to load product details.");
      }
    };

    fetchProductDetails();
  }, [priceId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        "/subscription/onetime-payment"
      );

      if (response.data && response.data.sessionId) {
        // Redirect to Stripe Checkout
        window.location.href = `https://checkout.stripe.com/pay/${response.data.sessionId}`;
      } else {
        toast.error("Failed to create payment session.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get("session_id");

    const updatePaymentStatus = async () => {
      if (sessionId) {
        try {
          const stripe = new Stripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
          const session = await stripe.checkout.sessions.retrieve(sessionId);
          const customerId = session.customer;

          await axiosInstance.post("/subscription/update-onetime-payment", {
            customerId,
          });
          toast.success("Payment confirmed!");
          navigate("/interface");
        } catch (error) {
          console.error("Error updating payment status:", error);
          toast.error("Failed to confirm payment.");
          navigate("/make-payment");
        }
      }
    };
    updatePaymentStatus();
  }, [location.search, navigate]);

  if (!productDetails) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-12">
        <p>Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-12">
      <h2 className="text-2xl font-semibold mb-4 text-primary">
        One-Time Payment
      </h2>
      <p className="mb-4 text-primary">{productDetails.product.name}</p>
      <p className="mb-4 text-primary">{productDetails.product.description}</p>
      <p className="mb-4 text-primary">
        Amount: #{productDetails.unit_amount / 100}{" "}
        {productDetails.currency.toUpperCase()}
      </p>

      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
          }`}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default MakePayment;
