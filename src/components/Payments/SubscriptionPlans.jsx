// src/pages/Payments/SubscriptionPlans.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const plans = [
  { id: "price_basic", name: "Basic Plan", price: 500, description: "Core features access" },
  { id: "price_pro", name: "Pro Plan", price: 1500, description: "Advanced features & support" },
  { id: "price_premium", name: "Premium Plan", price: 3000, description: "All features + priority support" },
];

export default function SubscriptionPlans() {
  const navigate = useNavigate();

  const handleSubscribe = (planId) => {
    navigate(`/checkout/${planId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Subscription Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-gray-600 mb-4">{plan.description}</p>
            <p className="text-2xl font-bold mb-4">${(plan.price / 100).toFixed(2)}</p>
            <button
              onClick={() => handleSubscribe(plan.id)}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
