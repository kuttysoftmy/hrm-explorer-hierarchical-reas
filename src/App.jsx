import React, { useState, useEffect, useCallback } from 'react';
import {
  useNodesState,
  useEdgesState,
  addEdge
} from 'reactflow';
import 'reactflow/dist/style.css';

import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  ShieldAlert,
  Share2,
  Settings,
  Radio,
  FileCode,
  CornerRightDown,
  Cpu,
  Hourglass
} from 'lucide-react';

import FlowGraph from './components/FlowGraph';
import MetricsPanel from './components/MetricsPanel';
import InspectorPanel from './components/InspectorPanel';
import ConsoleLog from './components/ConsoleLog';
import { TASK_PRESETS } from './data/presets';

const INITIAL_PRESET_KEY = 'marketAnalysis';

export default function App() {
  const [selectedPresetKey, setSelectedPresetKey] = useState(INITIAL_PRESET_KEY);
  const currentPreset = TASK_PRESETS[selectedPresetKey];

  // React Flow state hooks
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  
  // Simulation state hooks
  const [isPlaying, setIsPlaying] = useState(true);
  const [simSpeed, setSimSpeed] = useState(1);
  const [logs, setLogs] = useState([]);

  // Initialize / Reset active workflow
  const resetSimulation = useCallback((presetKey = selectedPresetKey) => {
    const targetPreset = TASK_PRESETS[presetKey];
    setNodes(JSON.parse(JSON.stringify(targetPreset.initialNodes)));
    setEdges(JSON.parse(JSON.stringify(targetPreset.initialEdges)));
    setSelectedNodeId(null);
    
    const initialLogs = [
      { id: 'l1', time: new Date().toLocaleTimeString(), type: 'system', message: 'Hierarchical Reasoning Model (HRM) runtime framework initialized.' },
      { id: 'l2', time: new Date().toLocaleTimeString(), type: 'action', message: `Preset Task loaded: "${targetPreset.name}"` },
      { id: 'l3', time: new Date().toLocaleTimeString(), type: 'warn', message: 'Global workspace sync established over WebSockets simulation.' }
    ];
    setLogs(initialLogs);
  }, [selectedPresetKey, setNodes, setEdges]);

  // Load preset on mount or change
  useEffect(() => {
    resetSimulation(selectedPresetKey);
  }, [selectedPresetKey]);

  // Find current active inspect target
  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  const handleNodeClick = (node) => {
    setSelectedNodeId(node.id);
  };

  const addLog = (type, message) => {
    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        time: new Date().toLocaleTimeString(),
        type,
        message
      }
    ]);
  };

  // Simulator loop mapping execution progression of strategic, planning and operational nodes
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setNodes((currentNodes) => {
        let stateModified = false;
        const updated = currentNodes.map((node) => {
          // Only transition node state of those that are active or pending
          if (node.data.status === 'running') {
            const nextProgress = Math.min(node.data.progress + Math.round(Math.random() * 15 + 5) * simSpeed, 100);
            stateModified = true;
            
            if (nextProgress >= 100) {
              // Check if node is designated to pause for HITL, or just finish
              const requiresHITL = node.data.label.includes('HITL') || node.id === 'node-7';
              const finalStatus = requiresHITL ? 'paused' : 'completed';
              
              addLog(
                requiresHITL ? 'warn' : 'success',
                `${node.data.label} reached execution milestone. Status context ➔ ${finalStatus.toUpperCase()}`
              );

              return {
                ...node,
                data: {
                  ...node.data,
                  progress: 100,
                  status: finalStatus,
                  output: requiresHITL 
                    ? '*Awaiting developer safety parameter confirmations or inline output injection*' 
                    : node.data.output + ' [Execution verification finalized]'
                }
              };
            }

            return {
              ...node,
              data: { ...node.data, progress: nextProgress }
            };
          } 
          
          // If node is idle, maybe activate it if parents are completed
          if (node.data.status === 'idle') {
            const parentEdges = edges.filter(e => e.target === node.id);
            const allParentsDone = parentEdges.every(e => {
              const pNode = currentNodes.find(cn => cn.id === e.source);
              return pNode && pNode.data.status === 'completed';
            });

            if (allParentsDone && parentEdges.length > 0) {
              stateModified = true;
              addLog('action', `Unlocking dependants: Initiating execution node ${node.data.label}`);
              return {
                ...node,
                data: {
                  ...node.data,
                  status: 'running',
                  progress: 10
                }
              };
            }
          }

          return node;
        });

        return stateModified ? updated : currentNodes;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying, simSpeed, edges, setNodes]);

  // HITL Inject parameters inside specific node memory state
  const handleInjectHITL = (nodeId, payload) => {
    setNodes((currentNodes) =>
      currentNodes.map((node) => {
        if (node.id === nodeId) {
          addLog('system', `Dynamic override injected into node [${node.data.label}]: Prompt content updated.`);
          return {
            ...node,
            data: {
              ...node.data,
              prompt: payload.prompt,
              metrics: {
                ...node.data.metrics,
                tokens: node.data.metrics.tokens + 120
              }
            }
          };
        }
        return node;
      })
    );
  };

  // Human Approve and Resume workflow execution
  const handleApproveNode = (nodeId, syntheticResponse) => {
    setNodes((currentNodes) =>
      currentNodes.map((node) => {
        if (node.id === nodeId) {
          addLog('success', `Human validation completed for [${node.data.label}]. Resuming workspace agent pipelines.`);
          return {
            ...node,
            data: {
              ...node.data,
              status: 'completed',
              progress: 100,
              output: syntheticResponse 
                ? `[HUMAN SIGN-OFF OVERRIDE]: ${syntheticResponse}` 
                : '[HUMAN SIGN-OFF]: Verified structural integrity of valuation layout and metrics.'
            }
          };
        }
        return node;
      })
    );
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden">
      
      {/* Main Top Header and Global Navigation Toolbar */}
      <header className="h-14 border-b border-slate-900 bg-slate-950 flex items-center justify-between px-4 z-10 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg shadow-neon-purple">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-extrabold tracking-tight text-slate-100">
                HRM-Explorer
              </h1>
              <span className="bg-purple-950 text-purple-400 font-mono text-[9px] px-1.5 py-0.5 rounded border border-purple-800">
                v1.2.5
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              Hierarchical Reasoning Debugger & Visualizer
            </p>
          </div>
        </div>

        {/* Core Task Presets Selector */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
          {Object.values(TASK_PRESETS).map((preset) => (
            <button
              key={preset.id}
              onClick={() => setSelectedPresetKey(preset.id)}
              className={`px-3 py-1 rounded text-xs font-medium transition-all duration-200 ${
                selectedPresetKey === preset.id
                  ? 'bg-purple-600 text-white shadow-neon-purple'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Global Debugging Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">SIM SPEED:</span>
            <button 
              onClick={() => setSimSpeed(prev => Math.max(0.5, prev - 0.5))}
              className="px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-[10px]"
            >-</button>
            <span className="text-purple-400 font-bold w-12 text-center">{simSpeed}x</span>
            <button 
              onClick={() => setSimSpeed(prev => Math.min(3, prev + 0.5))}
              className="px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-[10px]"
            >+</button>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-1.5 rounded transition ${isPlaying ? 'bg-amber-950 text-amber-400' : 'bg-emerald-950 text-emerald-400'}`}
              title={isPlaying ? 'Pause Simulation' : 'Play Simulation'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <button
              onClick={() => resetSimulation()}
              className="p-1.5 hover:bg-slate-800 rounded text-slate-400 transition"
              title="Reset Graph & Metrics"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Sub-head description banner */}
      <div className="bg-slate-900/60 border-b border-slate-900/80 px-4 py-2 flex justify-between items-center text-xs shrink-0">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-300">Hierarchical Core Connected:</span>
          <span className="text-slate-400 truncate max-w-lg font-mono text-[11px]">{currentPreset.strategicGoal}</span>
        </div>
        <div className="text-[11px] text-slate-500 font-mono">
          Multi-Timescale Reasoning Paradigm / WebSocket Port 8080 Active
        </div>
      </div>

      {/* Multi-Panel Main Work Area layout */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Dynamic Metrics Panel */}
        <aside className="w-80 shrink-0">
          <MetricsPanel nodes={nodes} />
        </aside>

        {/* Center Workspace (React Flow Node Canvas + Console Stream Panel) */}
        <section className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 relative border-r border-slate-900">
            <FlowGraph 
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={handleNodeClick}
            />
          </div>
          <div className="h-56 shrink-0 border-r border-slate-900">
            <ConsoleLog logs={logs} onClear={() => setLogs([])} />
          </div>
        </section>

        {/* Right Side: Interactive Inspector & Human Gate Intervention Panel */}
        <aside className="w-96 shrink-0">
          <InspectorPanel
            selectedNode={selectedNode}
            onClose={() => setSelectedNodeId(null)}
            onInjectHITL={handleInjectHITL}
            onApproveNode={handleApproveNode}
          />
        </aside>
      </main>
    </div>
  );
}
