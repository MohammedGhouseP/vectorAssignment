// /frontend/src/submit.js

/**
 * POSTs the given nodes & edges to FastAPI /pipelines/parse,
 * then alerts the returned summary (num_nodes, num_edges, is_dag).
 *
 * @param {Array} nodes – React Flow nodes (each with an `id`)
 * @param {Array} edges – React Flow edges (each with `source`, `target`)
 */
export default function submitPipeline(nodes, edges) {
  fetch("http://localhost:8000/pipelines/parse", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nodes, edges }),
  })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => {
      const { num_nodes, num_edges, is_dag } = data;
      alert(
        `Pipeline summary:\n` +
          `• Nodes: ${num_nodes}\n` +
          `• Edges: ${num_edges}\n` +
          `• Is DAG?: ${is_dag ? "Yes" : "No"}`
      );
    })
    .catch((err) => {
      console.error("Submit pipeline error:", err);
      alert("Error submitting pipeline—check console for details.");
    });
}
