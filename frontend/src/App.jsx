// /frontend/src/App.js
import React, { useState, useCallback } from "react";
import ReactFlow, { ReactFlowProvider } from "reactflow";
import TextNode from "./nodes/TextNode";
import InputNode from "./nodes/InputNode";
import OutputNode from "./nodes/OutputNode";
import LLMNode from "./nodes/LLMNode";
import NumberInputNode from "./nodes/NumberInputNode";
import MathOpNode from "./nodes/MathOpNode";
import ConditionNode from "./nodes/ConditionNode";
import DateNode from "./nodes/DateNode";
import LoggerNode from "./nodes/LoggerNode";
import "reactflow/dist/style.css";

const nodeTypes = {
  textNode: TextNode,
  inputNode: InputNode,
  outputNode: OutputNode,
  llmNode: LLMNode,
  numberInputNode: NumberInputNode,
  mathOpNode: MathOpNode,
  conditionNode: ConditionNode,
  dateNode: DateNode,
  loggerNode: LoggerNode,
};

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // Track API error message (null if no error)
  const [apiError, setApiError] = useState(null);

  /**
   * When clicked, send nodes+edges to FastAPI.
   * On success: show an alert with summary.
   * On failure: set `apiError` to a string, which will render below.
   */
  const handleSubmit = useCallback(() => {
    // Clear any previous error
    setApiError(null);

    fetch("http://localhost:8000/pipelines/parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nodes, edges }),
    })
      .then((res) => {
        if (!res.ok) {
          // If you want to see the status code in your error message:
          throw new Error(`Status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const { num_nodes, num_edges, is_dag } = data;
        // On success, you still show an alert (or you could render this inline if you prefer)
        alert(
          `Pipeline summary:\n` +
            `• Nodes: ${num_nodes}\n` +
            `• Edges: ${num_edges}\n` +
            `• Is DAG?: ${is_dag ? "Yes" : "No"}`
        );
      })
      .catch((err) => {
        console.error("Submit pipeline error:", err);
        // Instead of alerting the whole page, set a local error state
        setApiError("Unable to submit pipeline. Please try again later.");
      });
  }, [nodes, edges]);

  return (
    <ReactFlowProvider>
      <div className="h-screen flex flex-col">
        {/* ─────── React Flow Canvas ─────── */}
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={setNodes}
            onEdgesChange={setEdges}
            nodeTypes={nodeTypes}
            fitView
          />
        </div>

        {/* ─────── Submit Panel (Footer) ─────── */}
        <div className="p-4 bg-white border-t">
          <button
            className="
              px-4 py-2
              bg-blue-500
              text-white
              rounded-md
              hover:bg-blue-700
              focus:outline-none focus:ring-2 focus:ring-blue-600
            "
            onClick={handleSubmit}
          >
            Submit Pipeline
          </button>

          {/* 
            Only render this <div> if apiError is non-null.
            It will appear just below the button, not replacing the entire page.
          */}
          {apiError && (
            <div className="mt-2 text-sm text-red-600">
              {apiError}
            </div>
          )}
        </div>
      </div>
    </ReactFlowProvider>
  );
}
