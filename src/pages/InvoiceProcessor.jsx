import React, { useState, useEffect } from "react";
import axios from "axios";
import VendorSelect from "../components/VendorSelect";
import PromptInput from "../components/Prompt";
import ImageUploader from "../components/ImageUpload";
import JsonDisplay from "../components/Response";
import ProcessButton from "../components/Validate";
import Save from "../components/Save";

export default function InvoiceProcessor() {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState(null);

  // Fetch vendors list from backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/vendors")
      .then((response) => setVendors(response.data))
      .catch((error) => console.error("Error fetching vendors:", error));
  }, []);

  // Handle the image (or PDF) upload and text extraction
  const handleValidate = async () => {
  const formData = new FormData();
  formData.append("vendor", selectedVendor);
  formData.append("prompt", prompt);  // If no prompt is entered, it's passed as an empty string
  if (image) formData.append("image", image);

  try {
    const response = await axios.post("http://127.0.0.1:5000/validate", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setResponse(response.data); // Update the state with the response
  } catch (error) {
    console.error("Error during validation:", error);
    setResponse({ error: "Error during validation." });
  }
};


  return (
    <div className="flex h-screen p-6 bg-gradient-to-r from-gray-100 to-blue-50">
      {/* Left Column */}
      <div className="w-1/2 p-6 bg-white shadow-lg rounded-lg border border-gray-300">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Invoice Processor</h1>

        {/* Vendor Select */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Select Vendor</label>
          <VendorSelect
            vendors={vendors}
            selectedVendor={selectedVendor}
            setSelectedVendor={setSelectedVendor}
          />
        </div>

        {/* Prompt Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Enter Prompt</label>
          <PromptInput prompt={prompt} setPrompt={setPrompt} />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Upload Invoice</label>
          <ImageUploader setImage={setImage} />
        </div>

        {/* Process Button */}
        <ProcessButton handleProcess={handleValidate} />
      </div>

      {/* Right Column - Display Response */}
      <div className=" w-1/2 p-6 bg-white shadow-lg rounded-lg border border-gray-300 ml-4">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Response</h2>
        {response && <JsonDisplay jsonResponse={response} />}
      <div>
      <Save/>
      </div>
      </div>
    </div>
      
  );
}
