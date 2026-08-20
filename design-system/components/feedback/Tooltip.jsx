import React from 'react';

export function Tooltip({ label, children }) {
  const [show, setShow] = React.useState(false);
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <span style={{
          position: 'absolute', bottom: '125%', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--navy-900)', color: '#fff', fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)', padding: '6px 10px', borderRadius: 'var(--radius-sm)',
          whiteSpace: 'nowrap', boxShadow: 'var(--shadow-md)', zIndex: 10,
        }}>{label}</span>
      )}
    </span>
  );
}
