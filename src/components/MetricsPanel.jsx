import React from 'react';
import {
  BarChart2,
  Hourglass,
  Cpu,
  Coins,
  CheckSquare,
  TrendingUp,
  Zap
} from 'lucide-react';

export default function MetricsPanel({ nodes }) {
  // Calculate stats based on active simulated graph state
  const totalNodes = nodes.length;
  const completedNodes = nodes.filter(n => n.data.status === 'completed').length;
  const runningNodes = nodes.filter(n => n.data.status === 'running').length;
  const pausedNodes = nodes.filter(n => n.data.status === 'paused').length;
  const totalTokens = nodes.reduce((acc, curr) => acc + curr.data.metrics.tokens, 0);
  
  // Segment metrics by reasoning layout
  const strategicCost = nodes.filter(n => n.type === 'strategicNode').reduce((acc, curr) => acc + curr.data.metrics.tokens, 0);
  const planningCost = nodes.filter(n => n.type === 'planningNode').reduce((acc, curr) => acc + curr.data.metrics.tokens, 0);
  const executionCost = nodes.filter(n => n.type === 'executionNode').reduce((acc, curr) => acc + curr.data.metrics.tokens, 0);

  return (
    <div className="bg-slate-900 border-r border-slate-800 h-full overflow-y-auto p-4 flex flex-col space-y-4">
      <div>
        <h2 className="text-xs font-bold font-mono tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-purple-400" /> Real-time Execution Profiler
        </h2>
        <p className="text-[11px] text-slate-400 mt-1 leading-normal">
          Real-time metrics compiled dynamically from HRM reasoning nodes.
        </p>
      </div>

      {/* Quantitative Grid Cards */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-lg flex flex-col justify-between">
          <span className="text-[9px] font-mono text-slate-500">PROCESSED TOKENS</span>
          <div className="flex items-baseline gap-1 mt-1.5">
            <span className="text-base font-bold font-mono text-slate-100">{totalTokens}</span>
            <span className="text-[9px] font-mono text-slate-500">tot</span>
          </div>
        </div>
        <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-lg flex flex-col justify-between">
          <span className="text-[9px] font-mono text-slate-500">SUCCESS RATE</span>
          <div className="flex items-baseline gap-1 mt-1.5">
            <span className="text-base font-bold font-mono text-emerald-400">
              {totalNodes ? Math.round((completedNodes / totalNodes) * 100) : 0}%
            </span>
            <span className="text-[9px] font-mono text-slate-500">{completedNodes}/{totalNodes}</span>
          </div>
        </div>
        <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-lg flex flex-col justify-between">
          <span className="text-[9px] font-mono text-slate-500">ACTIVE RUNNING</span>
          <div className="flex items-baseline gap-1 mt-1.5">
            <span className="text-base font-bold font-mono text-purple-400">
              {runningNodes}
            </span>
            <span className="text-[9px] font-mono text-slate-500">tasks</span>
          </div>
        </div>
        <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-lg flex flex-col justify-between animate-pulse-fast">
          <span className="text-[9px] font-mono text-amber-500">HITL BLOCKED</span>
          <div className="flex items-baseline gap-1 mt-1.5">
            <span className="text-base font-bold font-mono text-amber-400">
              {pausedNodes}
            </span>
            <span className="text-[9px] font-mono text-slate-500">paused</span>
          </div>
        </div>
      </div>

      {/* Timescale Model Graph Layout */}
      <div className="space-y-2.5 bg-slate-950 p-3 rounded-lg border border-slate-800">
        <div className="text-[11px] font-mono text-slate-300 font-bold border-b border-slate-900 pb-1 flex items-center gap-1">
          <Hourglass className="w-3 h-3 text-blue-400" /> Timescale Layer Breakdown
        </div>
        
        <div className="space-y-2 text-xs">
          {/* Strategy Layer Metrics */}
          <div>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-1">
              <span className="text-purple-400">Strategic (Long)</span>
              <span>{strategicCost} tokens</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-purple-500 transition-all duration-300"
                style={{ width: `${totalTokens ? (strategicCost / totalTokens) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Planning Layer Metrics */}
          <div>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-1">
              <span className="text-blue-400">Tactical Planning (Medium)</span>
              <span>{planningCost} tokens</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${totalTokens ? (planningCost / totalTokens) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Execution Layer Metrics */}
          <div>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-1">
              <span className="text-emerald-400">Operational Tools (Short)</span>
              <span>{executionCost} tokens</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${totalTokens ? (executionCost / totalTokens) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Timescale Reasoning Latency Profile */}
      <div className="space-y-2 bg-slate-950 p-3 rounded-lg border border-slate-800 flex-1">
        <div className="text-[11px] font-mono text-slate-300 font-bold border-b border-slate-900 pb-1 flex items-center gap-1">
          <Cpu className="w-3 h-3 text-emerald-400" /> Layer Sync & Latency
        </div>
        
        <div className="space-y-2 text-[11px] font-mono">
          <div className="p-2 bg-slate-900/40 rounded border border-slate-800/80">
            <div className="text-slate-400">Policy Tick Length:</div>
            <div className="text-slate-200 mt-0.5">1.2s avg (Goal planning)</div>
          </div>
          <div className="p-2 bg-slate-900/40 rounded border border-slate-800/80">
            <div className="text-slate-400">Operational Wait Queue:</div>
            <div className="text-slate-200 mt-0.5">0ms latency dropouts</div>
          </div>
          <div className="p-2 bg-slate-900/40 rounded border border-slate-800/80">
            <div className="text-slate-400">Execution Framework:</div>
            <div className="text-slate-200 mt-0.5">Asynchronous Event Loops</div>
          </div>
        </div>
      </div>
    </div>
  );
}
