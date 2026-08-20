# UI Kit — Dashboard financeiro

Recriação interativa de um painel de gestão financeira executiva da Valandro Gestão. Compõe os primitivos do design system (`Card`, `Badge`, `Tabs`, `Button`, `Select`) e não reimplementa nenhum deles.

## Arquivos

- `index.html` — tela montada e clicável (abas Visão Geral / Fluxo de Caixa)
- `Sidebar.jsx` — navegação lateral navy, logo branco, tagline no rodapé
- `TopBar.jsx` — saudação, subtítulo contextual e ações
- `CashflowChart.jsx` — gráfico de barras de fluxo de caixa (12 meses)

## Interações

- Alternar entre **Visão Geral** (4 KPIs + gráfico + transações recentes) e **Fluxo de Caixa** (projeção + 3 totalizadores) pelas `Tabs`.
- Itens da sidebar refletem a aba ativa.

## Notas

- Os `.jsx` desta pasta são carregados em runtime por `<script type="text/babel">` e registram-se em `window` (não têm `.d.ts`, portanto não entram no bundle como componentes do design system — são telas, não primitivos).
- Dados são fictícios, no formato real da marca (`R$ 128.400`, `24/07/2026`).
- Ícones da sidebar são glifos Unicode — substituição declarada; ver seção Iconografia no `readme.md` da raiz.
