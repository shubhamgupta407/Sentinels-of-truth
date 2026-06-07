import React, { useState } from 'react';
import Header from './components/Header';
import SystemWorkflow from './components/ui/SystemWorkflow';
import AgentArchitecture from './components/ui/AgentArchitecture';
import VerificationBox from './components/VerificationBox';
import ResultPanel from './components/ResultPanel';
import AuditLogsView from './components/views/AuditLogsView';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'architecture', 'audit'

  const handleVerify = async (claim) => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/v1/verify/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ claim }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'An error occurred during verification.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-50 selection:bg-brand-500/30">
      {/* Decorative subtle gradient background */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-brand-900/20 to-transparent pointer-events-none"></div>

      {/* Main Dashboard View */}
      {currentView === 'dashboard' && (
        <main className="max-w-3xl mx-auto px-4 py-12 md:py-20 relative z-10">
          <Header 
            onOpenArchitecture={() => setCurrentView('architecture')} 
            onOpenAudit={() => setCurrentView('audit')}
          />
          <SystemWorkflow />
          
          <VerificationBox 
            onVerify={handleVerify} 
            onClear={handleClear} 
            isLoading={isLoading} 
          />

          {error && (
            <div className="p-4 mb-8 text-sm text-rose-200 bg-rose-950/50 border border-rose-900/50 rounded-md">
              {error}
            </div>
          )}

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            <ResultPanel result={result} />
          </div>
        </main>
      )}

      {/* Architecture Page View */}
      {currentView === 'architecture' && (
        <main className="max-w-4xl mx-auto px-4 py-12 md:py-20 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-8">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="text-sm font-medium text-slate-400 hover:text-white bg-slate-900/50 hover:bg-slate-800 flex items-center gap-2 px-4 py-2 rounded-md transition-all border border-slate-800 hover:border-slate-700 w-fit"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back to Dashboard
            </button>
          </div>
          
          <div className="mt-4">
            <AgentArchitecture result={result} />
          </div>
        </main>
      )}

      {/* Audit Logs View */}
      {currentView === 'audit' && (
        <main className="max-w-5xl mx-auto px-4 py-12 md:py-20 relative z-10">
          <AuditLogsView onBack={() => setCurrentView('dashboard')} />
        </main>
      )}
      
      <footer className="text-center pb-8 text-sm text-slate-500 mt-12 relative z-10">
        <p>Sentinels of Truth Verification System v0.1.0</p>
      </footer>
    </div>
  );
}

export default App;
