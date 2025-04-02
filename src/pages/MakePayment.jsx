import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import axiosInstance from "../utils/axiosConfig";

const MakePayment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const priceId = "YOUR_PRICE_ID_HERE"; // Manually input your price ID
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/product-details/${priceId}`
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

    if (!stripe || !elements) {
      toast.error("Stripe.js has not loaded yet.");
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { error: stripeError, token } = await stripe.createToken(cardElement);

    if (stripeError) {
      toast.error(stripeError.message);
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/sub/create-payment", {
        token: token.id,
        priceId: priceId,
      });

      if (response.data.success) {
        toast.success("Payment successful!");
        navigate("/interface");
      } else {
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
      <p className="mb-4 text-primary">{productDetails.description}</p>
      <p className="mb-4 text-primary">
        Amount: ${productDetails.amount / 100}{" "}
        {productDetails.currency.toUpperCase()}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-primary">
            Card details
          </label>
          <div className="border rounded-md p-2">
            <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
          </div>
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default MakePayment;
