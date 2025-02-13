import React from "react";

export default function PromptInput({ prompt, setPrompt }) {
  return (
    <textarea
      className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows="3"
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      placeholder="Enter your prompt here..."
    />
  );
}
