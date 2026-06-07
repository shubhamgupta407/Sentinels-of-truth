import React from 'react';
import ConflictView from './views/ConflictView';
import StandardView from './views/StandardView';

const ResultPanel = ({ result }) => {
  if (!result) return null;

  // Render the specific Conflict view if the beta agent flagged a contradiction
  if (result.db_action === 'FLAG' && result.verdict === 'conflict') {
    return <ConflictView result={result} />;
  }

  // Fallback to the standard view for VERIFIED, UNVERIFIED, NEW, REDUNDANT
  return <StandardView result={result} />;
};

export default ResultPanel;
