// /frontend/src/nodes/NumberInputNode.js
import React from "react";
import BaseNode from "./BaseNode";

export default function NumberInputNode({ id, data }) {
  return (
    <BaseNode
      title="Number In"
      icon="🔢"
      inputs={[]}
      outputs={["num"]}
      style={{ width: "180px" }}
    >
      <input
        type="number"
        value={data.value || ""}
        onChange={(e) => data.onChange && data.onChange(e.target.value)}
        className="
          w-full
          border border-gray-300
          rounded-md px-2 py-1
          text-base
          focus:outline-none
          focus:ring-2 focus:ring-brandBlue
        "
        placeholder="Enter a number"
      />
    </BaseNode>
  );
}
