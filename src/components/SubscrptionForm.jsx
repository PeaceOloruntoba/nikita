import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";
import useSubscriptionStore from "../store/useSubscriptionStore";

const SubscriptionForm = () => {
  const stripe = useStripe();
  const [loadin, setLoading] = useState();
  const elements = useElements();
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const profile = authStore.profile;
  const { loading, error, createSubscription, getPlanDetails } =
    useSubscriptionStore();

  const [planDetails, setPlanDetails] = useState(null);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        let priceId;
        if (profile.video_support) {
          priceId = "price_1R9KxDP7PZBSVcUMMgQjFVWQ";
        } else if (profile.audio_support) {
          priceId = "price_1R9KwNP7PZBSVcUMmpueWXMX";
        } else if (profile.text_support) {
          priceId = "price_1R9KvRP7PZBSVcUMcnvCdbBL";
        } else {
          priceId = "price_1R9KvRP7PZBSVcUMcnvCdbBL";
        }
        const data = await getPlanDetails(priceId);
        setPlanDetails(data);
      } catch (fetchError) {
        toast.error(error || "Failed to fetch plan details.");
      }
    };

    fetchPlanDetails();
  }, [
    profile.video_support,
    profile.audio_support,
    profile.text_support,
    getPlanDetails,
    error,
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe has not loaded yet.");
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
      let priceId;
      if (profile.video_support) {
        priceId = "price_1R59e6GWzmbPnUwmidW4eIXH"; // Video support
      } else if (profile.audio_support) {
        priceId = "price_audio_support_id"; // Replace with your audio support price ID
      } else if (profile.text_support) {
        priceId = "price_text_support_id"; // Replace with your text support price ID
      } else {
        priceId = "price_basic_id"; // Replace with your basic price ID
      }
      const data = await createSubscription(token.id, priceId);
      toast.success("Subscription successful!");
      navigate("/interface");
    } catch (fetchError) {
      toast.error(error || "Subscription failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!planDetails) {
    return <p>Loading plan details...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-12">
      <h2 className="text-2xl font-semibold mb-4 text-primary">
        Subscribe Now
      </h2>
      <p className="mb-4 text-primary">
        {profile.video_support
          ? "You've selected the premium plan with video support."
          : profile.audio_support
          ? "You've selected the plan with audio support."
          : profile.text_support
          ? "You've selected the plan with text support."
          : "You've selected the basic plan."}
      </p>

      <div className="mb-4">
        <h3 className="font-semibold text-primary">Plan Details:</h3>
        <p>Name: {planDetails.product.name}</p>
        <p>
          Amount: {planDetails.unit_amount / 100}{" "}
          {planDetails.currency.toUpperCase()}
        </p>
        <p>Interval: {planDetails.recurring.interval}</p>
      </div>

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
