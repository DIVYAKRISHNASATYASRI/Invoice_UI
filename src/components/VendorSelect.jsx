import React, { useState, useEffect } from 'react';

export default function VendorSelect() {
  const [vendors, setVendors] = useState([]);  // List of all vendors
  const [selectedVendor, setSelectedVendor] = useState('');  // Selected vendor's ID
  const [vendorInput, setVendorInput] = useState('');  // Vendor input value
  const [isNewVendor, setIsNewVendor] = useState(true);  // Flag to check if it's a new vendor
  const [filteredVendors, setFilteredVendors] = useState([]);  // Vendors that match input

  // Fetch the vendor list from the server
  const fetchVendors = async () => {
    try {
      const response = await fetch('http://localhost:5000/vendors');
      const data = await response.json();
      setVendors(data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  // Handle changes in the vendor input field
  const handleVendorChange = (e) => {
    const inputValue = e.target.value;
    setVendorInput(inputValue);

    if (inputValue.trim() === '') {
      // If input is cleared, reset filtered vendors and treat it as a new vendor
      setFilteredVendors([]);
      setIsNewVendor(true);
    } else {
      // Filter vendors that match the input
      const matchedVendors = vendors.filter((vendor) =>
        vendor.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredVendors(matchedVendors);
      setIsNewVendor(matchedVendors.length === 0); // If no matches, it's a new vendor
    }
  };

  // Handle the selection of an existing vendor from the dropdown
  const handleVendorSelect = (vendor) => {
    setVendorInput(vendor.name); // Set the input to the selected vendor's name
    setSelectedVendor(vendor.id); // Set the selected vendor ID
    setFilteredVendors([]); // Clear the dropdown list after selection
    setIsNewVendor(false); // It's an existing vendor
  };

  // Handle adding a new vendor to the list
  const handleAddVendor = async () => {
    if (!isNewVendor || vendorInput.trim() === '') {
      alert('Please type a valid new vendor name');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/add_vendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: vendorInput }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Vendor added successfully!');
        setVendorInput('');  // Clear input field
        fetchVendors();  // Refresh the vendor list
        setIsNewVendor(false);  // Reset to false as it's added
      } else {
        alert(data.error || 'Error adding vendor');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the vendor');
    }
  };

  return (
    <div className="relative flex items-center space-x-4 w-full">
      {/* Input field */}
      <input
        type="text"
        value={vendorInput}
        onChange={handleVendorChange}
        placeholder="Enter vendor name"
        className="p-2 border border-gray-300 rounded-md flex-1"
      />

      {/* Always visible "Add Vendor" button */}
      <button
        onClick={handleAddVendor}
        className="w-40 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Vendor
      </button>

      {/* Show the filtered vendor list as a dropdown below the input */}
      {filteredVendors.length > 0 && (
        <ul className="absolute w-full mt-1 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md z-10">
          {filteredVendors.map((vendor) => (
            <li
              key={vendor.id}
              className="p-2 cursor-pointer hover:bg-blue-100"
              onClick={() => handleVendorSelect(vendor)}
            >
              {vendor.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
