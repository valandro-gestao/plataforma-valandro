import React from 'react';

export function Radio({ label, checked, onChange, disabled = false }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--text-primary)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
      <span
        onClick={() => !disabled && onChange && onChange()}
        style={{
          width: 18, height: 18, borderRadius: '50%',
          border: checked ? '5px solid var(--blue-500)' : '1px solid var(--border-default)',
          background: '#fff',
          transition: 'border var(--duration-fast)',
        }}
      />
      {label}
    </label>
  );
}
