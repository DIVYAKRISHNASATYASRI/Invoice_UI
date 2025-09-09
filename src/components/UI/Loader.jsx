import React from "react";

export default function Loader({ size = 50 }) {
  return (
    <div className="flex justify-center items-center h-full">
      <div
        className="border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
}
