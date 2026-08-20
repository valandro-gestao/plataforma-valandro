---
name: valandro-gestao-design
description: Use this skill to generate well-branded interfaces and assets for Valandro Gestão, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the readme.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Hierarquia de fontes de verdade (em caso de conflito, a de cima vence):

1. `docs/01_Plataforma_da_Marca.md` — plataforma da marca (propósito, promessa, tom de voz, princípios)
2. `docs/DESIGN_LANGUAGE_VALANDRO.md` — linguagem de design v1.0 (seções 1–7 normativas; Apêndices A/B não normativos)
3. `readme.md` — fundamentos de conteúdo, fundamentos visuais, iconografia, índice
4. `styles.css` + `tokens/` — tokens normativos
5. `docs/HISTORICO_DECISOES_DESIGN.md` — contexto histórico, **não normativo**

Referência de execução atual: as quatro peças em `examples/` (Proposta Comercial, Relatório Executivo, Dashboard Financeiro, Carrossel Instagram). Os exemplos em `ui_kits/`, `slides/` e `social/` precedem a Design Language v1.0 — use-os como histórico, não como modelo.
