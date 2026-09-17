# PoC — menor prova de conceito do pipeline

**Status: Fase A encerrada por decisão do usuário em 2026-09-17, com sucesso.** Este documento fica como registro histórico de como o pipeline foi validado. A partir daqui, o desenvolvimento segue como V1 real da aplicação — ver `ARQUITETURA.md`. O passo a passo de solicitação de acesso ao LinkedIn (abaixo) continua ativo, é uma ação externa independente do código.

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

**LinkedIn (disparar o quanto antes, é o item de maior prazo) — passo a passo:**

1. **Confirmar papel na Company Page.** A pessoa que vai criar o app precisa ser Administrador (ou `Content Admin`/`Direct Sponsored Content Poster`) da página `Valandro Gestão` no LinkedIn. Confirme em: página da empresa → **Admin tools → Manage admins**.
2. **Criar o app.** Em [developer.linkedin.com](https://developer.linkedin.com) → **My apps → Create app**: nome do app (ex.: "Valandro Social Media"), campo **LinkedIn Page** apontando para a página `Valandro Gestão`, logo do app, aceitar os termos.
3. **Verificar o app com a página.** Ainda em My apps → abra o app criado → aba **Settings** → botão **Verify**. Gera uma URL única — envie para o super admin da página (pode ser você mesmo, se for super admin) por e-mail ou mensagem do LinkedIn. O super admin tem até 30 dias para aprovar; sem essa verificação, o app não consegue postar em nome da página.
4. **Solicitar o produto Community Management API.** Na aba **Products** do app, solicite acesso a **Community Management API**. Isso abre um formulário oficial de acesso.
5. **Preencher o formulário de acesso** com: e-mail comercial (do domínio da Valandro, não pessoal), razão social, endereço registrado, URL do site institucional, URL da política de privacidade. É avaliado como **Development Tier** primeiro — acesso liberado com limites baixos (500 chamadas/app e 100/membro a cada 24h), suficiente para desenvolver e testar.
6. **Aguardar aprovação.** Não há SLA público — pode levar dias a poucas semanas. Isso não bloqueia o trabalho na V1 da aplicação (Instagram); só bloqueia a Fase B (integração real do LinkedIn).
7. **Depois de aprovado** (não fazer agora): gerar as credenciais OAuth do app (Client ID/Secret) e, quando formos implementar de fato, rodar o fluxo de autorização com um usuário que tenha papel na página para obter o token com escopo `w_organization_social`. Upgrade para **Standard Tier** (sem limites) só é solicitado depois, e exige uma gravação de tela demonstrando o caso de uso já funcionando — não é o momento de fazer isso agora.

Checklist de status:
- [ ] Papel de Administrador confirmado na Company Page.
- [ ] App criado em developer.linkedin.com, vinculado à Company Page.
- [ ] App verificado pelo super admin da página.
- [ ] Pedido de acesso ao "Community Management API" (Development Tier) protocolado.
- [ ] Aprovação recebida (bloqueante só para a Fase B).
- [ ] Token OAuth com escopo `w_organization_social` gerado — só depois de aprovado, e só quando formos implementar a integração de fato.

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

**Fase A (Instagram) — concluída em 2026-09-17.** Pipeline completo executado de ponta a ponta com publicação real:

| Campo | Valor |
|---|---|
| Conta | `valandrogestao` (Business) |
| ID da mídia | `18107174209992902` |
| Permalink | https://www.instagram.com/p/DdYyiqvlUro/ |
| Timestamp (API) | 2026-09-17T11:48:39+0000 |
| Tipo | `IMAGE` / `FEED` |
| Validação | Retorno da API conferido via `GET /<media_id>` — legenda publicada é byte-a-byte igual à legenda aprovada nesta conversa |

Cada passo (render → upload Supabase → aprovação explícita em chat → publish → verificação do retorno) rodou com o código deste diretório, sem automação de navegador e sem publicar nada além do que foi mostrado e aprovado.

**Fase B (LinkedIn)** segue pendente da aprovação de acesso ao Community Management API (ver checklist acima).

## Próximo passo

Fase A do PoC provada. Não publicar nada novo sem nova aprovação explícita. Próximas decisões possíveis: iniciar/acompanhar o pedido de acesso ao LinkedIn (Fase B), evoluir o template para carrossel/stories, ou decidir se já vale começar a estrutura da aplicação real (`ARQUITETURA.md`) — a definir com o usuário.
