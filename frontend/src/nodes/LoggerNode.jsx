// /frontend/src/nodes/LoggerNode.js
import React from "react";
import BaseNode from "./BaseNode";

export default function LoggerNode({ id, data }) {
  // One input: “logIn” (logs whatever it receives)
  return (
    <>
      <BaseNode
        title="Logger"
        icon="📝"
        inputs={["logIn"]}
        outputs={[]}
        style={{ width: "180px" }}
      >
        <div className="text-sm text-gray-600">
          Logs incoming value to console
        </div>
      </BaseNode>
    </>
  );
}
