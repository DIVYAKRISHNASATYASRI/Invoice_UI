import React from "react";
import api from "./../services/api";

export default function ExportButtons() {
  const handleExport = async (type) => {
    try {
      const res = await api.get(`/export/${type}`, { responseType: "blob" });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoices.${type}`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Error exporting invoices:", err);
    }
  };

  return (
    <div className="flex gap-4 mt-4">
      <button onClick={() => handleExport("csv")} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Export CSV
      </button>
      <button onClick={() => handleExport("pdf")} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        Export PDF
      </button>
    </div>
  );
}
