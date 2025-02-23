import React, { useState } from "react";

export default function ProcessButton({ handleProcess }) {
  const [clicked, setClicked] = useState(false); // State to track if button is clicked
  const [isProcessing, setIsProcessing] = useState(false); // State to track the processing status

  // Handle click event
  const handleClick = () => {
    setClicked(true); // Update state to reflect button click
    setIsProcessing(true); // Set processing to true
    handleProcess(); // Call the parent handler (if provided)

    // Simulate a delay (e.g., API call) and reset after processing
    setTimeout(() => {
      setIsProcessing(false); // Reset processing state after a delay
    }, 5000); // You can adjust the timeout based on your needs
  };

  return (
    <div>
      <button
        className={`w-full py-2 text-white font-semibold rounded-md transition duration-300 
          ${isProcessing ? "bg-gray-600 cursor-wait" : "bg-blue-600 hover:bg-blue-700"}`}
        onClick={handleClick}
        disabled={isProcessing} // Disable button while processing
      >
        {isProcessing ? "Processing..." : "Validate Invoice"}
      </button>
    </div>
  );
}