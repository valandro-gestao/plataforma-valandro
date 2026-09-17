# Validação técnica — pipeline planejar → gerar → renderizar → aprovar → publicar

**Data:** 2026-09-16
**Status:** validação preliminar por documentação oficial (Meta e LinkedIn) e testes de mercado — ainda **não** testado com credenciais reais da Valandro. Antes de codificar o PoC, os requisitos de conta (§1 e §2) precisam ser executados de verdade pela pessoa responsável pelas contas da Valandro.

Este documento existe porque o maior risco deste projeto não é construir CRUD, banco ou frontend — é confirmar que o caminho `planejar → gerar → renderizar → aprovar → publicar` é tecnicamente viável ponta a ponta, com integrações oficiais, sem automação de navegador.

---

## 1. Instagram — publicação via API

**API:** Instagram Platform / Instagram Graph API — recurso de Content Publishing.

| Formato | Suportado via API oficial? | Como |
|---|---|---|
| Feed (imagem/vídeo única) | ✅ | Container de mídia (`media_type` padrão) + publish |
| Carrossel (até 10 itens) | ✅ | Container `CAROUSEL` com até 10 `children` |
| Stories | ✅ | Container com `media_type=STORIES` |
| Reels | ✅ (bônus, fora do escopo pedido) | Container com `media_type=REELS` |

**Requisitos de conta:**
- Conta profissional do Instagram (Business ou Creator) — a conta da Valandro precisa ser convertida para profissional, se ainda não for.
- Recomendado usar o fluxo **"Instagram API com Login do Instagram para Empresas"** (mais novo e mais simples): não exige vincular uma Página do Facebook à conta, ao contrário do fluxo legado ("Login do Facebook para Empresas").
- Um app criado no Meta for Developers, associado a um Business Portfolio (Business Manager) da Valandro.

**Nível de acesso — achado importante:** a documentação oficial confirma que **Standard Access é suficiente** quando o app opera apenas a própria conta profissional do desenvolvedor ou uma conta que ele gerencia — exatamente o nosso caso (single-tenant, só a Valandro). Isso significa:
- **Não é necessário App Review.**
- **Não é necessário processo de Verificação de Empresa.**
- Basta adicionar a conta do Instagram da Valandro como "tester"/com função no app, em modo de desenvolvimento.

Isso elimina o maior risco de prazo que normalmente existe nesse tipo de integração (App Review costuma levar 2–4 semanas quando é necessário).

**Autenticação:** OAuth 2.0. Token de curta duração (1h) trocado por token de longa duração (60 dias, renovável antes de expirar) — precisa de uma rotina de renovação automatizada antes de ir para uso contínuo (não bloqueia o PoC, que pode rodar com um token válido gerado manualmente).

**Publicação — fluxo de 2 passos:**
1. `POST /<IG_ID>/media` — cria um container com a mídia (`image_url`/`video_url` ou lista de `children` para carrossel/stories).
2. `POST /<IG_ID>/media_publish` — publica o container criado (`creation_id`).

**Requisito de hospedagem de mídia:** a imagem/vídeo precisa estar acessível por URL pública no momento da chamada (a Meta faz o fetch via cURL). Uma signed URL do Supabase Storage com expiração curta (alguns minutos) atende esse requisito sem expor o arquivo permanentemente.

**Limites:** até 100 publicações por conta a cada 24h (carrossel conta como 1 post); há indicação de um limite específico mais baixo para carrossel em versões anteriores da documentação (50/24h) — **confirmar o valor vigente no momento da implementação** via `GET /<IG_ID>/content_publishing_limit`.

**Sem agendamento nativo:** a API publica imediatamente ao chamar `media_publish`. O agendamento (publicar às X horas) é responsabilidade do nosso próprio worker/cron — consistente com o padrão tecnológico da plataforma (cron/worker nativo, sem fila dedicada).

**Custo:** API gratuita — a Meta não cobra por chamada nem por permissão do Instagram Platform.

**Fontes:**
- [Meta for Developers — Publicação de conteúdo (Instagram Platform)](https://developers.facebook.com/docs/instagram-platform/content-publishing)
- [Meta for Developers — Visão geral da plataforma do Instagram](https://developers.facebook.com/docs/instagram-platform/overview/)

---

## 2. LinkedIn — publicação via API

**API:** Posts API, parte do produto **Community Management API** (substituiu a antiga `ugcPosts`).

| Formato | Suportado organicamente via API? | Observação |
|---|---|---|
| Texto | ✅ | |
| Imagem única | ✅ | Requer upload prévio via Images API para obter URN |
| Múltiplas imagens | ✅ (`MultiImage`) | Várias imagens num post — não é o carrossel "nativo" |
| Vídeo | ✅ | Requer upload prévio via Videos API |
| Documento (PDF) | ✅ | Renderiza como visualizador navegável — **é o equivalente funcional de carrossel no LinkedIn** |
| Artigo | ✅ | |
| Carrossel nativo (`Carousel`) | ❌ | Só existe para posts patrocinados (Ads) — **não publicável organicamente via API** |
| Stories | — | LinkedIn não tem mais o recurso Stories (removido pela plataforma) |

**Decisão consequente:** para conteúdo "estilo carrossel" no LinkedIn, publicar como **post de Documento** (PDF com uma página por slide) em vez de tentar um carrossel de imagens — é inclusive um formato nativamente popular no LinkedIn hoje, não uma solução de contorno inferior.

**Requisitos de conta:**
- Company Page da Valandro no LinkedIn.
- O usuário responsável pela integração precisa ter papel de `ADMINISTRATOR`, `DIRECT_SPONSORED_CONTENT_POSTER` ou `CONTENT_ADMIN` na página.
- Permissão de API necessária: `w_organization_social`.

**Acesso ao produto — achado importante:** Community Management API é um **produto "vetted" (curado)**, não é liberado automaticamente:
- Elegibilidade restrita a entidades legais registradas com caso de uso comercial (a Valandro Gestão, como consultoria formalmente constituída, se qualifica) — é preciso comprovar e-mail comercial, razão social, endereço registrado, site e política de privacidade.
- Processo em duas etapas: **Development Tier** (aprovação inicial, limites baixos: 500 requisições/app, 100/membro) → **Standard Tier** (acesso completo, exige envio de uma gravação de tela demonstrando o caso de uso).
- **Não é instantâneo.** Não há SLA público de prazo de aprovação — é o maior risco de cronograma deste projeto (mais que o do Instagram).
- O acesso em si **não tem custo** (não é um contrato pago) — contratos comerciais existem para produtos de Marketing/Ads de maior escala, que não é o nosso caso de uso.

**Upload de mídia — diferença importante em relação ao Instagram:** o LinkedIn **não aceita URL pública** para mídia — é preciso fazer upload do binário para os endpoints próprios (Images API / Documents API) e usar o URN retornado (`urn:li:image:{id}` / `urn:li:document:{id}`) no post. É um fluxo de integração diferente do Instagram e precisa de um adapter próprio.

**Sem agendamento nativo:** assim como o Instagram, publicar via API é imediato (`lifecycleState: PUBLISHED`); agendamento fica por conta do nosso worker.

**Custo:** processo de acesso gratuito; sem cobrança de uso no volume de operação da Valandro.

**Fontes:**
- [LinkedIn (Microsoft Learn) — Posts API](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api)
- [LinkedIn (Microsoft Learn) — Community Management, visão geral e níveis de acesso](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/community-management-overview)

---

## 3. Renderização automática das peças (Design System → imagem)

Os quatro exemplos aplicados do Design System (`design/exemplos-valandro-gestao/*.dc.html`, incluindo `carrossel-instagram.dc.html`) dependem de um runtime próprio (`support.js`, `deck-stage.js`, `doc-page.js`) pensado para pré-visualização interativa dentro da ferramenta de design usada para criá-los — **não foram feitos para renderização headless automatizada em um pipeline de backend**.

**Proposta (marcada como "em validação", não decidida como padrão):**
- Não reaproveitar o runtime `.dc.html`.
- Criar templates HTML estáticos novos, específicos deste pipeline, que consomem diretamente os tokens normativos do Design System (`design-system/tokens/*.css`, `design-system/styles.css`, `design-system/assets/*`) — sem o runtime React interativo.
- Popular esses templates com os dados do conteúdo (texto, dados numéricos, legenda) via um motor de template simples (Jinja2, natural no backend Python já padronizado pela plataforma).
- Renderizar o HTML populado como PNG via navegador headless (**Playwright**, open-source, mantido pela Microsoft, uso comum em pipelines Python).

**Por que não decidir isso como padrão ainda:** é uma extensão técnica nova do Design System, que ainda não existe em nenhum outro produto da Valandro. Precisa ser validada visualmente com a marca (fidelidade de cor, tipografia, espaçamento) antes de virar referência para outros pipelines de geração automática de peças.

**Tamanhos de referência (a confirmar com a equipe de design antes de fixar):**
- Feed Instagram: 1080×1080 (quadrado) ou 1080×1350 (retrato, recomendado atualmente pelo próprio Instagram para mais espaço na tela).
- Stories Instagram: 1080×1920.
- Documento LinkedIn ("carrossel"): formato quadrado ou A4, uma página por slide.

**Custo:** nenhum — ferramentas open-source.

---

## 4. Uso da API do Claude no fluxo

**Decisão:** não chamar a API do Claude dentro da aplicação na V1/PoC (registrada em `DECISOES.md` #4).

- O risco real do projeto está no pipeline de publicação (render + aprovação + APIs oficiais), não na geração de texto — a Valandro já usa Claude/Claude Code no dia a dia para trabalho editorial.
- Abordagem inicial do PoC: o conteúdo (texto, dados, rede-alvo) é preparado com apoio do Claude/Claude Code **fora** da aplicação e entra no pipeline como um JSON/formulário simples preenchido manualmente.
- Evolução planejada: depois que o pipeline publicar com sucesso pelo menos uma peça real em cada rede, a chamada à API do Claude entra como um passo automatizado adicional, via camada de abstração `valandro-ai` prevista no padrão tecnológico da plataforma — sem alterar o restante do pipeline já validado.
- Custo, quando entrar: preço padrão por token da API Anthropic, já usado em outros pontos da operação da Valandro — desprezível no volume esperado (poucos posts por dia).

---

## 5. Custos externos identificados

| Item | Custo |
|---|---|
| Instagram Graph API (Meta) | Gratuito |
| Acesso ao LinkedIn Community Management API | Gratuito para obter (processo de aprovação, não contrato pago) |
| Uso do LinkedIn Community Management API no volume da Valandro | Sem cobrança — contratos pagos existem só para produtos de Marketing/Ads em escala, não é o nosso caso |
| Playwright (renderização) | Gratuito (open-source) |
| Claude API (quando entrar, pós-PoC) | Custo por token, padrão Anthropic — desprezível no volume do MVP |
| Supabase (banco/storage/auth) | Já previsto no padrão tecnológico da plataforma, não é custo novo específico deste projeto |

---

## 6. Riscos e limitações documentadas

1. **Aprovação de acesso ao LinkedIn Community Management API não é instantânea nem garantida.** É o maior risco de cronograma do projeto — pode atrasar a validação da publicação real no LinkedIn especificamente, mesmo com o Instagram já funcionando.
2. **Carrossel nativo do LinkedIn não é publicável organicamente via API.** Mitigado adotando post de Documento (PDF) como equivalente funcional — não é uma limitação que bloqueia o requisito, mas muda o formato de entrega.
3. **O runtime atual dos exemplos do Design System (`.dc.html`) não deve ser usado para renderização automatizada.** Exige templates novos, mais simples, ainda não validados visualmente com a marca.
4. **Tokens de acesso expiram periodicamente** (Instagram: 60 dias; LinkedIn: prazo a confirmar na implementação). O PoC pode rodar com token gerado manualmente; a aplicação real (pós-PoC) precisa de renovação automatizada.
5. **Nenhuma das duas plataformas oferece agendamento nativo confiável via API para o nosso caso** — o agendamento é responsabilidade do nosso próprio worker, não das APIs externas.
6. **Upload de mídia é diferente entre as duas redes** (Instagram aceita URL pública; LinkedIn exige upload de binário para obter um URN) — os dois adapters de integração não podem compartilhar a mesma lógica de envio de mídia.

---

## Fontes consultadas

- [Meta for Developers — Publicação de conteúdo (Instagram Platform)](https://developers.facebook.com/docs/instagram-platform/content-publishing)
- [Meta for Developers — Visão geral da plataforma do Instagram](https://developers.facebook.com/docs/instagram-platform/overview/)
- [LinkedIn (Microsoft Learn) — Posts API](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api)
- [LinkedIn (Microsoft Learn) — Community Management, visão geral e níveis de acesso](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/community-management-overview)
