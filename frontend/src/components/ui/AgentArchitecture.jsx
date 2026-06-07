import React from 'react';

const AgentArchitecture = ({ result }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-slate-100 mb-2 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-brand-500 shadow-[0_0_10px_rgba(2,132,199,0.8)]"></div>
        System Architecture
      </h2>
      <p className="text-slate-400 mb-10 pb-4 border-b border-slate-800/60">
        Execution flow of the LangGraph-powered multi-agent verification pipeline.
      </p>

      {/* LangGraph Orchestration Section */}
      <div className="bg-slate-900/80 backdrop-blur-sm border border-brand-900/50 rounded-xl p-5 shadow-lg mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-500"></div>
        <h3 className="text-sm font-bold text-slate-200 mb-4 border-b border-slate-800 pb-2 flex items-center gap-2 tracking-wider uppercase">
          LANGGRAPH ORCHESTRATION
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-xs md:text-sm font-mono text-slate-200 py-3">
          <div className="bg-slate-800/80 border border-slate-600/50 px-4 py-1.5 rounded-lg text-center shadow-lg font-bold tracking-wide">START</div>
          <div className="text-brand-500/60 font-black">→</div>
          <div className="bg-brand-950/40 border border-brand-500/40 text-brand-300 px-4 py-1.5 rounded-lg text-center shadow-[0_0_15px_rgba(2,132,199,0.2)] font-bold tracking-wide">AgentState</div>
          <div className="text-brand-500/60 font-black">→</div>
          <div className="bg-brand-950/20 border border-brand-700/30 text-brand-200 px-4 py-1.5 rounded-lg text-center shadow-md">Alpha Agent</div>
          <div className="text-brand-500/60 font-black">→</div>
          <div className="bg-brand-950/20 border border-brand-700/30 text-brand-200 px-4 py-1.5 rounded-lg text-center shadow-md">Beta Agent</div>
          <div className="text-brand-500/60 font-black">→</div>
          <div className="bg-slate-800/80 border border-slate-600/50 px-4 py-1.5 rounded-lg text-center shadow-lg font-bold tracking-wide">END</div>
        </div>
      </div>

      {/* Part 1 & 2: Agent Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Alpha Agent Card */}
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800/80 rounded-xl p-6 shadow-lg relative overflow-hidden group hover:border-brand-500/50 transition-all">
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-800 group-hover:bg-brand-500 transition-colors"></div>
          <h3 className="text-base font-bold text-slate-100 mb-1 border-b border-slate-800/80 pb-3 flex items-center gap-2">
            <span className="text-brand-400">Alpha Agent</span> <span className="text-slate-500 font-normal">—</span> Verification
          </h3>
          <p className="text-xs text-slate-400 mb-5 mt-3 font-medium">
            Responsible for external evidence retrieval and factual validation.
          </p>
          
          <div className="mb-6">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Workflow</h4>
            <div className="text-[10px] sm:text-xs text-brand-200/90 font-mono flex flex-wrap items-center gap-2">
              <span className="bg-brand-950/30 border border-brand-800/50 px-2.5 py-1.5 rounded-md shadow-[0_0_10px_rgba(2,132,199,0.1)]">Claim Input</span>
              <span className="text-brand-500/50 font-bold">→</span>
              <span className="bg-brand-950/30 border border-brand-800/50 px-2.5 py-1.5 rounded-md shadow-[0_0_10px_rgba(2,132,199,0.1)]">Tavily Retrieval</span>
              <span className="text-brand-500/50 font-bold">→</span>
              <span className="bg-brand-950/30 border border-brand-800/50 px-2.5 py-1.5 rounded-md shadow-[0_0_10px_rgba(2,132,199,0.1)]">Chunking</span>
              <span className="text-brand-500/50 font-bold">→</span>
              <span className="bg-brand-950/30 border border-brand-800/50 px-2.5 py-1.5 rounded-md shadow-[0_0_10px_rgba(2,132,199,0.1)]">Embedding Search</span>
              <span className="text-brand-500/50 font-bold">→</span>
              <span className="bg-brand-950/30 border border-brand-800/50 px-2.5 py-1.5 rounded-md shadow-[0_0_10px_rgba(2,132,199,0.1)]">Top-5 Retrieval</span>
              <span className="text-brand-500/50 font-bold">→</span>
              <span className="bg-brand-950/30 border border-brand-800/50 px-2.5 py-1.5 rounded-md shadow-[0_0_10px_rgba(2,132,199,0.1)]">LLM Verify</span>
              <span className="text-brand-500/50 font-bold">→</span>
              <span className="bg-brand-950/30 border border-brand-800/50 px-2.5 py-1.5 rounded-md shadow-[0_0_10px_rgba(2,132,199,0.1)]">Report</span>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Responsibilities</h4>
            <ul className="text-xs text-slate-300 flex flex-wrap gap-x-6 gap-y-2.5 list-none">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(2,132,199,0.8)]"></div>Retrieve supporting evidence</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(2,132,199,0.8)]"></div>Validate factual consistency</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(2,132,199,0.8)]"></div>Generate confidence score</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(2,132,199,0.8)]"></div>Produce structured verification report</li>
            </ul>
          </div>
        </div>

        {/* Beta Agent Card */}
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800/80 rounded-xl p-6 shadow-lg relative overflow-hidden group hover:border-brand-500/50 transition-all">
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-800 group-hover:bg-brand-500 transition-colors"></div>
          <h3 className="text-base font-bold text-slate-100 mb-1 border-b border-slate-800/80 pb-3 flex items-center gap-2">
            <span className="text-brand-400">Beta Agent</span> <span className="text-slate-500 font-normal">—</span> Knowledge Base
          </h3>
          <p className="text-xs text-slate-400 mb-5 mt-3 font-medium">
            Responsible for redundancy detection and contradiction analysis.
          </p>

          <div className="mb-6">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Workflow</h4>
            <div className="text-[10px] sm:text-xs text-brand-200/90 font-mono flex flex-wrap items-center gap-2">
              <span className="bg-brand-950/30 border border-brand-800/50 px-2.5 py-1.5 rounded-md shadow-[0_0_10px_rgba(2,132,199,0.1)]">Alpha Report</span>
              <span className="text-brand-500/50 font-bold">→</span>
              <span className="bg-brand-950/30 border border-brand-800/50 px-2.5 py-1.5 rounded-md shadow-[0_0_10px_rgba(2,132,199,0.1)]">Embedding Gen</span>
              <span className="text-brand-500/50 font-bold">→</span>
              <span className="bg-brand-950/30 border border-brand-800/50 px-2.5 py-1.5 rounded-md shadow-[0_0_10px_rgba(2,132,199,0.1)]">Similarity Search</span>
              <span className="text-brand-500/50 font-bold">→</span>
              <span className="bg-brand-950/30 border border-brand-800/50 px-2.5 py-1.5 rounded-md shadow-[0_0_10px_rgba(2,132,199,0.1)]">KB Compare</span>
              <span className="text-brand-500/50 font-bold">→</span>
              <span className="bg-brand-950/30 border border-brand-800/50 px-2.5 py-1.5 rounded-md shadow-[0_0_10px_rgba(2,132,199,0.1)]">Contradiction Analysis</span>
              <span className="text-brand-500/50 font-bold">→</span>
              <span className="bg-brand-950/30 border border-brand-800/50 px-2.5 py-1.5 rounded-md shadow-[0_0_10px_rgba(2,132,199,0.1)]">Decision Engine</span>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Responsibilities</h4>
            <ul className="text-xs text-slate-300 flex flex-wrap gap-x-6 gap-y-2.5 list-none">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(2,132,199,0.8)]"></div>Detect duplicate facts</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(2,132,199,0.8)]"></div>Detect contradictory facts</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(2,132,199,0.8)]"></div>Protect database integrity</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(2,132,199,0.8)]"></div>Determine storage action</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Part 3: Decision Flow */}
      <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800/80 rounded-xl p-6 shadow-lg mb-8 overflow-x-auto relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-800"></div>
        <h3 className="text-lg font-bold text-slate-200 mb-6 border-b border-slate-800 pb-3">
          Decision Flow
        </h3>
        <div className="flex flex-col items-center min-w-[480px] text-xs font-mono text-slate-300 py-6">
          <div className="border border-slate-700 px-4 py-2 rounded-lg bg-slate-950 shadow-inner">Similarity &gt; 0.85 ?</div>
          <div className="h-6 border-l border-slate-700"></div>
          <div className="w-80 border-t border-slate-700 flex justify-between relative">
            <div className="absolute -top-3 bg-slate-900 px-2 text-[10px] text-slate-400 left-8">NO</div>
            <div className="absolute -top-3 bg-slate-900 px-2 text-[10px] text-slate-400 right-8">YES</div>
          </div>
          <div className="flex w-80 justify-between">
            <div className="h-6 border-l border-slate-700"></div>
            <div className="h-6 border-r border-slate-700"></div>
          </div>
          <div className="flex w-80 justify-between items-start">
            <div className="border border-emerald-900/50 px-4 py-2 rounded-lg bg-emerald-950/30 font-bold text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.1)]">INSERT</div>
            <div className="flex flex-col items-center">
              <div className="border border-slate-700 px-4 py-2 rounded-lg bg-slate-950 shadow-inner">Contradiction Check</div>
              <div className="h-6 border-l border-slate-700"></div>
              <div className="w-64 border-t border-slate-700 flex justify-between relative">
                <div className="absolute -top-3 bg-slate-900 px-2 text-[10px] text-slate-400 left-6">CONSISTENT</div>
                <div className="absolute -top-3 bg-slate-900 px-2 text-[10px] text-slate-400 right-4">CONTRADICTORY</div>
              </div>
              <div className="flex w-64 justify-between">
                <div className="h-6 border-l border-slate-700"></div>
                <div className="h-6 border-r border-slate-700"></div>
              </div>
              <div className="flex w-64 justify-between items-start">
                <div className="flex flex-col items-center text-center">
                  <div className="border border-slate-700 px-3 py-1.5 rounded-lg bg-slate-950 font-bold text-slate-400">DISCARD</div>
                  <span className="text-[10px] mt-2 text-slate-500">(Redundant)</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="border border-rose-900/50 px-3 py-1.5 rounded-lg bg-rose-950/30 font-bold text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.1)]">FLAG</div>
                  <span className="text-[10px] mt-2 text-slate-500">(Conflict)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part 4: Dynamic Execution Trace */}
      {result && (
        <div className="bg-slate-900/80 backdrop-blur-sm border border-brand-900/50 rounded-xl p-6 shadow-[0_0_20px_rgba(2,132,199,0.1)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-brand-500"></div>
          <h3 className="text-lg font-bold text-slate-200 mb-5 border-b border-slate-800 pb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Live Verification Trace
          </h3>
          <div className="space-y-4">
            <div className="flex items-center text-sm">
              <span className="text-brand-500 font-bold mr-3 flex items-center justify-center w-5 h-5 rounded-full bg-brand-500/10">✓</span>
              <span className="text-slate-300">Claim Submitted</span>
            </div>
            
            <div className="flex items-center text-sm">
              <span className="text-brand-500 font-bold mr-3 flex items-center justify-center w-5 h-5 rounded-full bg-brand-500/10">✓</span>
              <span className="text-slate-300">Evidence Retrieved</span>
            </div>
            
            <div className="flex items-center text-sm">
              <span className="text-brand-500 font-bold mr-3 flex items-center justify-center w-5 h-5 rounded-full bg-brand-500/10">✓</span>
              <span className="text-slate-300 flex-1">Alpha Agent Verification</span>
              <span className={`text-xs font-mono px-2.5 py-1 rounded-md ${result.status === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                {result.status || 'UNKNOWN'}
              </span>
            </div>
            
            <div className="flex items-center text-sm">
              <span className="text-brand-500 font-bold mr-3 flex items-center justify-center w-5 h-5 rounded-full bg-brand-500/10">✓</span>
              <span className="text-slate-300 flex-1">Similarity Search</span>
              {result.similarity_score !== undefined && result.similarity_score !== null && (
                 <span className="text-xs font-mono bg-slate-950 text-slate-400 px-2.5 py-1 rounded-md border border-slate-700 shadow-inner">
                   {result.similarity_score.toFixed(2)}
                 </span>
              )}
            </div>

            {(result.verdict === 'redundant' || result.verdict === 'conflict') && (
              <div className="flex items-center text-sm">
                <span className="text-brand-500 font-bold mr-3 flex items-center justify-center w-5 h-5 rounded-full bg-brand-500/10">✓</span>
                <span className="text-slate-300 flex-1">Contradiction Check</span>
                <span className={`text-xs font-mono px-2.5 py-1 rounded-md border ${result.verdict === 'redundant' ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                  {result.verdict === 'redundant' ? 'CONSISTENT' : 'CONTRADICTORY'}
                </span>
              </div>
            )}

            <div className="flex items-center text-sm">
              <span className="text-brand-500 font-bold mr-3 flex items-center justify-center w-5 h-5 rounded-full bg-brand-500/10">✓</span>
              <span className="text-slate-300 flex-1">Knowledge Base Decision</span>
              <span className={`text-xs font-mono px-2.5 py-1 rounded-md border ${
                result.db_action === 'INSERT' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                result.db_action === 'FLAG' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                'bg-slate-800 text-slate-300 border-slate-700'
              }`}>
                {result.db_action || 'UNKNOWN'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentArchitecture;
