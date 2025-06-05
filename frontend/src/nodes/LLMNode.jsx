// /frontend/src/nodes/LLMNode.js
import React from "react";
import BaseNode from "./BaseNode";

export default function LLMNode({ id, data }) {
  // Two handles: “prompt” (input) and “response” (output)
  return (
    <BaseNode
      title="LLM"
      icon="🤖"
      inputs={["prompt"]}
      outputs={["response"]}
      style={{ width: "240px" }}
    >
      <div className="text-sm text-gray-600">
        {data.instruction || "Enter prompt text below:"}
      </div>
      <textarea
        value={data.promptText || ""}
        onChange={(e) => data.onChange && data.onChange(e.target.value)}
        className="
          mt-1
          w-full h-20
          border border-gray-300
          rounded-md px-2 py-1
          text-sm
          focus:outline-none
          focus:ring-2 focus:ring-brandBlue
          resize-none
        "
        placeholder="Type prompt..."
      />
    </BaseNode>
  );
}
