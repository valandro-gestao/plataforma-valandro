# Pacote de migração — Design System original (Valandro Gestão)

Gerado a partir do projeto Claude Design **"Valandro Gestão Design System"** (ID `ae6096a3-4b48-445b-9efa-51f523c0053f`). Nenhum arquivo-fonte foi apagado do projeto original; este pacote é uma cópia.

**⚠️ MIGRAÇÃO INCOMPLETA.** Este pacote contém apenas o que tem fonte neste projeto. `DESIGN_LANGUAGE_VALANDRO.md` (com Apêndice A — leitura geométrica do logotipo — e Apêndice B — racional dos descartes) e as **quatro peças finais** (Proposta Comercial, Relatório Executivo, Dashboard Financeiro, Carrossel Instagram) foram produzidos em outro projeto/conversa e ainda precisam ser incorporados a este mesmo destino corporativo antes que a migração possa ser considerada concluída.

## Árvore do pacote

```
plataforma-valandro/
├── LEIAME_MIGRACAO.md                          (este arquivo)
├── docs/
│   ├── 01_Plataforma_da_Marca.md
│   └── HISTORICO_DECISOES_DESIGN.md
├── design-system/
│   ├── tokens/            (colors.css, typography.css, spacing.css, effects.css)
│   ├── components/        (core/, feedback/, forms/, navigation/, overlay/ — .jsx + .d.ts + .prompt.md + cards)
│   ├── guidelines/        (14 specimen cards: cores, tipo, espaçamento, radius/sombra, textura, imagery, logo)
│   ├── assets/            (logos, wallpapers, texturas, foto de ambiente)
│   ├── styles.css
│   ├── README.md          (readme.md original)
│   └── SKILL.md
├── design/
│   └── exemplos-valandro-gestao/
│       ├── dashboard/      (Sidebar.jsx, TopBar.jsx, CashflowChart.jsx, index.html — caminhos ajustados)
│       ├── slides/         (TitleSlide, ProcessSlide, QuoteSlide, ScheduleSlide — caminhos ajustados)
│       └── social-posts/   (fluxo-de-caixa-vs-dre.html — caminho ajustado)
├── uploads-originais/      (8 arquivos-fonte brutos, incl. assinatura_valandro_ana.cdr não interpretado)
└── _artefatos-gerados-compatibilidade/
    └── _ds_bundle.js       (NÃO é fonte — bundle compilado, incluído só para o exemplo dashboard/index.html renderizar sem recompilar)
```

## Arquivos copiados

- `docs/`: `01_Plataforma_da_Marca.md`, `HISTORICO_DECISOES_DESIGN.md`
- `design-system/`: `tokens/` (4), `components/` (44 arquivos — 11 componentes × jsx/d.ts/prompt.md + 5 cards de grupo), `guidelines/` (14), `assets/` (8), `styles.css`, `README.md`, `SKILL.md`
- `design/exemplos-valandro-gestao/`: `dashboard/` (4), `slides/` (4), `social-posts/` (1) — caminhos relativos de `href`/`src` corrigidos para a nova estrutura de pastas
- `uploads-originais/`: todos os 8 arquivos, incluindo o `.cdr` não interpretado

## Arquivos deliberadamente não copiados

- `_ds_manifest.json`, `_adherence.oxlintrc.json`, `.thumbnail`, `thumbnail.html` — artefatos/metadados gerados pelo compilador deste ambiente; nenhum exemplo aplicado depende deles para renderizar.
- `_ds_bundle.js` — também gerado, mas incluído separadamente em `_artefatos-gerados-compatibilidade/` porque `design/exemplos-valandro-gestao/dashboard/index.html` carrega os componentes React em runtime a partir dele. Não deve ser tratado como fonte: se os `.jsx`/`.d.ts` em `design-system/components/` mudarem, este bundle precisa ser recompilado por um processo equivalente (ou o exemplo para de refletir o design system atual).

## Dependências ainda existentes

- O exemplo `dashboard/` depende do bundle compilado acima (não dos `.jsx` fonte diretamente) para renderizar fora deste ambiente.
- Todos os exemplos (`slides/`, `social-posts/`, `dashboard/`) dependem de `design-system/styles.css` e `design-system/assets/` pelos caminhos relativos já ajustados — não mova essas pastas sem atualizar os caminhos novamente.
- `design-system/tokens/typography.css` referencia `'IBM Plex Mono'` sem arquivo de fonte físico (ver pendências).

## Pendências futuras (não são bloqueios)

- Incorporar `DESIGN_LANGUAGE_VALANDRO.md` + Apêndices A e B, produzidos no outro projeto.
- Incorporar as quatro peças finais (Proposta Comercial, Relatório Executivo, Dashboard Financeiro, Carrossel Instagram) e suas dependências específicas, também do outro projeto.
- Avaliar se `dashboard/`, `slides/` e `social-posts/` deste Design System original devem permanecer como exemplos aplicados depois que as quatro peças finais chegarem, ou se ficam obsoletos por sobreposição — decisão a ser tomada quando o conteúdo do outro projeto estiver disponível, para não duplicar sem necessidade.
- Recompilar `_ds_bundle.js` fora deste ambiente caso os componentes fonte sejam editados depois da migração.
- Arquivo de fonte IBM Plex Mono ainda não enviado (pendência sinalizada, não bloqueia a migração).

## Nota técnica: extensão `.jsx.txt`

Dentro deste projeto Claude Design, ter dois arquivos exportando o mesmo nome de componente (ex. `Card`) quebra a compilação do Design System original — por isso os `.jsx` e `.d.ts` copiados para este pacote (em `design-system/components/` e `design/exemplos-valandro-gestao/dashboard/`) foram salvos como `.jsx.txt`/`.d.ts.txt`, e o `index.html` do exemplo `dashboard/` foi ajustado para carregá-los com essa extensão. **Ao copiar este pacote para o repositório `plataforma-valandro`, renomeie todos de volta para `.jsx`/`.d.ts`** (e ajuste os dois `<script src="...jsx.txt">` em `dashboard/index.html` de volta para `.jsx`) — lá não há esse conflito de namespace.

## Confirmação

Nenhuma fonte original foi apagada, movida ou alterada no projeto de origem — todas as operações acima foram cópias para `migration-package/plataforma-valandro/`.

## Resposta final

**Se você encerrar a conta pessoal do Claude agora, depois de copiar este pacote para `plataforma-valandro`, algo relevante de Design da Valandro presente NESTE projeto seria perdido?**

Não. Tudo que tem fonte neste projeto — Plataforma da Marca, histórico de decisões, tokens, componentes, guidelines, assets, exemplos aplicados e uploads originais — está neste pacote. A única coisa que se perderia seria a possibilidade de recompilar automaticamente `_ds_bundle.js` dentro deste ambiente específico (processo, não conhecimento — os `.jsx`/`.d.ts` fonte estão todos aqui).

O que **não** está resolvido é o conteúdo que vive no *outro* projeto (`03_DESIGN_LANGUAGE.md`, Apêndices A/B, quatro peças finais) — esse risco não depende desta conta, mas de você repetir esta mesma auditoria de migração lá antes de encerrar aquele projeto também.
