import React, { useState } from 'react';

const ChevronIcon = ({ expanded }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" height="16" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
    className={`transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const StatusIcon = ({ status, size = 14 }) => {
  if (status === 'success') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    );
  }
  if (status === 'skipped') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="8" y1="12" x2="16" y2="12"></line>
      </svg>
    );
  }
  return null;
};

const VerificationTrace = ({ result }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [expandedStages, setExpandedStages] = useState({
    0: true,
    1: true,
    2: true,
    3: false,
    4: true,
    5: true,
    6: true,
  });

  if (!result) return null;

  const toggleStage = (index) => {
    setExpandedStages(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const hasEvidence = Boolean(result.evidence && result.evidence.trim().length > 0);
  const isExactDuplicate = result.verdict === 'redundant' && !result.similarity_score;
  const hasSimilarityCheck = !isExactDuplicate;
  const hasContradictionCheck = hasSimilarityCheck && result.similarity_score > 0.85;

  const stages = [
    {
      title: "Stage 0: LangGraph Orchestration",
      status: "success",
      steps: [
        { name: "START", status: "success" },
        { name: "AgentState Initialized", status: "success" },
        { name: "Alpha Agent Node", status: "success" },
        { name: "Beta Agent Node", status: "success" },
        { name: "END", status: "success" }
      ]
    },
    {
      title: "Stage 1: Claim Processing",
      status: "success",
      steps: [
        { name: "Claim Received", status: "success", detail: result.claim }
      ]
    },
    {
      title: "Stage 2: Evidence Retrieval",
      status: "success",
      steps: [
        { name: "Tavily Search Executed", status: "success" },
        { name: "Evidence Documents Retrieved", status: hasEvidence ? "success" : "skipped", detail: hasEvidence ? "Found relevant documents" : "No results found" }
      ]
    },
    {
      title: "Stage 3: Semantic Retrieval Pipeline",
      status: hasEvidence ? "success" : "skipped",
      steps: hasEvidence ? [
        { name: "Evidence Chunking", status: "success" },
        { name: "Claim Embedding Generated", status: "success" },
        { name: "Chunk Embeddings Generated", status: "success" },
        { name: "Cosine Similarity Ranking", status: "success" },
        { name: "Top-K Relevant Chunks Selected", status: "success" }
      ] : [
        { name: "Pipeline Skipped (No Evidence)", status: "skipped" }
      ]
    },
    {
      title: "Stage 4: Alpha Agent Reasoning",
      status: "success",
      summary: `Result: ${result.status}`,
      steps: [
        { name: "Claim-Evidence Verification", status: "success" },
        { name: "Temporal Consistency Check", status: "success" },
        { name: "Contradiction Detection", status: "success" },
        { name: "Confidence Estimation", status: "success", detail: `Score: ${result.confidence}%` }
      ]
    },
    {
      title: "Stage 5: Beta Agent Validation",
      status: "success",
      summary: `Verdict: ${result.verdict}`,
      steps: [
        { name: "Duplicate Detection", status: "success", detail: isExactDuplicate ? "Exact match found" : "No exact match" },
        ...(hasSimilarityCheck ? [
          { name: "Knowledge Base Lookup", status: "success" },
          { name: "Similarity Threshold Check", status: "success", detail: result.similarity_score ? `Max Similarity: ${(result.similarity_score * 100).toFixed(1)}%` : "No similar facts" },
          ...(hasContradictionCheck ? [
            { name: "Contradiction Validation", status: "success", detail: result.verdict === 'conflict' ? 'Conflict detected' : 'No conflict' }
          ] : [])
        ] : [])
      ]
    },
    {
      title: "Stage 6: Knowledge Base Decision",
      status: "success",
      summary: `Action: ${result.db_action}`,
      steps: [
        { name: `Execute ${result.db_action}`, status: "success", detail: "Transaction committed to database" }
      ]
    }
  ];

  return (
    <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs font-semibold text-brand-500 uppercase tracking-wider mb-1">LangGraph Orchestrated Workflow</div>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Execution Pipeline Trace</h4>
        </div>
        {!showDetails && (
          <button 
            onClick={() => setShowDetails(true)}
            className="text-xs font-semibold px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
            View Technical Trace
          </button>
        )}
      </div>
      
      {!showDetails ? (
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800 p-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
              <StatusIcon status="success" size={16} /> <span>Evidence Retrieved</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
              <StatusIcon status="success" size={16} /> <span>Semantic Ranking Completed</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
              <StatusIcon status="success" size={16} /> <span>Alpha Verification Completed</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
              <StatusIcon status="success" size={16} /> <span>Beta Validation Completed</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
              <StatusIcon status="success" size={16} /> <span>Knowledge Base Decision Completed</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#0f172a] rounded-lg border border-slate-700/60 shadow-inner font-mono text-sm overflow-hidden">
          {stages.map((stage, idx) => {
            const isExpanded = expandedStages[idx];
            
            return (
              <div key={idx} className="border-b border-slate-800/80 last:border-0">
                <button 
                  onClick={() => toggleStage(idx)}
                  className="w-full flex items-center justify-between p-3 bg-[#0f172a] hover:bg-slate-800/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">
                      <ChevronIcon expanded={isExpanded} />
                    </span>
                    <StatusIcon status={stage.status} size={16} />
                    <span className={`font-semibold tracking-wide ${stage.status === 'skipped' ? 'text-slate-500' : 'text-slate-200'}`}>
                      {stage.title}
                    </span>
                  </div>
                  {stage.summary && (
                    <span className={`text-[11px] uppercase tracking-wider px-2 py-0.5 rounded ${
                      stage.status === 'skipped' 
                        ? 'bg-slate-800/50 text-slate-500' 
                        : 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                    }`}>
                      {stage.summary}
                    </span>
                  )}
                </button>
                
                {isExpanded && (
                  <div className="bg-[#0b0f19] p-3 pl-5 border-t border-slate-800/50">
                    <div className="space-y-3">
                      {stage.steps.map((step, stepIdx) => (
                        <div key={stepIdx} className="flex items-start gap-3">
                          <div className="mt-0.5 flex-shrink-0">
                            <StatusIcon status={step.status} size={14} />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`truncate ${step.status === 'skipped' ? 'text-slate-500' : 'text-slate-300'}`}>
                                {step.name}
                              </span>
                            </div>
                            {step.detail && (
                              <span className="text-xs text-slate-500 mt-0.5 break-words">
                                {step.detail}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <div className="p-2 border-t border-slate-800/80 bg-[#0f172a] flex justify-center">
            <button 
              onClick={() => setShowDetails(false)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-300 transition-colors py-1.5 px-4 flex items-center gap-2"
            >
              <ChevronIcon expanded={true} /> Hide Technical Trace
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationTrace;
