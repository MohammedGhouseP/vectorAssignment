// /frontend/src/nodes/DateNode.js
import React, { useState } from "react";
import BaseNode from "./BaseNode";

export default function DateNode({ id, data }) {
  const [date, setDate] = useState(data.value || "");

  return (
    <BaseNode
      title="Date"
      icon="📅"
      inputs={[]}
      outputs={["dateVal"]}
      style={{ width: "200px" }}
    >
      <input
        type="date"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          data.onChange && data.onChange(e.target.value);
        }}
        className="
          w-full
          border border-gray-300
          rounded-md px-2 py-1
          text-sm
          focus:outline-none
          focus:ring-2 focus:ring-brandBlue
          border-2 border-gray-300
        "
      />
    </BaseNode>
  );
}
