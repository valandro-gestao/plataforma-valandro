import React from 'react';

export function Card({ title, subtitle, footer, children }) {
  return (
    <div style={{
      background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)',
      padding: 'var(--space-6)', fontFamily: 'var(--font-body)', color: 'var(--text-primary)',
    }}>
      {title && <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: subtitle ? '4px' : '12px' }}>{title}</div>}
      {subtitle && <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: '12px' }}>{subtitle}</div>}
      {children}
      {footer && <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>{footer}</div>}
    </div>
  );
}
