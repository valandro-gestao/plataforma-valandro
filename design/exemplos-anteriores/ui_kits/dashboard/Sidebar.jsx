function Sidebar({ active }) {
  const items = [
    { key: 'overview', label: 'Visão Geral', icon: '▦' },
    { key: 'cashflow', label: 'Fluxo de Caixa', icon: '↕' },
    { key: 'dre', label: 'DRE Gerencial', icon: '≡' },
    { key: 'clients', label: 'Clientes', icon: '◎' },
    { key: 'settings', label: 'Configurações', icon: '⚙' },
  ];
  return (
    <div style={{ width: 232, background: 'var(--navy-900)', color: '#fff', display: 'flex', flexDirection: 'column', padding: '24px 16px', gap: 4, flexShrink: 0 }}>
      <img src="../../../../design-system/assets/logo-valandro-white.png" style={{ width: 148, marginBottom: 36, marginLeft: 8 }} alt="Valandro Gestão" />
      {items.map((it) => (
        <div key={it.key} style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px', borderRadius: 'var(--radius-md)',
          fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, cursor: 'pointer',
          background: it.key === active ? 'rgba(255,255,255,.08)' : 'transparent',
          color: it.key === active ? '#fff' : 'rgba(255,255,255,.65)',
        }}>
          <span style={{ width: 18, textAlign: 'center', color: it.key === active ? 'var(--blue-500)' : 'inherit' }}>{it.icon}</span>
          {it.label}
        </div>
      ))}
      <div style={{ marginTop: 'auto', fontSize: 12, color: 'rgba(255,255,255,.4)', padding: '0 12px' }}>Seu mais valioso parceiro rumo ao sucesso.</div>
    </div>
  );
}
window.Sidebar = Sidebar;
