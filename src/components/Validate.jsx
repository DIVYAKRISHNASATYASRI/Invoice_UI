import React from "react";

export default function ProcessButton({ handleProcess }) {
  return (
    <button
      className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
      onClick={handleProcess}
    >
      Validate Invoice
    </button>
  );
}
