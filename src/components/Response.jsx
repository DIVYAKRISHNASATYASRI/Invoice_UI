import React, { useState, useEffect } from "react";

export default function JsonDisplay({ jsonResponse }) {
  const [isMobile, setIsMobile] = useState(false);

  // Detect if the screen size is small (mobile)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile size threshold
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Listen for resize events

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  return (
    <pre
      style={{
        padding: "16px",
        backgroundColor: "#f3f4f6",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        maxHeight: "400px", // You can change the height to your desired value
        overflow: "auto", // Enables both horizontal and vertical scrolling
        fontSize: isMobile ? "12px" : "14px", // Dynamic font size for mobile
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        width: "100%", // Ensures it uses full width of the container
        boxSizing: "border-box", // Prevents padding from affecting width
      }}
    >
      {jsonResponse ? JSON.stringify(jsonResponse, null, 2) : "No data yet..."}
    </pre>
  );
}
