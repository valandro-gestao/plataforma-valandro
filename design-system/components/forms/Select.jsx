import React from 'react';

export function Select({ label, options = [], value, onChange, placeholder = 'Selecione' }) {
  return (
    <div style={{ fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && <label style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>{label}</label>}
      <select
        value={value}
        onChange={onChange}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          padding: '10px 14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-default)',
          background: '#fff',
          color: 'var(--text-primary)',
          outline: 'none',
        }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
