import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnalyticsCharts = () => {
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    axios.get("https://invoice-api-9xlf.onrender.com/analytics")
      .then((res) => setAnalyticsData(res.data))
      .catch((err) => console.error("Error fetching analytics:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Line Chart for Invoice Amount */}
      <div className="bg-white p-6 shadow rounded-2xl">
        <h2 className="text-xl font-bold mb-4">Invoice Amount Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#4F46E5" name="Total Amount" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart for Invoice Count */}
      <div className="bg-white p-6 shadow rounded-2xl">
        <h2 className="text-xl font-bold mb-4">Number of Invoices</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#10B981" name="Invoice Count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
