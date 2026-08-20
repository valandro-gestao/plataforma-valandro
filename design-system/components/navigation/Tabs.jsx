import React from 'react';

export function Tabs({ items = [], active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-6)', borderBottom: '1px solid var(--border-subtle)', fontFamily: 'var(--font-display)' }}>
      {items.map((it) => {
        const isActive = it.value === active;
        return (
          <div key={it.value} onClick={() => onChange && onChange(it.value)} style={{
            padding: '10px 2px', cursor: 'pointer', fontSize: 'var(--text-base)', fontWeight: 600,
            color: isActive ? 'var(--blue-600)' : 'var(--text-secondary)',
            borderBottom: isActive ? '2px solid var(--blue-500)' : '2px solid transparent',
            marginBottom: '-1px', transition: 'color var(--duration-fast)',
          }}>{it.label}</div>
        );
      })}
    </div>
  );
}
