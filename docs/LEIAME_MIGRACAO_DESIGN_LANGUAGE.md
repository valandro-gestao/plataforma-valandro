# LEIAME — Migração da Design Language Valandro (conta pessoal → plataforma-valandro)

## O que este pacote contém

```
migration-package-design-language/
├── docs/
│   └── DESIGN_LANGUAGE_VALANDRO.md      ← fonte: 03_DESIGN_LANGUAGE.md (íntegro) + Apêndices A/B (novos, não normativos)
├── design/
│   └── exemplos-valandro-gestao/
│       ├── proposta-comercial.dc.html    ← fonte: "Proposta Comercial.dc.html"
│       ├── relatorio-executivo.dc.html   ← fonte: "Relatorio Executivo.dc.html"
│       ├── dashboard-financeiro.dc.html  ← fonte: "Dashboard Financeiro.dc.html"
│       ├── carrossel-instagram.dc.html   ← fonte: "Carrossel Instagram.dc.html"
│       ├── support.js                    ← runtime necessário para os 4 arquivos .dc.html (starter técnico)
│       ├── doc-page.js                   ← starter usado por proposta-comercial e relatorio-executivo
│       ├── deck-stage.js                 ← starter usado por carrossel-instagram
│       └── assets/
│           ├── photo-office-real.png     ← usado por proposta-comercial, dashboard-financeiro e carrossel-instagram
│           └── hex-pattern.svg           ← usado por proposta-comercial e carrossel-instagram
└── LEIAME_MIGRACAO.md
```

## Renomeações feitas apenas por limitação deste ambiente

Os quatro arquivos-fonte tinham nomes com espaço e acento (`Proposta Comercial.dc.html`, `Relatorio Executivo.dc.html`, `Dashboard Financeiro.dc.html`, `Carrossel Instagram.dc.html`) — convenção normal do ambiente de origem. Foram renomeados para kebab-case sem acento (`proposta-comercial.dc.html` etc.) só para adequação a um repositório de código. **Reverter ou não essa convenção de nome fica a critério do padrão de nomenclatura já usado em `plataforma-valandro`** — não é uma decisão de design, é só higiene de path.

## Dependência do Design System externo (NÃO incluído neste pacote)

Os quatro arquivos referenciam, via `<link>`/`<script src>` relativos, o pacote `_ds/valandro-gest-o-design-system-ae6096a3-4b48-445b-9efa-51f523c0053f/` (tokens CSS, `styles.css` e, no caso do Dashboard, `_ds_bundle.js` com os componentes React). Esse Design System **já está sendo empacotado separadamente** em outro projeto e não foi duplicado aqui, por instrução explícita.

Para os quatro exemplos renderizarem depois da migração, é necessário que, no repositório de destino, a pasta do Design System fique acessível no mesmo caminho relativo `_ds/valandro-gest-o-design-system-ae6096a3-4b48-445b-9efa-51f523c0053f/` a partir de `design/exemplos-valandro-gestao/` — ou que os caminhos sejam ajustados manualmente após a migração dos dois pacotes.

Uso por peça:
- **proposta-comercial** e **relatorio-executivo**: usam apenas os tokens CSS (`colors.css`, `typography.css`, `spacing.css`, `effects.css`) e `styles.css` — não usam `_ds_bundle.js`.
- **dashboard-financeiro**: usa os tokens, `styles.css` e também `_ds_bundle.js` (componentes Button, Card, Badge, Tag, Select, Tabs).
- **carrossel-instagram**: usa os tokens e `styles.css` — não usa `_ds_bundle.js`.

Nenhum arquivo do Design System foi copiado aqui — nem tokens, nem `_ds_bundle.js`, nem guidelines, nem uploads originais.

## Descartado, e por quê

- `debug-logo-color.png` e `debug-logo-white-on-navy.png` — artefatos temporários criados só para inspecionar o logotipo durante a análise geométrica (Apêndice A do documento). Não têm valor além do que já está escrito no apêndice.
- Iterações visuais anteriores às versões finais das quatro peças (ex.: versão do Relatório Executivo com estética de livro-razão antigo, rejeitada; versões com kicker/linha azul/grid de cards genérico) — não foram preservadas como arquivo porque a lição de cada rejeição já está registrada no Apêndice B do `DESIGN_LANGUAGE_VALANDRO.md`. Preservar o arquivo rejeitado não adiciona conhecimento além do que já está escrito.

## Confirmação de origem

O conteúdo normativo de `DESIGN_LANGUAGE_VALANDRO.md` (seções 1 a 7) é cópia literal de `03_DESIGN_LANGUAGE.md`, lido diretamente do arquivo-fonte nesta sessão — não foi reconstruído por memória. Os Apêndices A e B são novos, escritos a partir do histórico desta conversa, e estão marcados como não normativos dentro do próprio documento.

## Segurança desta migração

Nenhum arquivo-fonte original foi alterado, movido ou apagado. Este pacote é uma cópia independente dentro do mesmo projeto pessoal, pronta para ser transferida para `plataforma-valandro` por fora desta ferramenta (download/cópia manual). Nenhum commit ou push foi realizado.
