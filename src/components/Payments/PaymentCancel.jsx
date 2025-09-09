// src/pages/Payments/PaymentCancel.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-red-700">❌ Payment Cancelled</h1>
      <p className="mb-6 text-red-600">Your payment was not completed. You can try again.</p>
      <button
        onClick={() => navigate("/subscriptions")}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Back to Plans
      </button>
    </div>
  );
}
