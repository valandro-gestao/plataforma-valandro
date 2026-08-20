import React from 'react';

export function Dialog({ open, title, children, onClose, actions }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(10,30,46,.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)',
        width: 400, padding: 'var(--space-6)', fontFamily: 'var(--font-body)',
      }}>
        {title && <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '10px', color: 'var(--text-primary)' }}>{title}</div>}
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: '20px' }}>{children}</div>
        {actions && <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>{actions}</div>}
      </div>
    </div>
  );
}
