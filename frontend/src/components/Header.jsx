import React from 'react';

const Header = ({ onOpenArchitecture, onOpenAudit }) => {
  return (
    <header className="mb-12 border-b border-slate-800/60 pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-500 text-white rounded-lg flex items-center justify-center font-bold font-mono text-xl shadow-[0_0_15px_rgba(2,132,199,0.5)]">
            S
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Sentinels of Truth
          </h1>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono text-slate-400 bg-slate-900/80 px-2 py-1 rounded border border-slate-800">
            v0.1.0-alpha
          </span>
          <button 
            onClick={onOpenArchitecture}
            className="text-sm font-medium text-slate-300 bg-slate-900/50 hover:bg-slate-800 flex items-center gap-2 px-3 py-1.5 rounded-md transition-all border border-slate-700 shadow-sm hover:shadow-md hover:border-slate-600"
          >
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            System Architecture
          </button>
          <button 
            onClick={onOpenAudit}
            className="text-sm font-medium text-slate-300 bg-slate-900/50 hover:bg-slate-800 flex items-center gap-2 px-3 py-1.5 rounded-md transition-all border border-slate-700 shadow-sm hover:shadow-md hover:border-slate-600"
          >
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
            Audit Logs
          </button>
        </div>
      </div>

      <div className="max-w-2xl mt-8">
        <h2 className="text-lg font-semibold text-slate-200 mb-2">
          Fact Verification & Knowledge Base
        </h2>
        <p className="text-slate-400 leading-relaxed">
          A pipeline that checks input claims against web search results to determine if they are true. 
          Verified facts are checked against local records to prevent duplicates and flag contradictions 
          before being saved to the database.
        </p>
      </div>
    </header>
  );
};

export default Header;
