// /frontend/src/nodes/BaseNode.js
import React from "react";
import { Handle, Position } from "reactflow";

export default function BaseNode({
  title,
  icon = null,
  inputs = [],     // array of handle IDs (strings)
  outputs = [],    // array of handle IDs (strings)
  children,
  style = {},
}) {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg p-3 min-w-[180px] relative"
      style={style}
    >
      {/* Title + Icon */}
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-lg">{icon}</span>}
        <strong className="text-gray-800">{title}</strong>
      </div>

      {/* Render one target Handle per `inputs` (on the left) */}
      {inputs.map((id, idx) => (
        <Handle
          key={`in-${id}`}
          type="target"
          position={Position.Left}
          id={id}
          style={{
            top: 30 + idx * 20,
            background: "#3B82F6", // blue
            width: 10,
            height: 10,
            borderRadius: "50%",
          }}
        />
      ))}

      {/* Main content */}
      <div className="mb-2">{children}</div>

      {/* Render one source Handle per `outputs` (on the right) */}
      {outputs.map((id, idx) => (
        <Handle
          key={`out-${id}`}
          type="source"
          position={Position.Right}
          id={id}
          style={{
            top: 30 + idx * 20,
            background: "#10B981", // green
            width: 10,
            height: 10,
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
}
