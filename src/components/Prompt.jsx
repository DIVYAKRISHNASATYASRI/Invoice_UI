import React from "react";
import CollapsiblePanel from "./CollapsiblePanel";

export default function PromptInput({ prompt, setPrompt }) {
  // Default prompt if there's no user input
  const defaultPrompt = "Read the invoice and return the item_code, item_description, upc, quantity, item_cost, discount, total_cost .... and return in JSON format";

  return (
    <div>
      <CollapsiblePanel title="Example Prompt">
        <p>{defaultPrompt}</p>
      </CollapsiblePanel>
      <textarea
        className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
        value={prompt || defaultPrompt} // Use the prompt prop or the default prompt if it's empty
        onChange={(e) => setPrompt(e.target.value)} // Update the prompt when user types
        placeholder="Enter your prompt here..."
      />
    </div>
  );
}