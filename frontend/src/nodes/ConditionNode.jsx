// /frontend/src/nodes/ConditionNode.js
import React from "react";
import BaseNode from "./BaseNode";

export default function ConditionNode({ id, data }) {
  // Three handles: “in”, “true”, “false”
  return (
    <>
    
    <BaseNode
      title="Condition"
      icon="❓"
      inputs={["in"]}
      outputs={["true", "false"]}
      style={{ width: "220px" }}
    >
      <div className="text-sm text-gray-600">
        Splits input into “true” or “false”
      </div>
    </BaseNode>
    </>
  );
}
