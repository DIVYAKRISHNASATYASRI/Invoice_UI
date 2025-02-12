import React from "react";

export default function ImageUploader({ setImage }) {
  return (
    <input
      type="file"
      className="w-full p-2 border border-gray-300 rounded-md"
      accept="image/*"
      onChange={(e) => setImage(e.target.files[0])}
    />
  );
}
