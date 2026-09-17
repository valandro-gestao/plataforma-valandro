# PoC — menor prova de conceito do pipeline

**Objetivo único:** demonstrar, de ponta a ponta, com publicação real (não simulada):

```
1 conteúdo → 1 arte gerada no padrão Valandro → preview → aprovação → publicação real
```

Sem calendário editorial, sem banco de dados completo, sem múltiplos posts. O objetivo é provar que o caminho funciona — não construir a aplicação.

## Por que começar pelo Instagram

`VALIDACAO_TECNICA.md` mostra que o Instagram não exige App Review nem verificação de empresa para operar a própria conta da Valandro (Standard Access resolve). O LinkedIn depende de aprovação externa do produto Community Management API, com prazo fora do nosso controle. Por isso:

- **Fase A (Instagram)** pode começar imediatamente, assim que as contas estiverem configuradas.
- **Fase B (LinkedIn)** deve ter o pedido de acesso disparado o quanto antes (é o item de maior prazo), mas a validação da publicação em si só acontece depois que o LinkedIn aprovar.

## Checklist de configuração de contas (ação humana — fora do que eu (Claude Code) posso fazer)

Preciso que alguém com acesso administrativo às contas da Valandro execute e confirme os itens abaixo antes de eu escrever qualquer código de integração real. Eu não posso criar apps, fazer login OAuth ou aceitar termos de desenvolvedor em nome de ninguém.

**Instagram / Meta — concluído em 2026-09-17:**
- [x] App criado em developers.facebook.com: `Valandro Social Media`.
- [x] Business Portfolio: `Valandro Gestão`.
- [x] Conta profissional do Instagram conectada: `valandrogestao`.
- [x] Token de acesso gerado (guardado localmente pelo usuário, fora desta conversa e fora do Git).
- [ ] Webhooks — **intencionalmente não configurado** (fora do escopo desta fase, ver `POC.md` "Não implementar").
- [ ] App publicado — **intencionalmente não feito**: em Standard Access, o app opera em modo de desenvolvimento/teste sobre a própria conta, sem precisar ser publicado. Confirma o achado de `VALIDACAO_TECNICA.md` §1.
- [ ] Verificação empresarial — **intencionalmente não feita**, pelo mesmo motivo acima (só é exigida para Advanced Access).
- [ ] Confirmar se o token gerado é de curta duração (1h) ou já de longa duração (60 dias) — o script `poc/check_setup.py` (abaixo) resolve isso automaticamente ao validar o token.
- [ ] ID numérico da conta profissional — não precisa ser anotado manualmente: os scripts resolvem via `GET /me` usando o próprio token.

**Gap identificado nesta etapa (não previsto na configuração da Meta):** a API do Instagram exige que a imagem esteja em uma **URL pública** no momento da publicação — não aceita upload direto de arquivo local para fotos. Isso exige um local para hospedar a imagem renderizada antes de publicar:
- [ ] **Projeto Supabase criado** (mesmo que só para Storage nesta fase) — necessário antes do passo 5 (publicação real) poder rodar de verdade. Sem isso, dá para validar os passos 1–4 (render + preview) mas não o passo 5.

**LinkedIn (disparar o quanto antes, é o item de maior prazo):**
- [ ] Confirmado papel de Administrador/Content Admin na Company Page da Valandro.
- [ ] App criado em developer.linkedin.com, vinculado à Company Page.
- [ ] Pedido de acesso ao produto "Community Management API" (Development Tier) enviado pelo formulário oficial.
- [ ] Aprovação recebida (bloqueante para a Fase B — sem isso, não há publicação real no LinkedIn a validar).
- [ ] Token OAuth com escopo `w_organization_social` gerado após aprovação.

## Escopo técnico mínimo

Nada disto é a aplicação final — é só o suficiente para provar o pipeline.

1. **Um template** (HTML + CSS consumindo `design-system/tokens/*.css` e `design-system/styles.css`) para um único formato: post de feed 1080×1080. Sem carrossel, sem stories, sem variações — isso vem depois de provar o caminho com o formato mais simples.
2. **Um script de renderização** (Python + Jinja2 + Playwright) que recebe um JSON simples (`titulo`, `corpo`/legenda) preenchido manualmente (com apoio do Claude/Claude Code, conforme `DECISOES.md` #4) e gera um PNG.
3. **Upload do PNG** para um bucket do Supabase Storage (signed URL de curta duração) — só o necessário para servir a imagem publicamente para a chamada da API do Instagram.
4. **Aprovação mínima**: para esta primeira execução, o gate humano acontece nesta própria conversa — o script de renderização para depois de gerar a imagem, ela é mostrada ao usuário junto com a legenda exata que seria publicada, e a chamada de publicação só é executada depois de uma confirmação explícita em chat. Isso satisfaz o requisito de "nenhuma publicação sem aprovação humana" sem precisar construir a página HTML de aprovação ainda — essa página (`ARQUITETURA.md`) fica para quando o pipeline precisar rodar sem alguém acompanhando em tempo real.
5. **Publicação real**: só depois da aprovação explícita, um script separado chama a Instagram Graph API (criar container → `media_publish`), usando o token guardado em `.env` (nunca lido ou exibido pelo assistente).
6. **Verificação manual**: confirmar visualmente que o post apareceu na conta real do Instagram da Valandro.

Fase B (LinkedIn) repete os passos 2–6 trocando o adapter de publicação pelo Posts API do LinkedIn (upload de binário em vez de URL pública — ver `VALIDACAO_TECNICA.md` §2 e §6) e o template por um post de texto + imagem única (sem carrossel/documento ainda).

## O que fica fora do PoC, de propósito

- Banco de dados / tabelas (`posts`, `post_assets`, `approval_log`) — o PoC pode rodar com um JSON e um arquivo local, sem Supabase Postgres.
- Autenticação de usuários.
- Frontend Next.js definitivo.
- Agendamento (worker/cron) — o PoC publica imediatamente após aprovação manual.
- Carrossel, stories e documento PDF — vêm depois de provar o formato mais simples de cada rede.
- Renovação automática de token.

## Critério de sucesso

O PoC está concluído quando existir, para o Instagram, pelo menos um post real publicado na conta da Valandro através deste pipeline (não simulado, não capturado em print) — e, quando o LinkedIn aprovar o acesso, o mesmo para um post de texto+imagem.

## Próximo passo

Assim que o checklist de contas acima estiver marcado (pelo menos o do Instagram), retomamos para eu implementar os itens 1–6 da Fase A.
