import React from "react";

export default function InvoiceCard({ invoice }) {
  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition">
      <h3 className="font-bold text-lg">{invoice.vendor}</h3>
      <p className="text-gray-600">Amount: ₹{invoice.amount}</p>
      <p className="text-gray-600">Date: {new Date(invoice.date).toLocaleDateString()}</p>
      <p className={`mt-2 px-2 py-1 text-sm rounded w-fit ${
        invoice.status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
      }`}>
        {invoice.status}
      </p>
    </div>
  );
}
