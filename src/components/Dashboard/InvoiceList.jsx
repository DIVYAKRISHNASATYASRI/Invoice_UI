import React, { useEffect, useState } from "react";
import api from "./../services/api";
import InvoiceCard from "./InvoiceCard";

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await api.get("/invoices");
      setInvoices(res.data);
    } catch (err) {
      console.error("Error fetching invoices:", err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {invoices.length > 0 ? (
        invoices.map((inv) => <InvoiceCard key={inv.id} invoice={inv} />)
      ) : (
        <p className="text-gray-500">No invoices found</p>
      )}
    </div>
  );
}
