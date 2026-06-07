import React, { useState } from 'react';

const VerificationBox = ({ onVerify, onClear, isLoading }) => {
  const [claim, setClaim] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (claim.trim()) {
      onVerify(claim);
    }
  };

  const handleClear = () => {
    setClaim('');
    onClear();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] p-1 mb-8 overflow-hidden relative group">
      {/* Subtle glowing ring effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-500/0 via-brand-500/10 to-brand-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl"></div>
      
      <form onSubmit={handleSubmit} className="bg-slate-950/50 rounded-lg p-5 relative z-10">
        <div className="mb-3 flex items-center justify-between">
          <label htmlFor="claim" className="flex items-center gap-2 text-sm font-semibold text-slate-200">
            <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            Query the Knowledge Base
          </label>
        </div>
        
        <div className="relative">
          <textarea
            id="claim"
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            disabled={isLoading}
            rows={3}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-4 text-slate-100 placeholder-slate-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all shadow-inner disabled:bg-slate-900/50 resize-none font-medium text-[15px]"
            placeholder="Enter a Claim to verify..."
          />
          <div className="absolute bottom-3 right-3 text-xs font-mono text-slate-500 pointer-events-none">
            {claim.length} chars
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Verification takes ~3-8 sec
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClear}
              disabled={isLoading || !claim}
              className="px-4 py-2 text-sm font-medium text-slate-400 bg-transparent hover:bg-slate-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={isLoading || !claim.trim()}
              className="px-6 py-2 bg-brand-600 text-white text-sm font-semibold rounded-lg hover:bg-brand-500 shadow-[0_0_15px_rgba(2,132,199,0.4)] hover:shadow-[0_0_20px_rgba(2,132,199,0.6)] focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Execute Verification
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7-7m7-7H3" /></svg>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerificationBox;
