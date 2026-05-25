import React, { useEffect, useRef } from 'react';
import { Terminal, Shield, Eye, Trash2 } from 'lucide-react';

export default function ConsoleLog({ logs, onClear }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-slate-950 border-t border-slate-900 flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/40 border-b border-slate-900/80">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <Terminal className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="font-mono uppercase tracking-wider text-[11px]">HRM Execution Frame Stream (WebSockets: Connected)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Active Frame Socket (Live port 8080/sync)
          </div>
          <button
            onClick={onClear}
            className="text-slate-500 hover:text-slate-300 transition p-1 rounded hover:bg-slate-800/50"
            title="Clear Console Logs"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-3 font-mono text-xs space-y-1.5 bg-slate-950 select-text selection:bg-purple-900"
      >
        {logs.map((log) => {
          let colorClass = 'text-slate-400';
          if (log.type === 'error') colorClass = 'text-red-400';
          else if (log.type === 'success') colorClass = 'text-emerald-400';
          else if (log.type === 'warn') colorClass = 'text-amber-400';
          else if (log.type === 'system') colorClass = 'text-purple-400 font-semibold';
          else if (log.type === 'action') colorClass = 'text-blue-400';

          return (
            <div key={log.id} className="flex items-start gap-2 hover:bg-slate-900/40 px-1 py-0.5 rounded transition">
              <span className="text-slate-600 shrink-0 text-[10px]">[{log.time}]</span>
              <span className={`text-[10px] px-1 rounded shrink-0 ${
                log.type === 'error' ? 'bg-red-950 text-red-400' :
                log.type === 'success' ? 'bg-emerald-950 text-emerald-400' :
                log.type === 'warn' ? 'bg-amber-950 text-amber-400' :
                log.type === 'system' ? 'bg-purple-950 text-purple-400' :
                'bg-slate-900 text-slate-400'
              }`}>
                {log.type.toUpperCase()}
              </span>
              <span className={`leading-relaxed ${colorClass}`}>
                {log.message}
              </span>
            </div>
          );
        })}
        {logs.length === 0 && (
          <div className="text-slate-600 text-center py-6 text-xs">
            No active workspace traces. Start the simulation to run HRM execution lifecycle.
          </div>
        )}
      </div>
    </div>
  );
}
