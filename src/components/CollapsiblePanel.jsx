import React, { useState } from 'react';

function CollapsiblePanel({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the panel open/close
  const togglePanel = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div className="w-full p-4 bg-gray-200 shadow-lg rounded-lg mb-4">
      {/* Button to toggle the panel */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={togglePanel}
      >
        <h3 className="text-l font-semibold text-gray-700">{title}</h3>
        <span className="text-l">{isOpen ? '-' : '+'}</span>
      </div>

      {/* Panel content (hidden when closed) */}
      {isOpen && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
}

export default CollapsiblePanel;