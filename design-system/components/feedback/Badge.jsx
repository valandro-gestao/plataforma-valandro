import React from 'react';

const tones = {
  neutral: { bg: 'var(--gray-100)', color: 'var(--gray-700)' },
  positive: { bg: 'var(--status-positive-bg)', color: 'var(--status-positive)' },
  negative: { bg: 'var(--status-negative-bg)', color: 'var(--status-negative)' },
  warning: { bg: 'var(--status-warning-bg)', color: 'var(--status-warning)' },
  brand: { bg: 'var(--blue-50)', color: 'var(--blue-700)' },
};

export function Badge({ tone = 'neutral', children }) {
  const t = tones[tone] || tones.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      background: t.bg, color: t.color, fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)', fontWeight: 600, padding: '4px 10px',
      borderRadius: 'var(--radius-full)', lineHeight: 1.4,
    }}>{children}</span>
  );
}
