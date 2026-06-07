import React, { useState, useEffect } from 'react';
import Badge from '../ui/Badge';
import VerificationTrace from '../ui/VerificationTrace';

const AuditLogsView = ({ onBack }) => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://sentinels-of-truth-api.onrender.com';
        const response = await fetch(`${API_BASE_URL}/api/v1/audit-logs/`);
        if (!response.ok) {
          throw new Error('Failed to fetch audit logs');
        }
        const data = await response.json();
        setLogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const toggleRow = (index) => {
    setExpandedRows(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.claim.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (filter === 'All') return true;
    if (filter === 'Verified') return log.status === 'VERIFIED';
    if (filter === 'Unverified') return log.status === 'UNVERIFIED';
    if (filter === 'Inserted') return log.db_action === 'INSERT';
    if (filter === 'Discarded') return log.db_action === 'DISCARD';
    if (filter === 'Flagged') return log.db_action === 'FLAG';
    return true;
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="text-sm font-medium text-slate-400 hover:text-white bg-slate-900/50 hover:bg-slate-800 flex items-center gap-2 px-4 py-2 rounded-md transition-all border border-slate-800 hover:border-slate-700 w-fit"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Dashboard
        </button>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
          Audit Logs
        </h2>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row gap-4 justify-between bg-slate-900/50">
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Search claims..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-sm rounded-md pl-9 pr-3 py-2 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
            />
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {['All', 'Verified', 'Unverified', 'Inserted', 'Discarded', 'Flagged'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-md whitespace-nowrap transition-colors border ${
                  filter === f 
                    ? 'bg-brand-500/20 text-brand-300 border-brand-500/30' 
                    : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table / List */}
        <div className="divide-y divide-slate-800 min-h-[300px]">
          {isLoading ? (
            <div className="p-12 text-center text-slate-500 flex justify-center items-center h-full">
              <svg className="animate-spin h-5 w-5 text-brand-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading verification history...
            </div>
          ) : error ? (
            <div className="p-12 text-center text-rose-400">
              {error}
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              {logs.length === 0 ? "No verification history yet." : "No logs match your filters."}
            </div>
          ) : (
            filteredLogs.map((log, idx) => {
              const isExpanded = expandedRows[idx];
              const date = new Date(log.timestamp + 'Z');
              const day = String(date.getDate()).padStart(2, '0');
              const month = date.toLocaleString('en-US', { month: 'short' });
              const year = date.getFullYear();
              let hours = date.getHours();
              const minutes = String(date.getMinutes()).padStart(2, '0');
              const ampm = hours >= 12 ? 'PM' : 'AM';
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
              
              return (
                <div key={idx} className={`transition-colors ${isExpanded ? 'bg-slate-900' : 'bg-slate-900/50 hover:bg-slate-800/50'}`}>
                  {/* Summary Row */}
                  <div 
                    onClick={() => toggleRow(idx)}
                    className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                          {formattedDate}
                        </span>
                        {log.confidence > 0 && (
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                            {log.confidence}% CONF
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-slate-200 truncate pr-4">
                        {log.claim}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge variant={log.status === 'VERIFIED' ? 'verified' : 'unverified'}>
                        {log.status}
                      </Badge>
                      <Badge variant={
                        log.db_action === 'INSERT' ? 'new' : 
                        log.db_action === 'FLAG' ? 'conflict' : 'neutral'
                      }>
                        {log.db_action}
                      </Badge>
                      <svg 
                        className={`w-4 h-4 text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Expanded View */}
                  {isExpanded && (
                    <div className="px-4 pb-6 pt-2 border-t border-slate-800/50 bg-[#0f172a] shadow-inner">
                      <div className="mb-6">
                        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Claim</h5>
                        <p className="text-sm text-slate-200">{log.claim}</p>
                      </div>
                      
                      <div className="mb-6">
                        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Explanation</h5>
                        <p className="text-sm text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-md border border-slate-800">
                          {log.reason}
                        </p>
                      </div>

                      {log.evidence && (
                        <div className="mb-6">
                          <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Evidence Snippet</h5>
                          <div className="text-xs text-slate-400 leading-relaxed bg-slate-950 p-3 rounded-md border border-slate-800 max-h-40 overflow-y-auto whitespace-pre-wrap">
                            {log.evidence}
                          </div>
                        </div>
                      )}

                      <div className="mt-4">
                        <VerificationTrace result={log} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditLogsView;
