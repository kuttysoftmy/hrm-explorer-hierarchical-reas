export const TASK_PRESETS = {
  marketAnalysis: {
    id: 'marketAnalysis',
    name: 'Strategic Market Analyst & Forecaster',
    description: 'Decomposes a long-horizon goal to generate an automated investment report with sub-sector valuations, data validation steps, and visual asset generation.',
    strategicGoal: 'Assess next-gen AI chip valuation models and write automated visual prospectus.',
    initialNodes: [
      {
        id: 'node-1',
        type: 'strategicNode',
        position: { x: 350, y: 20 },
        data: {
          label: 'S1: Generate AI Chip Prospectus',
          layer: 'Strategic (Long-Term Policy)',
          timescale: '60s Execution Tick',
          status: 'running',
          progress: 35,
          metrics: { tokens: 1850, latency: '4.8s' },
          description: 'Top-level orchestrator balancing qualitative macro trends with bottom-up validation.',
          prompt: 'Create complete market forecast prospectus for NVIDIA H200 vs Blackwell architectures, incorporating competitive metrics and risk vectors.',
          output: 'Planning sub-tasks initialized: Tactical market survey and execution-level database crawling...'
        }
      },
      {
        id: 'node-2',
        type: 'planningNode',
        position: { x: 100, y: 180 },
        data: {
          label: 'T1: Macro Competitor Survey',
          layer: 'Tactical Planning (Medium-Term)',
          timescale: '15s Update Sync',
          status: 'completed',
          progress: 100,
          metrics: { tokens: 4200, latency: '2.9s' },
          description: 'Identifies core variables: pricing matrices, die yields, supply constraints.',
          prompt: 'Compile structural differences between Blackwell-100 & Hopper architectures and format data points into high-fidelity JSON arrays.',
          output: 'Competitor matrix output: Blackwell throughput evaluated at 4x Hopper under FP4 configurations. Key pricing data validated.'
        }
      },
      {
        id: 'node-3',
        type: 'planningNode',
        position: { x: 600, y: 180 },
        data: {
          label: 'T2: Quantitative Valuation & Modeling',
          layer: 'Tactical Planning (Medium-Term)',
          timescale: '15s Update Sync',
          status: 'paused',
          progress: 55,
          metrics: { tokens: 2900, latency: '3.1s' },
          description: 'Runs parallel DCF models and calculates relative multipliers based on tool outputs.',
          prompt: 'Execute Monte-Carlo pipeline utilizing computed semiconductor ASP and target margins. Require Human confirmation on boundary assumptions.',
          output: 'DCF model populated. Yield floor = 62%, CapEx multipliers calibrated. *Awaiting Developer Sanity Check (HITL Status)*'
        }
      },
      {
        id: 'node-4',
        type: 'executionNode',
        position: { x: -100, y: 340 },
        data: {
          label: 'E1: Crawl SEC Filings',
          layer: 'Operational Execution (Short-Term)',
          timescale: '3s Action Window',
          status: 'completed',
          progress: 100,
          metrics: { tokens: 550, latency: '0.8s' },
          description: 'Calls direct SEC Edgar scraper tool with live-agent search constraints.',
          prompt: 'Fetch target 10-K filings for major cloud providers and parse CapEx plans.',
          output: 'Retrieved 8 separate 10-K items. Extracted relevant CapEx sections for AWS, Azure, GCP.'
        }
      },
      {
        id: 'node-5',
        type: 'executionNode',
        position: { x: 200, y: 340 },
        data: {
          label: 'E2: GPU Yield Extrapolator',
          layer: 'Operational Execution (Short-Term)',
          timescale: '3s Action Window',
          status: 'completed',
          progress: 100,
          metrics: { tokens: 820, latency: '1.2s' },
          description: 'Executes mathematical Python routine to estimate wafer output from foundry parameters.',
          prompt: 'Run wafer-yield calculator with defect-density coefficient = 0.08.',
          output: 'Calculated Blackwell functional die yield per wafer: 73.1% (nominal scenario).'
        }
      },
      {
        id: 'node-6',
        type: 'executionNode',
        position: { x: 500, y: 340 },
        data: {
          label: 'E3: DCF Simulation Script',
          layer: 'Operational Execution (Short-Term)',
          timescale: '3s Action Window',
          status: 'running',
          progress: 40,
          metrics: { tokens: 120, latency: '0.4s' },
          description: 'Iterative numerical script execution targeting raw terminal value margins.',
          prompt: 'Simulate 10,000 steps with standard deviation offset of 3.5%.',
          output: 'Step 4,500 calculated. Distribution clustering around $1.4T enterprise valuation.'
        }
      },
      {
        id: 'node-7',
        type: 'executionNode',
        position: { x: 800, y: 340 },
        data: {
          label: 'E4: Human-in-the-Loop Override Gate',
          layer: 'Operational Execution (Short-Term)',
          timescale: 'Immediate Execution Sync',
          status: 'paused',
          progress: 0,
          metrics: { tokens: 0, latency: '0s' },
          description: 'Awaits user approval to commit DCF boundary models into final strategic report framework.',
          prompt: 'Review and approve discount rate (9.5%) and long-term terminal growth coefficient (2.2%).',
          output: 'BLOCKED: Node is currently halted in execution queue. Inject human signal to unlock downstream pathways.'
        }
      }
    ],
    initialEdges: [
      { id: 'e1-2', source: 'node-1', target: 'node-2', animated: true, style: { stroke: '#a855f7' } },
      { id: 'e1-3', source: 'node-1', target: 'node-3', animated: true, style: { stroke: '#a855f7' } },
      { id: 'e2-4', source: 'node-2', target: 'node-4', animated: true, style: { stroke: '#3b82f6' } },
      { id: 'e2-5', source: 'node-2', target: 'node-5', animated: true, style: { stroke: '#3b82f6' } },
      { id: 'e3-6', source: 'node-3', target: 'node-6', animated: true, style: { stroke: '#3b82f6' } },
      { id: 'e3-7', source: 'node-3', target: 'node-7', animated: true, style: { stroke: '#f59e0b' } }
    ]
  },
  devOpsDeploy: {
    id: 'devOpsDeploy',
    name: 'Auto-Healing Microservice Orchestrator',
    description: 'Autonomous DevOps reasoning tree detecting production memory leak and conducting safe rollbacks.',
    strategicGoal: 'Identify and resolve memory leak across internal transaction routers in staging cluster.',
    initialNodes: [
      {
        id: 'node-1',
        type: 'strategicNode',
        position: { x: 350, y: 20 },
        data: {
          label: 'S1: Autonomic Cluster Health Guard',
          layer: 'Strategic (Long-Term Policy)',
          timescale: '60s Execution Tick',
          status: 'running',
          progress: 68,
          metrics: { tokens: 4900, latency: '12.4s' },
          description: 'Primary microservice sentinel responding to persistent performance drift metrics.',
          prompt: 'Monitor microservice health indicators. If degradation exceeds threshold, orchestrate tracing, code analysis, and hotfix patch.',
          output: 'Detected transaction service degradation. Tactical execution modules deployed for heap profile analyses.'
        }
      },
      {
        id: 'node-2',
        type: 'planningNode',
        position: { x: 100, y: 180 },
        data: {
          label: 'T1: Static Analysis & Profiling',
          layer: 'Tactical Planning (Medium-Term)',
          timescale: '15s Update Sync',
          status: 'completed',
          progress: 100,
          metrics: { tokens: 2100, latency: '4.5s' },
          description: 'Orchestrates dynamic profilers and AST static analysis tools on repo branch v1.4.2.',
          prompt: 'Inspect memory allocations in transaction handler code base. Flag unbounded slices or dangling database clients.',
          output: 'Identified unbounded cache map inside auth-validation middleware package.'
        }
      },
      {
        id: 'node-3',
        type: 'planningNode',
        position: { x: 600, y: 180 },
        data: {
          label: 'T2: Rolling Mitigation Strategy',
          layer: 'Tactical Planning (Medium-Term)',
          timescale: '15s Update Sync',
          status: 'running',
          progress: 20,
          metrics: { tokens: 1800, latency: '3.9s' },
          description: 'Constructs deployment sequence config with dynamic rollback fail-safes.',
          prompt: 'Plan staging patch implementation. If target load validation fails, initiate zero-downtime rollback.',
          output: 'Drafted pipeline: 1) Spin up patched mock instances; 2) Route 10% target traffic; 3) Monitor throughput.'
        }
      },
      {
        id: 'node-4',
        type: 'executionNode',
        position: { x: -100, y: 340 },
        data: {
          label: 'E1: Execute pprof Engine',
          layer: 'Operational Execution (Short-Term)',
          timescale: '3s Action Window',
          status: 'completed',
          progress: 100,
          metrics: { tokens: 950, latency: '1.8s' },
          description: 'Trigger low-level profiling script over live process container.',
          prompt: 'Connect to live staging-pod-2b container and output 30s CPU profile.',
          output: 'pprof dump successful: 75% heap memory retained by auth cache map.'
        }
      },
      {
        id: 'node-5',
        type: 'executionNode',
        position: { x: 200, y: 340 },
        data: {
          label: 'E2: GitHub Patch Commit',
          layer: 'Operational Execution (Short-Term)',
          timescale: '3s Action Window',
          status: 'completed',
          progress: 100,
          metrics: { tokens: 410, latency: '0.9s' },
          description: 'Direct repository modification using write credentials.',
          prompt: 'Push fix replacing slice allocations with global LRU cache strategy.',
          output: 'Branch patch/memfix committed. Build pipeline triggered (ID: #491295).'
        }
      },
      {
        id: 'node-6',
        type: 'executionNode',
        position: { x: 500, y: 340 },
        data: {
          label: 'E3: Canaries Rolling Build',
          layer: 'Operational Execution (Short-Term)',
          timescale: '3s Action Window',
          status: 'running',
          progress: 45,
          metrics: { tokens: 300, latency: '0.5s' },
          description: 'Executes cluster rolling build script on target namespace.',
          prompt: 'Perform deployment roll-out over Kubernetes client interface.',
          output: 'Pod rollout status: 1 out of 3 pods running healthy. Internal traffic redirect in progress...'
        }
      },
      {
        id: 'node-7',
        type: 'executionNode',
        position: { x: 800, y: 340 },
        data: {
          label: 'E4: HITL Validation Probe',
          layer: 'Operational Execution (Short-Term)',
          timescale: 'Immediate Execution Sync',
          status: 'idle',
          progress: 0,
          metrics: { tokens: 0, latency: '0s' },
          description: 'Requires human intervention verification before tearing down original broken production node.',
          prompt: 'Approve termination of memory-compromised pod-2b and final swap of routing tables.',
          output: 'Waiting on parent plan validation steps. Queue state: Idle.'
        }
      }
    ],
    initialEdges: [
      { id: 'e1-2', source: 'node-1', target: 'node-2', animated: true, style: { stroke: '#a855f7' } },
      { id: 'e1-3', source: 'node-1', target: 'node-3', animated: true, style: { stroke: '#a855f7' } },
      { id: 'e2-4', source: 'node-2', target: 'node-4', animated: true, style: { stroke: '#3b82f6' } },
      { id: 'e2-5', source: 'node-2', target: 'node-5', animated: true, style: { stroke: '#3b82f6' } },
      { id: 'e3-6', source: 'node-3', target: 'node-6', animated: true, style: { stroke: '#3b82f6' } },
      { id: 'e3-7', source: 'node-3', target: 'node-7', animated: true, style: { stroke: '#f59e0b' } }
    ]
  }
};
