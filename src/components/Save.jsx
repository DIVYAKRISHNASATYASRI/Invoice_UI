import React from "react";
import axios from "axios";

function Save({ selectedVendor, prompt,disabled }) {
  const handleSavePrompt = async () => {
    try {
      // Check if vendor and prompt are both present
      if (!selectedVendor || !prompt) {
        alert("Please select a vendor and enter a prompt.");
        return;
      }

      // Send the selected vendor's ID and the prompt to the backend
      const response = await axios.post("http://127.0.0.1:5000/add_prompt", {
        vendor_id: selectedVendor,  // Send the selected vendor's ID
        prompt: prompt,            // The prompt to be saved
      });

      if (response.status === 201) {
        alert("Prompt saved successfully!");
      } else {
        alert("Error saving prompt");
      }
    } catch (error) {
      console.error("Error saving prompt:", error);
      alert("Error saving prompt.");
    }
  };

  return (
    <div>
      <button
        className={`w-40 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-80 ml-90 ${disabled ? "opacity-50 cursor-not-allowed":""}`}
        onClick={handleSavePrompt}
        disabled={disabled}
      >
        Save Prompt
      </button>
    </div>
  );
}

export default Save;