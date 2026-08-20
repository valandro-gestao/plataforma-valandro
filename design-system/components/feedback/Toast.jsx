import React from 'react';

const tones = {
  info: { bg: 'var(--navy-900)', color: '#fff' },
  positive: { bg: 'var(--status-positive)', color: '#fff' },
  negative: { bg: 'var(--status-negative)', color: '#fff' },
};

export function Toast({ tone = 'info', children, onClose }) {
  const t = tones[tone] || tones.info;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '12px',
      background: t.bg, color: t.color, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
      padding: '12px 16px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)',
      minWidth: 260,
    }}>
      <span style={{ flex: 1 }}>{children}</span>
      {onClose && <span onClick={onClose} style={{ cursor: 'pointer', opacity: .8 }}>✕</span>}
    </div>
  );
}
