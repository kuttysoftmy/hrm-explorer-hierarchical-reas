# HRM-Explorer (Hierarchical Reasoning Debugger & Visualizer)

HRM-Explorer is an interactive, premium visual development environment and observability dashboard designed specifically for the Hierarchical Reasoning Model (HRM). It plugs into the model's multi-timescale execution lifecycle to map out decision trees, high-level/low-level task splits, and timescale transitions in real-time.

## Features
- **Interactive Reasoning Graph**: Built with React Flow. Automatically groups nodes by Hierarchical Level (Strategic, Tactical, Operational).
- **Real-Time Execution Simulator**: Simulates active reasoning chains, model speeds, and node state transitions (`idle` ➔ `running` ➔ `paused/HITL` ➔ `completed` / `failed`).
- **Timescale & Latency Profiling**: Visual representation of computational footprint across strategic, tactical, and execution layers.
- **Human-in-the-Loop (HITL) Injection**: Pause executions, modify parameters, inject synthetic prompts directly into running tasks, and resume control flow.
- **Console Log Stream**: Live feed simulating raw WS frames directly from the HRM execution runtime.

## Technology Stack
- React
- Tailwind CSS
- React Flow (for high-fidelity visual graph visualization)
- Lucide React (for developers-focused tooling icons)

## Execution Controls
- Use the **Top Controller** to Play, Pause, Step, change simulation speed, or trigger a full reset.
- Click on any node on the graph to inspect its parameters, state transitions, prompt templates, and outputs.
- Toggle presets (e.g., Code Generation, Market Analysis, Multi-Agent System) in the left panel to change tasks.