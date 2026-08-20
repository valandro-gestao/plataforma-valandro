import React from 'react';

const sizes = {
  sm: { padding: '6px 14px', fontSize: 'var(--text-sm)' },
  md: { padding: '10px 20px', fontSize: 'var(--text-base)' },
  lg: { padding: '13px 26px', fontSize: 'var(--text-md)' },
};

const variants = {
  primary: { background: 'var(--blue-500)', color: '#fff', border: '1px solid transparent' },
  secondary: { background: 'var(--navy-900)', color: '#fff', border: '1px solid transparent' },
  outline: { background: 'transparent', color: 'var(--gray-900)', border: '1px solid var(--border-default)' },
  ghost: { background: 'transparent', color: 'var(--gray-700)', border: '1px solid transparent' },
};

const hoverBg = {
  primary: 'var(--blue-600)',
  secondary: 'var(--navy-800)',
  outline: 'var(--gray-50)',
  ghost: 'var(--gray-50)',
};

export function Button({ variant = 'primary', size = 'md', disabled = false, icon = null, children, onClick }) {
  const [hover, setHover] = React.useState(false);
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;
  const style = {
    ...v,
    ...s,
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    borderRadius: 'var(--radius-md)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'background var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard)',
    background: hover && !disabled ? hoverBg[variant] : v.background,
    transform: hover && !disabled ? 'translateY(-1px)' : 'none',
  };
  return (
    <button
      style={style}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {icon}
      {children}
    </button>
  );
}
