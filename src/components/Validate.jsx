import React, { useState } from "react";

export default function ProcessButton({ handleProcess }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = async () => {
    if (!handleProcess) return;

    setIsProcessing(true);
    try {
      await handleProcess(); // wait for backend
    } catch (err) {
      console.error("Error in handleProcess:", err);
    } finally {
      setIsProcessing(false); // always reset
    }
  };

  return (
    <button
      className={`w-full py-2 text-white font-semibold rounded-md transition duration-300
        ${isProcessing ? "bg-gray-600 cursor-wait" : "bg-blue-600 hover:bg-blue-700"}`}
      onClick={handleClick}
      type="button" // ensure not submitting a form by default
      disabled={isProcessing} // <--- CHANGE THIS LINE
    >
      {isProcessing ? "Processing..." : "Validate Invoice"}
    </button>
  );
}