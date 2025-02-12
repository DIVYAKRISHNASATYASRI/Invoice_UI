import React from "react";

export default function JsonDisplay({ jsonResponse }) {
  return (
    <pre className="p-4 bg-gray-100 rounded-md text-sm text-gray-700 border border-gray-300 overflow-auto">
      {jsonResponse ? JSON.stringify(jsonResponse, null, 2) : "No data yet..."}
    </pre>
  );
}
