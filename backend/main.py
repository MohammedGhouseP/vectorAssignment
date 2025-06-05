from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
from collections import deque

app = FastAPI()

# Allow CORS from React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000"],  # adjust if your frontend runs elsewhere
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic schemas
class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class PipelinePayload(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.post("/pipelines/parse")
def parse_pipeline(payload: PipelinePayload) -> Dict[str, object]:
    nodes = payload.nodes
    edges = payload.edges

    # 1) Count nodes & edges
    num_nodes = len(nodes)
    num_edges = len(edges)

    # Build adjacency & in-degree map
    in_degree = {node.id: 0 for node in nodes}
    adj = {node.id: [] for node in nodes}

    for edge in edges:
        src = edge.source
        tgt = edge.target
        if src not in in_degree or tgt not in in_degree:
            raise HTTPException(
                status_code=400,
                detail=f"Edge refers to unknown node: {src} → {tgt}",
            )
        adj[src].append(tgt)
        in_degree[tgt] += 1

    # Kahn’s algorithm to detect cycles
    queue = deque([nid for nid, deg in in_degree.items() if deg == 0])
    visited = 0

    while queue:
        curr = queue.popleft()
        visited += 1
        for nei in adj[curr]:
            in_degree[nei] -= 1
            if in_degree[nei] == 0:
                queue.append(nei)

    is_dag = (visited == num_nodes)

    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}
