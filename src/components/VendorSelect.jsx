import React from "react";

export default function VendorSelect({ vendors, selectedVendor, setSelectedVendor }) {
  return (
    <select
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={selectedVendor}
      onChange={(e) => setSelectedVendor(e.target.value)}
    >
      <option value="">Select a vendor</option>
      {vendors.map((vendor, index) => (
        <option key={index} value={vendor}>
          {vendor}
        </option>
      ))}
    </select>
  );
}
