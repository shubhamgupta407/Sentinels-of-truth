import React from 'react';
import Badge from '../ui/Badge';
import EvidencePanel from '../ui/EvidencePanel';
import VerificationTrace from '../ui/VerificationTrace';

const StandardView = ({ result }) => {
  const { status, verdict, db_action, confidence, reason, evidence } = result;

  // Map backend status/verdict to our badge variant
  let variant = 'neutral';
  let title = 'Analysis Complete';

  if (status === 'VERIFIED') {
    variant = 'verified';
    title = 'Claim Verified';
    if (db_action === 'INSERT' && verdict === 'new') {
      variant = 'new';
      title = 'New Verified Fact';
    }
  } else if (status === 'UNVERIFIED') {
    variant = 'unverified';
    title = 'Claim Unverified';
  }

  if (db_action === 'DISCARD' && verdict === 'redundant') {
    variant = 'redundant';
    title = 'Redundant Fact';
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      <div className={`h-1 w-full ${getAccentColor(variant)}`}></div>
      <div className="p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 border-b border-slate-100 pb-4">
          <h3 className="text-xl font-semibold text-slate-800 mb-3 md:mb-0">{title}</h3>
          <div className="flex items-center gap-3">
            {confidence > 0 && (
              <span className="text-sm font-semibold text-slate-600">
                Confidence: {confidence}%
              </span>
            )}
            <Badge variant={variant}>
              {status} {verdict === 'new' ? '(NEW)' : ''}
            </Badge>
          </div>
        </div>

        <div className="text-sm text-slate-700 leading-relaxed max-w-none mb-4">
          <p>{reason}</p>
        </div>

        {(db_action === 'DISCARD' && verdict === 'redundant') && (
          <p className="text-sm text-slate-500 italic mt-2">
            This claim has already been verified and exists in the knowledge base.
          </p>
        )}

        <EvidencePanel evidence={evidence} />
        
        <VerificationTrace result={result} />
      </div>
    </div>
  );
};

function getAccentColor(variant) {
  switch (variant) {
    case 'verified': return 'bg-emerald-500';
    case 'new': return 'bg-emerald-500';
    case 'unverified': return 'bg-amber-500';
    case 'redundant': return 'bg-slate-400';
    default: return 'bg-slate-200';
  }
}

export default StandardView;
