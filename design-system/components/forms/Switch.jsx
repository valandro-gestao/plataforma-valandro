import React from 'react';

export function Switch({ checked, onChange, disabled = false, label }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--text-primary)' }}>
      <span
        onClick={() => !disabled && onChange && onChange(!checked)}
        style={{
          width: 40, height: 22, borderRadius: 'var(--radius-full)',
          background: checked ? 'var(--blue-500)' : 'var(--gray-200)',
          position: 'relative', transition: 'background var(--duration-fast)',
        }}
      >
        <span style={{
          position: 'absolute', top: 2, left: checked ? 20 : 2,
          width: 18, height: 18, borderRadius: '50%', background: '#fff',
          boxShadow: 'var(--shadow-sm)', transition: 'left var(--duration-fast) var(--ease-standard)',
        }} />
      </span>
      {label}
    </label>
  );
}
