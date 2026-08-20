# Exemplos aplicados — Design Language v1.0

As quatro peças finais validadas, migradas do projeto pessoal sem redesign. São **exemplos aplicados**, não regras: nada aqui promove automaticamente um elemento a token, componente ou guideline. A norma continua em `docs/DESIGN_LANGUAGE_VALANDRO.md`.

| Arquivo | Peça | Consome do Design System |
| --- | --- | --- |
| `proposta-comercial.dc.html` | Proposta Comercial (documento paginado) | `../../design-system/tokens/*.css`, `../../design-system/styles.css`, `../../design-system/assets/hex-pattern.svg`, `../../design-system/assets/photo-office-real.png` |
| `relatorio-executivo.dc.html` | Relatório Executivo (documento paginado) | `../../design-system/tokens/*.css` |
| `dashboard-financeiro.dc.html` | Dashboard Financeiro (produto real) | `../../design-system/tokens/*.css`, `../../design-system/styles.css`, `../../design-system/_ds_bundle.js` (Button, Card, Badge, Tag, Select, Tabs) |
| `carrossel-instagram.dc.html` | Carrossel Instagram | `../../design-system/tokens/*.css`, `../../design-system/styles.css`, `../../design-system/assets/*` |

Runtimes que acompanham o pacote (starters técnicos, não design): `support.js` (runtime dos `.dc.html`), `doc-page.js` (proposta e relatório), `deck-stage.js` (carrossel).

## Adaptações feitas na migração

Somente caminhos e namespace:

- `_ds/valandro-gest-o-design-system-ae6096.../` → `../../design-system/tokens/`, `../../design-system/styles.css`, `../../design-system/_ds_bundle.js`
- `assets/` → `../../design-system/assets/` (nenhum asset duplicado; `photo-office-real.png` já existia no Design System)
- namespace React `ValandroGestODesignSystem_ae6096` → `ValandroGestODesignSystem_e4cc4d`

Nenhum valor visual, texto, layout ou token foi alterado.

## Nomenclatura

Os nomes originais tinham espaço e acento (`Proposta Comercial.dc.html` etc.); o kebab-case atual veio do pacote de migração e é higiene de path, não decisão de design.
