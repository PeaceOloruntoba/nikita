import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";

const SubscriptionForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const profile = authStore.profile; // Access the profile data from the store

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe.js has not loaded yet.");
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store the token in localStorage
        },
        body: JSON.stringify({
          stripeToken: token.id,
          priceId: profile.video_support
            ? "price_1R59e6GWzmbPnUwmidW4eIXH"
            : "price_1R592oGWzmbPnUwmzJ15hcAm",
        }),
      });

      if (response.ok) {
        toast.success("Subscription successful!");
        navigate("/interface");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Subscription failed.");
      }
    } catch (fetchError) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-12">
      <h2 className="text-2xl font-semibold mb-4 text-primary">
        Subscribe Now
      </h2>
      <p className="mb-4 text-primary">
        {profile.video_support
          ? "You've selected the premium plan with video support."
          : "You've selected the basic plan."}
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
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
};

export default SubscriptionForm;
