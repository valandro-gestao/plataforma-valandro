import React from 'react';

export function Checkbox({ label, checked, onChange, disabled = false }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--text-primary)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
      <span
        onClick={() => !disabled && onChange && onChange(!checked)}
        style={{
          width: 18, height: 18, borderRadius: 'var(--radius-sm)',
          border: checked ? '1px solid var(--blue-500)' : '1px solid var(--border-default)',
          background: checked ? 'var(--blue-500)' : '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background var(--duration-fast)',
        }}
      >
        {checked && <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4.5L4 7.5L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </span>
      {label}
    </label>
  );
}
