import React from "react";
import InvoiceList from "./../components/Dashboard/InvoiceList";
import AnalyticsCharts from "./../components/Dashboard/AnalyticsCharts";
import ExportButtons from "./../components/Dashboard/ExportButtons";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Analytics Charts */}
      <AnalyticsCharts />

      {/* Export Buttons */}
      <ExportButtons />

      {/* Invoice List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Invoices</h2>
        <InvoiceList />
      </div>
    </div>
  );
}
