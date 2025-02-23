import React, { useState, useEffect } from "react";
import axios from "axios";
import VendorSelect from "../components/VendorSelect";
import PromptInput from "../components/Prompt";
import ImageUploader from "../components/ImageUpload";
import JsonDisplay from "../components/Response";
import ProcessButton from "../components/Validate";  // Process Button
import Save from "../components/Save";
import CollapsiblePanel from "../components/CollapsiblePanel";
import ValidateResponse from "../components/ValidateResponse";  // Validate Response Button

export default function InvoiceProcessor() {
  const [vendors, setVendors] = useState([]); // Store vendors
  const [selectedVendor, setSelectedVendor] = useState(""); // Store selected vendor
  const [prompt, setPrompt] = useState(""); // User prompt
  const [image, setImage] = useState(null); // Image/PDF to validate
  const [response, setResponse] = useState(null); // Response from the backend
  const [validationMessage, setValidationMessage] = useState(""); // Store validation result message
  const [isValid, setIsValid] = useState(false); // Track if validation is successful
  const [isValidationClicked, setIsValidationClicked] = useState(false); // Track if validation button is clicked
  const [validationData, setValidationData] = useState(null); // Store validation response for later use

  // Fetch vendors list from the backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/vendors")
      .then((response) => setVendors(response.data))
      .catch((error) => console.error("Error fetching vendors:", error));
  }, []);

  // Fetch the prompt for a selected vendor
  const fetchPromptForVendor = (vendorId) => {
    const selectedVendorData = vendors.find((vendor) => vendor.id === vendorId);
    if (selectedVendorData) {
      setPrompt(selectedVendorData.prompt); // Automatically set the prompt for the selected vendor
    }
  };

  // Handle the image (or PDF) upload and text extraction (for actual process)
  const handleValidate = async () => {
    // Validate vendor and prompt input before proceeding
    if (!selectedVendor || !prompt || !image) {
      setValidationMessage("Please select a vendor, provide a prompt, and upload an image.");
      setIsValid(false); // Set validation to false if inputs are missing
      return;
    }

    const formData = new FormData();
    formData.append("vendor", selectedVendor); // Vendor ID
    formData.append("prompt", prompt); // User provided prompt
    formData.append("image", image); // File to validate

    try {
      const response = await axios.post("http://127.0.0.1:5000/validate", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Convert the 'Data' string into a JavaScript object
      const parsedData = JSON.parse(response.data.Data);

      // Now, validate by comparing the keys with the example response
      const expectedKeys = [
        "item_code", "item_description", "upc", "quantity", "item_cost", "discount", "total_cost"
      ];

      const missingKeys = new Set(); // Using a Set to avoid duplicates

      // Check if all expected keys exist in the parsed response
      parsedData.forEach(item => {
        expectedKeys.forEach(key => {
          if (!item.hasOwnProperty(key)) {
            missingKeys.add(key); // Add missing key to the set (no duplicates)
          }
        });
      });

      if (missingKeys.size > 0) {
        setValidationMessage(`Missing keys: ${Array.from(missingKeys).join(', ')}`);
        setIsValid(false); // Set validation to false if there are missing keys
      } else {
        setValidationMessage("Response is valid! All keys are present.");
        setIsValid(true); // Set validation to true if all keys are present
      }

      // Set the response for frontend display (keep it in object format)
      setResponse(response.data);  // Keep original format for display

    } catch (error) {
      console.error("Error during validation:", error);
      setResponse({ error: "Error during validation." });
      setValidationMessage("Error during validation.");
      setIsValid(false); // Set validation to false in case of an error
    }
  };

  // Callback function to handle vendor selection
  const handleVendorSelect = (vendorId) => {
    setSelectedVendor(vendorId);
    fetchPromptForVendor(vendorId); // Fetch the prompt for the selected vendor
  };

  // Separate validation handler for Validate Response button
  const handleValidateResponse = () => {
    if (response) {
      // Extract missing keys or other validation-specific logic
      const expectedKeys = [
        "item_code", "item_description", "upc", "quantity", "item_cost", "discount", "total_cost"
      ];

      const missingKeys = new Set(); // Using a Set to avoid duplicates

      // Validate missing keys in the response
      const parsedData = JSON.parse(response.Data); // Assuming the response is structured like this
      parsedData.forEach(item => {
        expectedKeys.forEach(key => {
          if (!item.hasOwnProperty(key)) {
            missingKeys.add(key); // Add missing key to the set (no duplicates)
          }
        });
      });

      setValidationData({
        valid: missingKeys.size === 0,
        message: missingKeys.size > 0 ? `Missing keys: ${Array.from(missingKeys).join(', ')}` : "Response is valid! All keys are present."
      });

      setIsValid(missingKeys.size === 0); // Enable Save button if no missing keys
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
            onVendorSelect={handleVendorSelect} // Pass callback to VendorSelect
          />
        </div>

        {/* Prompt Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Enter Prompt</label>
          {/* If a vendor is selected, display their default prompt */}
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
      <div className="w-1/2 p-6 bg-white shadow-lg rounded-lg border border-gray-300 ml-4">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Response</h2>
        {/* Collapsible Panel at the top */}
        <CollapsiblePanel title="Example Response">
          <p>{`{
   "upc": "",
   "item_code" : "",
   "description" : "",
   "quantity" : "",
   "item_cost" : "",
   "discount" : "",
   "total_cost" : ""
}`}</p>
        </CollapsiblePanel>
        
        {/* Display the response */}
        {response && <JsonDisplay jsonResponse={response} />}

        {/* Display Validation Message Below Response */}
        {validationMessage && (
          <div className={`absolute mt-75 text-sm ${isValid ? 'text-green-500' : 'text-red-500'}`}>
            <strong>Validation Result:</strong> {validationMessage}
          </div>
        )}

        {/* Validation Response */}
        {validationData && validationData.message && (
          <div className={`absolute mt-75 text-sm ${validationData.valid ? 'text-green-500' : 'text-red-500'}`}>
            <strong>Validation Result:</strong> {validationData.message}
          </div>
        )}

        <div className="flex justify-between mt-auto">
          {/* Validate Response Button */}
          <ValidateResponse handleValidateResponse={handleValidateResponse} />

          {/* Save Button - Disabled if validation fails */}
          <Save selectedVendor={selectedVendor} prompt={prompt} disabled={!isValid} />
        </div>
      </div>
    </div>
  );
}