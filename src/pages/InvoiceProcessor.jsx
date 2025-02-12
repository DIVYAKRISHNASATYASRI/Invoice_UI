import React, { useState } from "react";
import VendorSelect from "../components/VendorSelect";
import PromptInput from "../components/PromptInput";
import ImageUploader from "../components/ImageUploader";
import JsonDisplay from "../components/JsonDisplay";
import ProcessButton from "../components/ProcessButton";

export default function InvoiceProcessor() {
  const [selectedVendor, setSelectedVendor] = useState("");
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [jsonResponse, setJsonResponse] = useState(null);

  const vendors = ["Vendor A", "Vendor B", "Vendor C"]; // Dummy data

  const handleProcess = () => {
    setJsonResponse({
      invoiceNumber: "INV-12345",
      vendor: selectedVendor,
      totalAmount: "$500.00",
      date: "2024-02-11",
      status: "Processed",
    });
  };

  return (
    <div className="flex h-screen p-6 bg-gradient-to-r from-gray-100 to-blue-50">
      {/* Left Column */}
      <div className="w-1/2 p-6 bg-white shadow-lg rounded-lg border border-gray-300">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Invoice Processor</h1>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Select Vendor</label>
          <VendorSelect vendors={vendors} selectedVendor={selectedVendor} setSelectedVendor={setSelectedVendor} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Enter Prompt</label>
          <PromptInput prompt={prompt} setPrompt={setPrompt} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Upload Invoice</label>
          <ImageUploader setImage={setImage} />
        </div>

        <ProcessButton handleProcess={handleProcess} />
      </div>

      {/* Right Column */}
      <div className="w-1/2 p-6 bg-white shadow-lg rounded-lg border border-gray-300 ml-4">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Extracted Data</h2>
        <JsonDisplay jsonResponse={jsonResponse} />
      </div>
    </div>
  );
}
