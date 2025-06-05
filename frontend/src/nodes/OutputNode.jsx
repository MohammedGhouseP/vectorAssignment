// /frontend/src/nodes/OutputNode.js
import React from "react";
import BaseNode from "./BaseNode";

export default function OutputNode({ id, data }) {
  // This node has one target handle named “input”
  return (
    <BaseNode
      title="Output"
      icon="📤"
      inputs={["input"]}
      outputs={[]}
      style={{ width: "180px" }}
    >
      <div className="text-sm text-gray-600">
        {data.text || "Final output will show here."}
      </div>
    </BaseNode>
  );
}
