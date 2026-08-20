import React from 'react';

export function Tag({ children, onRemove }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      background: 'var(--gray-50)', border: '1px solid var(--border-default)',
      color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
      padding: '5px 10px', borderRadius: 'var(--radius-md)',
    }}>
      {children}
      {onRemove && (
        <span onClick={onRemove} style={{ cursor: 'pointer', color: 'var(--text-muted)' }}>✕</span>
      )}
    </span>
  );
}
