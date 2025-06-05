// /frontend/src/nodes/TextNode.js
import React, { useState, useEffect, useRef, useMemo } from "react";
import BaseNode from "./BaseNode";
import { Position } from "reactflow";

export default function TextNode({ id, data }) {
  // Initialize with any existing data.value
  const [text, setText] = useState(data?.value || "");
  const textareaRef = useRef(null);

  // 1) Auto‐resize: set height to scrollHeight on each change
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto"; // reset height
    ta.style.height = ta.scrollHeight + "px";
  }, [text]);

  // 2) Parse every {{ varName }} to create an input handle
  const variableNames = useMemo(() => {
    // Valid JS variable: starts with letter, underscore, or $, then letters/numbers/_/$ 
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const setVars = new Set();
    let match;
    while ((match = regex.exec(text)) !== null) {
      setVars.add(match[1]);
    }
    return Array.from(setVars);
  }, [text]);

  // The left handles correspond to each unique variable
  const inputs = variableNames;

  return (
    <BaseNode
      title="Text"
      icon="📝"
      inputs={inputs}
      outputs={[]}
      style={{
        width: "260px", // fixed width; height auto‐expands below
        backgroundColor: "#ffffff",
      }}
    >
      {/* Auto‐resizing textarea */}
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          data.onChange && data.onChange(e.target.value);
        }}
        placeholder="Type… {{varName}} → new handle"
        className="
          w-full
          resize-none
          overflow-hidden
          border border-gray-300
          rounded-md px-2 py-1
          text-sm
          focus:outline-none
          focus:ring-2 focus:ring-brandBlue
          "
        style={{ minHeight: "40px", fontFamily: "inherit" }}
      />
      {/* Show parsed variable tags (optional) */}
      {variableNames.length > 0 && (
        <div className="mt-2 text-xs text-gray-500">
          Vars:{" "}
          {variableNames.map((v) => (
            <span
              key={v}
              className="bg-brandBlue text-white px-1 rounded mr-1"
            >
              {v}
            </span>
          ))}
        </div>
      )}
    </BaseNode>
  );
}
