import React from "react";

// Pass validateResponse function from InvoiceProcessor
const ValidateResponse = ({ handleValidate }) => {
  return (
    <button
      onClick={handleValidate} // Trigger handleValidate when clicked
      className="absolute w-40 p-2 bg-green-500 text-white rounded-md hover:bg-green-600 mt-80"
    >
      Validate Response
    </button>
  );
};

export default ValidateResponse;