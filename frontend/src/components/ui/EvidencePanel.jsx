import React from 'react';

const EvidencePanel = ({ evidence }) => {
  if (!evidence) return null;

  return (
    <details className="mt-4 group border border-slate-200 rounded-md overflow-hidden bg-white">
      <summary className="px-4 py-3 bg-slate-50 cursor-pointer text-sm font-medium text-slate-700 hover:bg-slate-100 list-none flex items-center justify-between transition-colors">
        <span>View Supporting Evidence</span>
        <span className="text-slate-400 group-open:rotate-180 transition-transform">
          ▼
        </span>
      </summary>
      <div className="p-4 text-sm text-slate-600 border-t border-slate-200 whitespace-pre-wrap leading-relaxed">
        {evidence}
      </div>
    </details>
  );
};

export default EvidencePanel;
