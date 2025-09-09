import React, { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";

  return (
    <div
      className={`${bgColor} text-white px-4 py-2 rounded shadow fixed top-4 right-4 z-50`}
    >
      {message}
    </div>
  );
}
