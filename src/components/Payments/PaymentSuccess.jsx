// src/pages/Payments/PaymentSuccess.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-green-800">🎉 Payment Successful!</h1>
      <p className="mb-6 text-green-700">Thank you for subscribing. Your subscription is now active.</p>
      <button
        onClick={() => navigate("/dashboard")}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
