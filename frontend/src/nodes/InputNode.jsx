// /frontend/src/nodes/InputNode.js
import React from "react";
import BaseNode from "./BaseNode";

export default function InputNode({ id, data }) {
  // This node has one source handle named “output”
  return (
    <BaseNode
      title="Input"
      icon="🔌"
      inputs={[]}
      outputs={["output"]}
      style={{ width: "200px" }}
    >
      <div className="text-sm text-gray-600">
        {data.label || "Enter a value and pass to next node."}
      </div>
      <input
        type="text"
        value={data.value || ""}
        onChange={(e) => data.onChange && data.onChange(e.target.value)}
        className="
          mt-1
          w-full
          border border-gray-300
          rounded-md px-2 py-1
          text-sm
          focus:outline-none
          focus:ring-2 focus:ring-brandBlue
        "
      />
    </BaseNode>
  );
}
