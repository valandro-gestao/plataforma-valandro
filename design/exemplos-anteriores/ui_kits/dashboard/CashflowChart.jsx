function CashflowChart() {
  const bars = [62, 74, 55, 80, 68, 90, 72, 85, 60, 95, 88, 100];
  const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 180, padding: '0 4px' }}>
      {bars.map((h, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: '100%', height: h, borderRadius: 4, background: i === bars.length - 1 ? 'var(--blue-500)' : 'var(--blue-100)' }} />
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>{months[i]}</span>
        </div>
      ))}
    </div>
  );
}
window.CashflowChart = CashflowChart;
