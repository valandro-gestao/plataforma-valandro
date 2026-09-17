# Arquitetura — Social Media

**Status:** proposta da V1, escrita depois do PoC Fase A (Instagram) ter publicado com sucesso em `@valandrogestao` — ver `POC.md`. Os pontos marcados **"a validar"** dependem de confirmação do usuário antes de qualquer implementação. Nada da V1 foi implementado ainda.

## O que o PoC provou (e por isso não é redesenhado aqui)

- **Renderização**: template HTML/Jinja2 próprio (`poc/templates/feed_post.html.jinja`), separado dos `.dc.html`, consumindo só os tokens normativos do Design System, renderizado headless via Playwright. Corrigido para respeitar a proporção original de assets (ver commit de correção da logo).
- **Storage**: upload para bucket privado do Supabase + signed URL de curta duração — é exatamente o que a API do Instagram exige para publicar.
- **Integração Instagram**: fluxo de 2 passos (criar container → `media_publish`) contra a Instagram Graph API real, com token de Standard Access (sem App Review).
- **Trava de publicação**: nenhuma chamada de publicação roda sem uma confirmação explícita — no PoC, a flag `--confirm` do script, alinhada com uma aprovação humana real na conversa.

A V1 **promove** esse código para dentro da estrutura da aplicação (ver seção "Promoção do código do PoC") em vez de reescrevê-lo. O que muda é o que envolve esse núcleo: persistência real, uma tela de aprovação de verdade (não mais a conversa como gate) e agendamento.

## Corte vertical mínimo da V1

Objetivo: materializar o fluxo completo — **calendário → conteúdo/peça → preview → aprovação humana → agendamento → publicação** — para um único caso (Instagram, post de feed, imagem única), com o menor acréscimo de infraestrutura possível.

```
Usuário cria conteúdo (formulário) ──▶ render automático (peça + preview)
                                                    │
                                          fica pending_approval
                                                    │
                                     tela de aprovação (Next.js): aprova/rejeita
                                                    │
                                              approved + scheduled_at
                                                    │
                                   worker (cron) publica quando a hora chega
                                                    │
                                         Instagram Graph API (adapter do PoC)
```

### Máquina de estados (sem mudança em relação ao rascunho anterior)

```
draft → pending_approval → approved → scheduled → published
                 │                         │
              rejected ◀───────────────────┘ (se rejeitado depois de aprovado, antes de publicar)
```

Diferença real em relação ao PoC: no PoC, a aprovação publicava na hora. Na V1, aprovação e agendamento são passos distintos — aprovar não publica, só libera para a fila do worker.

## O que fica fora da V1, de propósito (confirmado pelo usuário)

- Carrossel e Stories no Instagram.
- Analytics/métricas.
- Chamada à API do Claude dentro da aplicação (`DECISOES.md` #4 continua valendo).
- Integração real do LinkedIn — nesta rodada só o **acesso** ao Community Management API é solicitado; a integração de código só começa depois de aprovado.
- Qualquer infraestrutura nova além do que já está listado abaixo (sem fila dedicada, sem multi-tenant, sem SSO).

## Modelo de dados — simplificado à luz do PoC

O rascunho anterior desta seção previa `post_assets` e `platform_credentials` como tabelas. O PoC mostrou que isso seria infraestrutura antecipada para o corte da V1:

- **Sem `post_assets`**: V1 só tem 1 imagem por post (sem carrossel), então o caminho da imagem no Storage fica direto em `posts`. Essa tabela volta quando carrossel/multi-imagem entrar no roadmap.
- **Sem `platform_credentials`**: há uma conta, uma rede, um token — ele continua em variável de ambiente/secret da hospedagem (como já validado no PoC e já exigido por `PADRAO_TECNOLOGICO_VALANDRO.md` §9), não em linha de banco. Essa tabela só se justifica com múltiplas contas/redes.

Modelo proposto:

- **`posts`**: `id`, `status` (`draft`/`pending_approval`/`approved`/`scheduled`/`published`/`rejected`), `headline`, `body`, `caption`, `image_path` (Storage), `preview_generated_at`, `scheduled_at`, `published_media_id`, `published_permalink`, `created_by`, `created_at`/`updated_at`. Rede fixa (`instagram`) nesta fase — a coluna existe, mas só tem um valor possível até o LinkedIn entrar.
- **`approval_log`**: `post_id`, `actor` (usuário do Supabase Auth), `action` (`approved`/`rejected`), `previous_status`, `new_status`, `note` (opcional), `created_at`. Mantido desde o rascunho original — é o requisito de trilha de aprovação, não infraestrutura antecipada.

### A validar
- Confirmar que essa simplificação (sem `post_assets`/`platform_credentials`) está correta para o escopo combinado.

## Stack (sem mudanças em relação ao rascunho anterior, agora com fonte de cada peça)

| Camada | Escolha | Onde já existe/está validado |
|---|---|---|
| Backend | Python + FastAPI + Pydantic | Novo na V1 — hoje os scripts do PoC rodam soltos |
| Frontend | Next.js (React) | Novo na V1 — PoC usou a conversa como aprovação |
| Banco / Auth | Supabase (Postgres + Auth) | Novo na V1 — PoC não usou banco nem login |
| Storage | Supabase Storage | **Já validado no PoC** — mesmo bucket, mesmo projeto |
| Renderização | Jinja2 + Playwright | **Já validado no PoC** — mesmo template, promovido sem reescrever |
| Publicação Instagram | Instagram Graph API | **Já validado no PoC** — mesmo adapter, promovido sem reescrever |
| Agendamento | Worker/cron nativo da hospedagem | Novo na V1 — PoC publicava na hora, sem agendamento |

### A validar
- **Hospedagem**: `PADRAO_TECNOLOGICO_VALANDRO.md` recomenda Render (backend) + Vercel (frontend) como referência atual. Para a V1, começamos já fazendo esse deploy, ou desenvolvemos localmente primeiro e decidimos hospedagem quando o agendamento precisar rodar de forma contínua (sem depender de alguém com o computador ligado)? Isso muda quando o worker de agendamento passa a ser necessário de verdade.
- **Auth**: Supabase Auth com e-mail/senha para os poucos usuários internos da Valandro que vão aprovar conteúdo — quantas contas e quem, para criar os usuários certos desde o início.

## Promoção do código do PoC (não reescrever o que já funciona)

| Código do PoC | Destino na V1 | O que muda |
|---|---|---|
| `poc/templates/feed_post.html.jinja` | `backend/app/integrations/render/templates/feed_post.html.jinja` | Nada na lógica — só o caminho. Continua sendo o único template até carrossel/stories entrarem no roadmap. |
| `poc/render.py` | `backend/app/integrations/render/render.py` | Deixa de ler um JSON de arquivo e passa a receber os campos direto do registro de `posts`; grava o PNG no Supabase Storage (hoje é um passo separado, `upload_supabase.py`) em vez de num arquivo local. |
| `poc/upload_supabase.py` | `backend/app/integrations/storage/supabase.py` | Lógica idêntica — só passa a ser chamada pelo serviço de renderização em vez de rodada manualmente. |
| `poc/check_setup.py` | `backend/app/integrations/platforms/instagram.py` (função auxiliar) | Vira uma função de validação de token reutilizada, não um script avulso. |
| `poc/publish_instagram.py` | `backend/app/integrations/platforms/instagram.py` | A trava `--confirm` de linha de comando vira uma trava de aplicação: a função de publicar só é chamada pelo worker, e o worker só considera posts com `status == "approved"` e `scheduled_at` já alcançado — o equivalente funcional da mesma trava, adaptado para rodar sem humano no loop no momento exato da chamada (a aprovação humana já aconteceu antes, na tela). |

## Estrutura de pastas da V1

```
social-media/
├── backend/
│   ├── app/
│   │   ├── api/            # endpoints: posts (CRUD), aprovação, calendário
│   │   ├── core/            # config, segurança
│   │   ├── models/           # SQLAlchemy: posts, approval_log
│   │   ├── schemas/          # Pydantic
│   │   ├── services/          # regras de negócio: transição de estados, agendamento
│   │   ├── integrations/
│   │   │   ├── render/        # promovido do poc/
│   │   │   ├── storage/       # promovido do poc/
│   │   │   └── platforms/
│   │   │       └── instagram.py   # promovido do poc/
│   │   └── workers/           # publica posts approved cujo scheduled_at chegou
│   ├── migrations/            # Alembic
│   └── tests/
├── frontend/                   # Next.js — calendário + tela de aprovação
├── docs/
├── poc/                         # arquivado como histórico, não apagado — ver nota abaixo
└── .env.example
```

`poc/` não é apagado: fica como registro de como o pipeline foi validado, mas deixa de ser o código em uso assim que a promoção para `backend/` estiver completa. Isso evita perder o histórico do que foi testado com publicação real.

## Migração futura para repositório próprio

A V1 é o gatilho que `DECISOES.md` #1 já previa para reavaliar a migração para `valandro-social-media/`. **A validar**: migrar agora, antes de escrever o backend/frontend da V1 (repositório limpo desde o primeiro commit real), ou terminar a V1 dentro de `plataforma-valandro/social-media/` e migrar só quando ela estiver funcionando de ponta a ponta?
