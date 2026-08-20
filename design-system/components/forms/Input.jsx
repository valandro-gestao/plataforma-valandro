import React from 'react';

export function Input({ label, placeholder = '', type = 'text', value, onChange, error, helpText, disabled = false }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{ fontFamily: 'var(--font-body)', display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && <label style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          padding: '10px 14px',
          borderRadius: 'var(--radius-md)',
          border: error ? '1px solid var(--status-negative)' : focus ? '1px solid var(--blue-500)' : '1px solid var(--border-default)',
          outline: 'none',
          boxShadow: focus ? '0 0 0 3px var(--blue-50)' : 'none',
          background: disabled ? 'var(--gray-50)' : '#fff',
          color: 'var(--text-primary)',
          transition: 'border-color var(--duration-fast), box-shadow var(--duration-fast)',
        }}
      />
      {error ? (
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--status-negative)' }}>{error}</span>
      ) : helpText ? (
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{helpText}</span>
      ) : null}
    </div>
  );
}
