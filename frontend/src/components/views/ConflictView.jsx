import React from 'react';
import Badge from '../ui/Badge';
import EvidencePanel from '../ui/EvidencePanel';
import VerificationTrace from '../ui/VerificationTrace';

const ConflictView = ({ result }) => {
  const { 
    claim, 
    status, 
    confidence, 
    reason, 
    evidence,
    conflicting_fact_id,
    stored_claim,
    similarity_score,
    stored_status
  } = result;

  const formattedSimilarity = similarity_score ? (similarity_score * 100).toFixed(1) : null;

  return (
    <div className="bg-white border border-rose-200 rounded-lg shadow-sm overflow-hidden">
      <div className="h-1 w-full bg-rose-500"></div>
      
      <div className="p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-rose-100 pb-4">
          <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2 mb-3 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Conflict Detected
          </h3>
          <Badge variant="conflict">FLAGGED</Badge>
        </div>

        <div className="text-sm text-slate-700 leading-relaxed font-medium mb-8">
          <p>{reason}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-center mb-8">
          {/* Incoming Claim Box */}
          <div className="border border-slate-200 rounded-md p-5 bg-slate-50 h-full">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Incoming Claim</div>
            <p className="text-slate-800 font-medium text-base">{claim}</p>
            <div className="mt-4 flex items-center gap-2 pt-3 border-t border-slate-200">
              <span className="text-xs font-semibold text-slate-500">Eval:</span>
              <Badge variant="unverified">{status}</Badge>
            </div>
          </div>

          {/* VS Separator */}
          <div className="hidden md:flex flex-col items-center justify-center text-slate-300 font-bold text-sm px-2">
            <div className="h-10 border-l border-slate-200 mb-2"></div>
            VS
            <div className="h-10 border-l border-slate-200 mt-2"></div>
          </div>
          <div className="md:hidden flex justify-center text-slate-300 font-bold text-sm">
            VS
          </div>

          {/* Stored Fact Box */}
          <div className="border border-rose-200 rounded-md p-5 bg-rose-50/50 h-full">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold text-rose-700 uppercase tracking-wider">Stored Knowledge Base Fact</div>
              <span className="text-xs text-rose-500 font-mono bg-rose-100 px-1.5 py-0.5 rounded">ID: #{conflicting_fact_id}</span>
            </div>
            <p className="text-slate-800 font-medium text-base">{stored_claim}</p>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-rose-200">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Status:</span>
                <Badge variant={stored_status === 'VERIFIED' ? 'verified' : 'neutral'}>
                  {stored_status}
                </Badge>
              </div>
              {formattedSimilarity && (
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                  {formattedSimilarity}% Sim
                </span>
              )}
            </div>
          </div>
        </div>

        <EvidencePanel evidence={evidence} />
        
        <VerificationTrace result={result} />
      </div>
    </div>
  );
};

export default ConflictView;
