import React from 'react';

const steps = [
  {
    title: 'Claim Submission',
    desc: 'User submits a factual statement.',
  },
  {
    title: 'Evidence Collection',
    desc: 'External evidence is retrieved.',
  },
  {
    title: 'Alpha Agent Verification',
    desc: 'Claim is validated against evidence.',
  },
  {
    title: 'Beta Agent Validation',
    desc: 'Knowledge base is checked for redundancy and contradictions.',
  },
  {
    title: 'Knowledge Base Decision',
    desc: 'Claim is inserted, discarded, or flagged.',
  },
];

const SystemWorkflow = () => {
  return (
    <div className="mb-14">
      <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
        System Workflow
      </h2>
      
      <div className="relative">
        {/* Continuous connector line for desktop */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-slate-800 -translate-y-1/2 z-0"></div>
        
        <div className="flex flex-col md:flex-row gap-4 relative z-10">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 flex flex-col group">
              <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800/80 rounded-xl p-4 shadow-lg hover:border-brand-500/50 transition-all text-left relative overflow-hidden h-full">
                {/* Subtle top accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-800 group-hover:bg-brand-500 transition-colors"></div>
                
                <div className="flex items-center gap-2 mb-2 mt-1">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-400 font-mono group-hover:bg-brand-500/20 group-hover:text-brand-400 transition-colors ring-4 ring-slate-950">
                    {index + 1}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-200">{step.title}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
              
              {/* Mobile connector */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center py-2 text-slate-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemWorkflow;
