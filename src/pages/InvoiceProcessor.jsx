import React, { useState, useEffect } from "react";
import axios from "axios";
import VendorSelect from "../components/VendorSelect";
import PromptInput from "../components/Prompt";
import ImageUploader from "../components/ImageUpload";
import JsonDisplay from "../components/Response";
import ProcessButton from "../components/Validate";
import Save from "../components/Save";
import CollapsiblePanel from "../components/CollapsiblePanel";

export default function InvoiceProcessor({ setLoading, setToast }) {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://invoice-api-9xlf.onrender.com/vendors")
      .then(res => setVendors(res.data))
      .catch(err => setToast({ message: "Failed to fetch vendors", type: "error" }))
      .finally(() => setLoading(false));
  }, [setLoading, setToast]);

  const fetchPromptForVendor = (vendorId) => {
    const vendor = vendors.find(v => v.id === vendorId);
    if (vendor) setPrompt(vendor.prompt || "");
  };

  const handleValidate = async () => {
    if (!selectedVendor || !prompt || !image) {
      setToast({ message: "Select vendor, enter prompt, and upload an image", type: "warning" });
      return;
    }

    const formData = new FormData();
    formData.append("vendor", selectedVendor);
    formData.append("prompt", prompt);
    formData.append("image", image);

    try {
      setLoading(true);
      const res = await axios.post("https://invoice-api-9xlf.onrender.com/validate", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResponse(res.data);
      setToast({ message: "Invoice processed successfully!", type: "success" });
    } catch (err) {
      console.error("Error sending to backend:", err);
      setResponse({ error: "Error during processing" });
      setToast({ message: "Error processing invoice", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleVendorSelect = (vendorId) => {
    setSelectedVendor(vendorId);
    fetchPromptForVendor(vendorId);
  };

  return (
    <div className="flex h-screen p-6 bg-gradient-to-r from-gray-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Left Column */}
      <div className="w-1/2 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-300 dark:border-gray-700 transition-colors duration-300">
        <h1 className="text-2xl font-bold text-blue-700 dark:text-yellow-300 mb-6">Invoice Processor</h1>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Select Vendor</label>
          <VendorSelect
            vendors={vendors}
            selectedVendor={selectedVendor}
            onVendorSelect={handleVendorSelect}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Enter Prompt</label>
          <PromptInput prompt={prompt} setPrompt={setPrompt} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Upload Invoice</label>
          <ImageUploader setImage={setImage} />
        </div>

        <ProcessButton handleProcess={handleValidate} />
      </div>

      {/* Right Column */}
      <div className="w-1/2 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-300 dark:border-gray-700 ml-4 transition-colors duration-300">
        <h2 className="text-xl font-semibold text-blue-700 dark:text-yellow-300 mb-4">Response</h2>

        <CollapsiblePanel title="Example Response">
          <p className="text-gray-700 dark:text-gray-200">{`{
   "upc": "",
   "item_code": "",
   "description": "",
   "quantity": "",
   "item_cost": "",
   "discount": "",
   "total_cost": ""
}`}</p>
        </CollapsiblePanel>

        {response && <JsonDisplay jsonResponse={response} />}

        <div className="mt-4">
          <Save selectedVendor={selectedVendor} prompt={prompt} disabled={!response} setToast={setToast} />
        </div>
      </div>
    </div>
  );
}
