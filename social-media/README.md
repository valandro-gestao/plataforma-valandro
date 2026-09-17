# Social Media — Valandro Gestão (protótipo)

Aplicação de gestão de redes sociais da própria Valandro Gestão: planejar, gerar (com apoio de IA e do Design System), aprovar e publicar conteúdo no Instagram e no LinkedIn.

## Status atual

**Fase de validação técnica — nenhum código de produção implementado ainda.** Antes de construir a aplicação (calendário, CRUD, banco de dados), o pipeline crítico está sendo validado ponta a ponta com a menor prova de conceito possível:

```
planejar → gerar → renderizar → aprovar → publicar
```

Veja:
- [`docs/VALIDACAO_TECNICA.md`](docs/VALIDACAO_TECNICA.md) — o que já foi confirmado nas documentações oficiais da Meta e do LinkedIn, requisitos de conta/OAuth, custos e limitações.
- [`docs/DECISOES.md`](docs/DECISOES.md) — decisões registradas até aqui (stack, plataformas, uso de IA, localização temporária deste projeto).
- [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md) — rascunho da arquitetura alvo (pós-PoC), sujeito a revisão conforme o resultado da validação.
- [`docs/POC.md`](docs/POC.md) — escopo e checklist da prova de conceito mínima.

## Por que este projeto está temporariamente aqui

Este repositório (`plataforma-valandro`) é, por definição no seu próprio [README.md](../README.md), um repositório de padrões — não de código de produção de aplicações. Este projeto é uma exceção temporária e documentada: nasce aqui como protótipo e migra para um repositório próprio (`valandro-social-media`) assim que se consolidar como aplicação real, seguindo o [`PADRAO_TECNOLOGICO_VALANDRO.md`](../docs/PADRAO_TECNOLOGICO_VALANDRO.md). Detalhes em `docs/DECISOES.md`.
