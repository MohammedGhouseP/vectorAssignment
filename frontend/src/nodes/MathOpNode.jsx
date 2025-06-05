// /frontend/src/nodes/MathOpNode.js
import React from "react";
import BaseNode from "./BaseNode";

export default function MathOpNode({ id, data }) {
  // Two inputs: “a” and “b”, one output: “sum”
  return (
    <BaseNode
      title="Add"
      icon="➕"
      inputs={["a", "b"]}
      outputs={["sum"]}
      style={{ width: "200px" }}
    >
      <div className="text-sm text-gray-600">
        Adds inputs “a” and “b”
      </div>
    </BaseNode>
  );
}
