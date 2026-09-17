# Decisões — Social Media

Registro de decisões locais deste projeto (ADR simplificado), no formato usado em `docs/PADRAO_PROCESSOS_ASSISTIDOS_IA.md` do repositório raiz.

---

## 1. Protótipo temporariamente dentro de `plataforma-valandro`

| Campo | Conteúdo |
|---|---|
| Data | 2026-09-16 |
| Contexto | `plataforma-valandro` se declara, no próprio README, como repositório de padrões — sem código de produção de nenhuma aplicação. Este projeto é uma aplicação real (gestão de redes sociais da Valandro), não um padrão compartilhado. |
| Decisão | Desenvolver o protótipo dentro de `plataforma-valandro/social-media/` enquanto o projeto está em fase de validação técnica e PoC, para aproveitar o Design System já presente sem duplicar assets. Migrar para um repositório próprio (`valandro-social-media`), seguindo a estrutura de `PADRAO_TECNOLOGICO_VALANDRO.md` §3, assim que o projeto tiver backend, banco de dados e integrações reais em funcionamento. |
| Escopo da exceção | Só o conteúdo de `social-media/`. Nenhum outro módulo do repositório é afetado. |
| Revisão futura | Ao concluir o PoC descrito em `POC.md` — nesse ponto, decidir a migração para repositório próprio antes de construir o restante da aplicação. |

---

## 2. Frontend: framework web leve, não Streamlit

| Campo | Conteúdo |
|---|---|
| Data | 2026-09-16 |
| Contexto | `PADRAO_TECNOLOGICO_VALANDRO.md` §2.2 recomenda Streamlit como padrão para "ferramenta interna, analítica, dashboard de baixo tráfego, uso por poucas pessoas da equipe" — este projeto se encaixa nesse perfil de uso (só a Valandro, poucos usuários). Streamlit foi avaliado e descartado explicitamente pelo usuário: a tela de aprovação precisa de preview visual fiel de feed, carrossel e stories — algo que Streamlit não entrega bem, por ser orientado a formulários/dashboards, não a preview pixel-perfect de peças de marca. |
| Decisão | Usar **Next.js** (React) como frontend, dentro do próprio critério de exceção previsto em §2.2 do padrão tecnológico ("framework web moderno" para os casos onde UX rica é necessária). Escolhido por ser a opção mais simples e já prevista no padrão da plataforma como alternativa ao Streamlit — sem introduzir uma terceira tecnologia de frontend na Valandro. A tela de aprovação renderiza a peça gerada (imagem estática produzida pelo pipeline de renderização, ver `VALIDACAO_TECNICA.md` §3) diretamente como `<img>`, sem necessidade de reimplementar o Design System em componentes React nesta fase. |
| Alternativas descartadas | Streamlit (preview visual limitado); reaproveitar o runtime React dos exemplos `.dc.html` do Design System (pensado para pré-visualização dentro da ferramenta de design, não para uma aplicação de produção). |
| Revisão futura | Se o preview precisar de interações mais ricas (ex.: reordenar slides do carrossel, editar texto sobre a peça antes de aprovar), avaliar então se vale a pena consumir os componentes React do Design System (`design-system/components/`) diretamente. |

---

## 3. Plataformas do MVP: Instagram e LinkedIn, só via API oficial

| Campo | Conteúdo |
|---|---|
| Data | 2026-09-16 |
| Contexto | Requisito explícito: nenhuma automação de navegador simulando publicação — só integrações oficiais suportadas. Investigação em `VALIDACAO_TECNICA.md` confirmou o que cada API publica organicamente. |
| Decisão | Instagram: feed (imagem/vídeo), carrossel (até 10 itens) e stories — todos suportados pela Instagram Graph API oficial (`media_type=STORIES` para stories). LinkedIn: posts de texto, imagem única, múltiplas imagens (`MultiImage`) e documento (PDF) via Posts API (Community Management API) — **carrossel nativo do LinkedIn não é publicável organicamente por API** (é recurso exclusivo de post patrocinado); para conteúdo estilo carrossel no LinkedIn, o equivalente funcional suportado é publicar como post de Documento (PDF com uma página por slide). |
| Limitação documentada | Ver `VALIDACAO_TECNICA.md` §2 e §6 — carrossel do LinkedIn é o único formato desejado que não tem equivalente direto via API; a alternativa (Documento) é adotada em vez de descartar o formato. |
| Revisão futura | Se o LinkedIn liberar carrossel orgânico via API no futuro, reavaliar a troca do post de Documento pelo carrossel nativo. |

---

## 4. Chamada à API do Claude fora do app na V1/PoC

| Campo | Conteúdo |
|---|---|
| Data | 2026-09-16 |
| Contexto | O risco real do projeto está no pipeline de publicação (render + aprovação + APIs oficiais), não na geração de texto — a Valandro já usa Claude/Claude Code no dia a dia para trabalho editorial. |
| Decisão | Na V1/PoC, o conteúdo (estrutura de dados: texto, dados, rede-alvo) é preparado com apoio do Claude/Claude Code **fora** da aplicação e entra no pipeline como um JSON/formulário simples. A chamada à API do Claude dentro da aplicação (via camada de abstração `valandro-ai`, conforme `PADRAO_TECNOLOGICO_VALANDRO.md`) só entra depois que o pipeline de publicação real estiver validado — automação progressiva, não antecipada. |
| Revisão futura | Assim que o PoC publicar com sucesso pelo menos uma peça real em cada rede, avaliar a integração da chamada à API do Claude como próximo passo de automação. |

---

## 5. Configuração real da conta Meta/Instagram confirmada — Standard Access validado na prática

| Campo | Conteúdo |
|---|---|
| Data | 2026-09-17 |
| Contexto | `VALIDACAO_TECNICA.md` §1 previa, com base na documentação oficial, que Standard Access seria suficiente para operar só a conta própria da Valandro, sem App Review nem verificação empresarial. |
| Confirmado na prática | App `Valandro Social Media` criado no Business Portfolio `Valandro Gestão`, conta profissional `valandrogestao` conectada e token gerado — **sem** configurar webhooks, **sem** publicar o app e **sem** verificação empresarial. Bate exatamente com o previsto. |
| Gap identificado nesta etapa | A API do Instagram exige URL pública para a imagem no momento da publicação (não aceita upload direto de arquivo local para fotos). É necessário um projeto Supabase (ao menos Storage) para hospedar a imagem renderizada antes do passo de publicação — não estava listado como bloqueante em `POC.md` até esta confirmação. |
| Segurança | O token de acesso não foi e não deve ser compartilhado nesta conversa (nem em texto, nem em arquivo) — fica só no `.env` local do usuário, fora do Git. |

---

## 6. PoC Fase A encerrado com sucesso — início da V1 real

| Campo | Conteúdo |
|---|---|
| Data | 2026-09-17 |
| Contexto | Pipeline `conteúdo → arte → preview → aprovação → publicação` provado de ponta a ponta com publicação real em `@valandrogestao` (mídia `18107174209992902`, ver `POC.md`). |
| Decisão | Encerrar o PoC Fase A e avançar para a V1 real da aplicação, promovendo o código já validado (render, upload Supabase, adapter Instagram) para dentro da estrutura da aplicação em vez de reescrevê-lo — plano de promoção em `ARQUITETURA.md`. Em paralelo, protocolar o pedido de acesso ao LinkedIn Community Management API, por ser o item de maior prazo externo. |
| Escopo da V1 (confirmado) | Corte vertical mínimo do fluxo completo (calendário → conteúdo → preview → aprovação → agendamento → publicação) para Instagram/feed/imagem única. Sem carrossel, stories, analytics, IA interna, outras redes ou infraestrutura nova além da já prevista. |
| Revisão futura | A decisão #1 (protótipo temporário neste repositório) previa migração para `valandro-social-media` "quando o projeto tiver backend, banco de dados e integrações reais em funcionamento" — a V1 é esse gatilho. Timing exato da migração (antes ou depois de construir a V1) está em aberto, ver `ARQUITETURA.md`. |
