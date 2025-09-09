// src/pages/Payments/StripeCheckout.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function StripeCheckout() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const createCheckoutSession = async () => {
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:5000/create-checkout-session", { planId });
        const { url } = response.data;
        window.location.href = url; // Redirect to Stripe checkout
      } catch (error) {
        console.error("Error creating checkout session:", error);
        setLoading(false);
        alert("Failed to initiate payment. Try again.");
      }
    };

    createCheckoutSession();
  }, [planId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      {loading ? (
        <p className="text-xl font-semibold">Redirecting to payment...</p>
      ) : (
        <button
          onClick={() => navigate("/subscriptions")}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Back to Plans
        </button>
      )}
    </div>
  );
}
