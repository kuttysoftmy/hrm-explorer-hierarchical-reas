import React, { useState, useEffect } from 'react';
import {
  Play,
  X,
  UserCheck,
  Info,
  Terminal,
  FileCode,
  HelpCircle,
  Send,
  TrendingUp
} from 'lucide-react';

export default function InspectorPanel({
  selectedNode,
  onClose,
  onInjectHITL,
  onApproveNode
}) {
  const [promptOverride, setPromptOverride] = useState('');
  const [customValue, setCustomValue] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setPromptOverride(selectedNode.data.prompt || '');
      setCustomValue('');
    }
  }, [selectedNode]);

  if (!selectedNode) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500 p-6 text-center">
        <Info className="w-12 h-12 text-slate-700 mb-3" />
        <p className="font-medium text-slate-400">No Active Node Selected</p>
        <p className="text-xs text-slate-500 mt-1 max-w-xs">
          Select any reasoning node on the interactive map canvas to inspect intermediate state properties, memory buffers, or trigger structural human modifications.
        </p>
      </div>
    );
  }

  const { label, layer, timescale, status, progress, metrics, description, output } = selectedNode.data;

  return (
    <div className="flex flex-col h-full bg-slate-900 border-l border-slate-800 overflow-hidden">
      {/* Panel Header */}
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
        <div>
          <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
            layer.includes('Strategic') ? 'text-purple-400 bg-purple-950/40 border-purple-900' :
            layer.includes('Tactical') ? 'text-blue-400 bg-blue-950/40 border-blue-900' :
            'text-emerald-400 bg-emerald-950/40 border-emerald-900'
          }`}>
            {layer}
          </span>
          <h3 className="text-sm font-semibold text-slate-100 mt-1.5">{label}</h3>
        </div>
        <button 
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Inspector Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Execution Snapshot Widgets */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <div className="text-[10px] text-slate-500">TIMESCALE CALIBRATOR</div>
            <div className="text-slate-300 font-bold mt-1 text-xs">{timescale}</div>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <div className="text-[10px] text-slate-500">CURRENT TELEMETRY STATUS</div>
            <div className={`font-bold mt-1 text-xs capitalize ${
              status === 'running' ? 'text-purple-400 animate-pulse' :
              status === 'completed' ? 'text-emerald-400' :
              status === 'paused' ? 'text-amber-400' : 'text-slate-400'
            }`}>{status}</div>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <div className="text-[10px] text-slate-500">ACCUMULATED TOKENS</div>
            <div className="text-slate-300 font-bold mt-1 text-xs">{metrics.tokens} tokens</div>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <div className="text-[10px] text-slate-500">ISOLATED LATENCY</div>
            <div className="text-slate-300 font-bold mt-1 text-xs">{metrics.latency}</div>
          </div>
        </div>

        {/* Description Segment */}
        <div>
          <h4 className="text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-400" /> Operational Description
          </h4>
          <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Raw Live Input Buffer */}
        <div>
          <h4 className="text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
            <FileCode className="w-3.5 h-3.5 text-purple-400" /> Input Prompt Buffer
          </h4>
          <textarea
            value={promptOverride}
            onChange={(e) => setPromptOverride(e.target.value)}
            className="w-full h-24 bg-slate-950 text-slate-200 border border-slate-800 rounded-lg p-2.5 text-xs font-mono focus:outline-none focus:border-purple-500 transition-colors"
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-[9px] text-slate-500">Modify instructions to alter agent reasoning dynamically.</span>
            <button
              onClick={() => onInjectHITL(selectedNode.id, { prompt: promptOverride })}
              className="px-2 py-1 bg-purple-950 text-purple-300 hover:bg-purple-900 border border-purple-800 rounded text-[11px] font-medium flex items-center gap-1 transition"
            >
              <Send className="w-3 h-3" /> Inject Value
            </button>
          </div>
        </div>

        {/* Output Stream Node Cache */}
        <div>
          <h4 className="text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" /> Dynamic Output Payload Cache
          </h4>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400/90 whitespace-pre-wrap max-h-40 overflow-y-auto leading-relaxed">
            {output || '// Node state currently idle or initializing...'}
          </div>
        </div>
      </div>

      {/* Human-in-the-Loop Intercept Panel */}
      <div className="p-4 border-t border-slate-800 bg-slate-950 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <UserCheck className="w-4 h-4 text-amber-500" />
          <span className="text-amber-400">Human-in-the-Loop Actions</span>
          {status === 'paused' && (
            <span className="ml-auto bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded text-[9px] font-mono animate-pulse">
              INTERCEPT TRIGGERED
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          This component intercepts active reasoning loops to avoid model hallucination or dangerous down-stream execution steps.
        </p>

        {status === 'paused' ? (
          <div className="space-y-2 pt-1">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1 font-mono">Synthetic Output Overwrite (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Reject pricing thresholds; apply custom standard..."
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onApproveNode(selectedNode.id, customValue);
                  setCustomValue('');
                }}
                className="flex-1 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded text-xs flex items-center justify-center gap-1 transition shadow-neon-amber"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Approve & Resume Execution
              </button>
            </div>
          </div>
        ) : (
          <button
            disabled
            className="w-full py-1.5 bg-slate-900 text-slate-500 border border-slate-800 rounded text-xs font-medium cursor-not-allowed text-center"
          >
            Node does not require physical intervention
          </button>
        )}
      </div>
    </div>
  );
}
