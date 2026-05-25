import React, { useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  TrendingUp,
  Clock,
  Cpu,
  Sliders,
  AlertCircle,
  CheckCircle,
  Play
} from 'lucide-react';

// Custom Nodes reflecting HRM Reasoning Levels
const StrategicNode = ({ data, selected }) => (
  <div className={`p-4 rounded-xl border bg-slate-900 w-72 transition-all ${
    selected ? 'border-purple-500 shadow-neon-purple' : 'border-purple-900/50 hover:border-purple-600'
  }`}>
    <div className="flex justify-between items-start mb-2">
      <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
        {data.layer}
      </span>
      <div className="flex items-center gap-1.5">
        <Clock className="w-3 h-3 text-purple-400" />
        <span className="text-[9px] font-mono text-slate-400">{data.timescale}</span>
      </div>
    </div>
    <h3 className="text-sm font-semibold text-slate-100 tracking-tight">{data.label}</h3>
    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{data.description}</p>

    <div className="mt-3 space-y-2">
      <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
        <span>Tokens: <strong className="text-slate-200">{data.metrics.tokens}</strong></span>
        <span>Latency: <strong className="text-slate-200">{data.metrics.latency}</strong></span>
      </div>
      
      {/* Progress & Status Indicator */}
      <div className="flex items-center gap-2 mt-2">
        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden border border-slate-700">
          <div 
            className={`h-full bg-purple-500 transition-all duration-300 ${data.status === 'running' ? 'animate-pulse' : ''}`}
            style={{ width: `${data.progress}%` }}
          />
        </div>
        <span className={`text-[9px] font-mono uppercase font-bold ${
          data.status === 'running' ? 'text-purple-400 animate-pulse-fast' :
          data.status === 'completed' ? 'text-emerald-400' :
          data.status === 'paused' ? 'text-amber-400' : 'text-slate-500'
        }`}>
          {data.status}
        </span>
      </div>
    </div>
    <Handle type="source" position={Position.Bottom} className="!bg-purple-500" />
  </div>
);

const PlanningNode = ({ data, selected }) => (
  <div className={`p-4 rounded-xl border bg-slate-900 w-72 transition-all ${
    selected ? 'border-blue-500 shadow-neon-blue' : 'border-blue-900/50 hover:border-blue-600'
  }`}>
    <div className="flex justify-between items-start mb-2">
      <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
        {data.layer}
      </span>
      <div className="flex items-center gap-1.5">
        <Clock className="w-3 h-3 text-blue-400" />
        <span className="text-[9px] font-mono text-slate-400">{data.timescale}</span>
      </div>
    </div>
    <h3 className="text-sm font-semibold text-slate-100 tracking-tight">{data.label}</h3>
    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{data.description}</p>

    <div className="mt-3 space-y-2">
      <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
        <span>Tokens: <strong className="text-slate-200">{data.metrics.tokens}</strong></span>
        <span>Latency: <strong className="text-slate-200">{data.metrics.latency}</strong></span>
      </div>
      
      <div className="flex items-center gap-2 mt-2">
        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden border border-slate-700">
          <div 
            className={`h-full bg-blue-500 transition-all duration-300 ${data.status === 'running' ? 'animate-pulse' : ''}`}
            style={{ width: `${data.progress}%` }}
          />
        </div>
        <span className={`text-[9px] font-mono uppercase font-bold ${
          data.status === 'running' ? 'text-blue-400 animate-pulse-fast' :
          data.status === 'completed' ? 'text-emerald-400' :
          data.status === 'paused' ? 'text-amber-400' : 'text-slate-500'
        }`}>
          {data.status}
        </span>
      </div>
    </div>
    <Handle type="target" position={Position.Top} className="!bg-blue-500" />
    <Handle type="source" position={Position.Bottom} className="!bg-blue-500" />
  </div>
);

const ExecutionNode = ({ data, selected }) => (
  <div className={`p-4 rounded-xl border bg-slate-900 w-72 transition-all ${
    selected ? 'border-emerald-500 shadow-neon-emerald' : 'border-slate-800 hover:border-slate-700'
  } ${data.status === 'paused' ? 'border-amber-500/80 shadow-neon-amber' : ''}`}>
    <div className="flex justify-between items-start mb-2">
      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
        data.status === 'paused' 
          ? 'text-amber-400 bg-amber-950/50 border-amber-800' 
          : 'text-emerald-400 bg-emerald-950/50 border-emerald-900'
      }`}>
        {data.layer}
      </span>
      <div className="flex items-center gap-1.5">
        <Cpu className="w-3 h-3 text-emerald-400" />
        <span className="text-[9px] font-mono text-slate-400">{data.timescale}</span>
      </div>
    </div>
    <h3 className="text-sm font-semibold text-slate-100 tracking-tight flex items-center gap-1.5">
      {data.status === 'paused' && <AlertCircle className="w-4 h-4 text-amber-500 animate-pulse" />}
      {data.label}
    </h3>
    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{data.description}</p>

    <div className="mt-3 space-y-2">
      <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
        <span>Tokens: <strong className="text-slate-200">{data.metrics.tokens}</strong></span>
        <span>Latency: <strong className="text-slate-200">{data.metrics.latency}</strong></span>
      </div>
      
      <div className="flex items-center gap-2 mt-2">
        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden border border-slate-700">
          <div 
            className={`h-full transition-all duration-300 ${
              data.status === 'paused' ? 'bg-amber-500' : 'bg-emerald-500'
            } ${data.status === 'running' ? 'animate-pulse' : ''}`}
            style={{ width: `${data.progress}%` }}
          />
        </div>
        <span className={`text-[9px] font-mono uppercase font-bold ${
          data.status === 'running' ? 'text-emerald-400 animate-pulse-fast' :
          data.status === 'completed' ? 'text-emerald-400' :
          data.status === 'paused' ? 'text-amber-500 animate-pulse' : 'text-slate-500'
        }`}>
          {data.status}
        </span>
      </div>
    </div>
    <Handle type="target" position={Position.Top} className="!bg-emerald-500" />
  </div>
);

const nodeTypes = {
  strategicNode: StrategicNode,
  planningNode: PlanningNode,
  executionNode: ExecutionNode
};

export default function FlowGraph({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onNodeClick
}) {
  return (
    <div className="w-full h-full bg-slate-950 relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={(e, node) => onNodeClick(node)}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.5}
        maxZoom={1.5}
      >
        <Background color="#334155" gap={16} size={1} />
        <Controls className="!bg-slate-900 !border-slate-800 !text-slate-300 [&>button]:border-slate-800" />
      </ReactFlow>

      <div className="absolute bottom-4 left-4 bg-slate-900/95 backdrop-blur border border-slate-800 p-3 rounded-lg text-xs space-y-2 pointer-events-none shadow-xl">
        <div className="font-semibold text-slate-300 mb-1 border-b border-slate-800 pb-1 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-blue-400" /> Legend & Hierarchy
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
          <span className="text-slate-400 font-mono text-[11px]">Strategic Level (Long timescale, Policy)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span className="text-slate-400 font-mono text-[11px]">Tactical Level (Medium timescale, Subgoal)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-slate-400 font-mono text-[11px]">Operational Level (Short timescale, Action)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="text-slate-400 font-mono text-[11px]">Human-in-the-Loop Intercept Pending</span>
        </div>
      </div>
    </div>
  );
}
