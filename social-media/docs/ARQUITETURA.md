# Arquitetura — Social Media (rascunho pós-validação técnica)

**Status:** rascunho. Descreve a arquitetura alvo depois que o PoC (`POC.md`) confirmar o pipeline de publicação. Não implementado ainda — nenhum destes componentes existe como código neste momento.

## Visão geral

Aplicação single-tenant (só a Valandro Gestão), seguindo `PADRAO_TECNOLOGICO_VALANDRO.md`: backend Python/FastAPI, Supabase (banco + storage + auth), frontend Next.js.

```
Editor humano ──▶ Conteúdo (JSON/formulário) ──▶ Render (Design System → PNG/PDF) ──▶ Fila de aprovação
                                                                                            │
                                                                                     aprovação humana
                                                                                            │
                                                                                            ▼
                                                                        Worker de publicação (cron)
                                                                         │                      │
                                                                   Instagram Graph API   LinkedIn Posts API
```

## Fluxo de conteúdo (máquina de estados)

```
draft → pending_approval → approved → scheduled → published
                 │
              rejected → (volta para draft)
```

A tela de aprovação mostra, por dia, cada item pendente com arte + legenda + rede de destino. Só após aprovação explícita o worker de publicação pode agir (requisito não-negociável do usuário).

## Stack

| Camada | Escolha | Referência |
|---|---|---|
| Backend | Python + FastAPI + Pydantic | `PADRAO_TECNOLOGICO_VALANDRO.md` §2 |
| Frontend | Next.js (React) | `DECISOES.md` #2 — exceção documentada ao critério padrão (Streamlit) |
| Banco / Auth / Storage | Supabase (projeto próprio) | `PADRAO_TECNOLOGICO_VALANDRO.md` §6–8 |
| Renderização de peças | Templates HTML/Jinja2 + Playwright (headless) | `VALIDACAO_TECNICA.md` §3 — em validação |
| IA | Claude, via `valandro-ai`, só a partir da fase pós-PoC | `DECISOES.md` #4 |
| Publicação | Adapters dedicados por rede (Instagram Graph API, LinkedIn Posts API) | `VALIDACAO_TECNICA.md` §1–2 |
| Agendamento | Worker/cron nativo da hospedagem, sem fila dedicada | `PADRAO_TECNOLOGICO_VALANDRO.md` §16 |

## Modelo de dados (rascunho)

- `posts` — status (`draft`/`pending_approval`/`approved`/`scheduled`/`published`/`rejected`), redes-alvo, `scheduled_at`, `created_at`/`updated_at`.
- `post_assets` — arte gerada (URL no Storage), legenda, variação por rede (o mesmo conteúdo pode virar peças diferentes por rede: carrossel de imagens no Instagram, documento PDF no LinkedIn).
- `approval_log` — quem aprovou/rejeitou, quando, estado anterior/novo — trilha de auditoria da publicação pública.
- `platform_credentials` — tokens OAuth por rede social, nunca versionados; renovação automatizada é requisito da aplicação real (não do PoC).

## Estrutura de pastas alvo

```
social-media/
├── backend/
│   ├── app/
│   │   ├── api/            # endpoints: posts, calendário, aprovações, publicação
│   │   ├── core/            # config, segurança
│   │   ├── models/           # SQLAlchemy
│   │   ├── schemas/          # Pydantic
│   │   ├── services/          # regras de negócio: fluxo de aprovação, agendamento
│   │   ├── integrations/       # ai/, render/, platforms/{instagram,linkedin}/
│   │   └── workers/           # publicação agendada
│   ├── migrations/            # Alembic
│   └── tests/
├── frontend/                   # Next.js — calendário e tela de aprovação
├── docs/
└── .env.example
```

`integrations/platforms/` mantém cada rede social como um adapter isolado — Instagram (URL pública de mídia) e LinkedIn (upload de binário para URN) têm fluxos de envio de mídia incompatíveis entre si (ver `VALIDACAO_TECNICA.md` §6), por isso não compartilham a mesma lógica de baixo nível.

## Fora do escopo da V1, de propósito

- Analytics/métricas de performance dos posts.
- Multi-tenant (gestão de redes de clientes) — este produto é só para a própria Valandro.
- Fila de mensagens dedicada — cron/worker nativo resolve o volume esperado.
- Calendário editorial completo — o PoC valida o pipeline com um único conteúdo antes de construir a experiência de calendário.

## Migração futura para repositório próprio

Quando a aplicação sair da fase de protótipo (ver `DECISOES.md` #1), este diretório migra para `valandro-social-media/`, seguindo a estrutura de repositório de `PADRAO_TECNOLOGICO_VALANDRO.md` §3 — histórico de commits e decisões documentadas aqui devem acompanhar a migração.
