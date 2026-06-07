import React from 'react';

const Badge = ({ children, variant = 'neutral' }) => {
  const baseStyle = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider";
  
  const variants = {
    verified: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    unverified: "bg-amber-50 text-amber-700 border border-amber-200",
    conflict: "bg-rose-50 text-rose-700 border border-rose-200",
    redundant: "bg-blue-50 text-blue-700 border border-blue-200",
    neutral: "bg-slate-50 text-slate-700 border border-slate-200",
    new: "bg-emerald-50 text-emerald-700 border border-emerald-200"
  };

  return (
    <span className={`${baseStyle} ${variants[variant] || variants.neutral}`}>
      {children}
    </span>
  );
};

export default Badge;
