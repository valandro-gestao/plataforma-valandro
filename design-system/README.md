# Valandro Gestão — Design System

## Sobre a empresa

Valandro Gestão é uma consultoria empresarial especializada em controladoria financeira e gestão para pequenas e médias empresas. O propósito da marca é transformar informações financeiras em decisões estratégicas, atuando como parceira da gestão — ajudando empresários a organizar processos, controlar resultados, planejar o futuro e decidir com mais segurança.

Serviços principais: gestão financeira recorrente, fluxo de caixa, DRE gerencial, orçamento, forecast, indicadores de desempenho, implantação de processos financeiros e apoio à tomada de decisão.

Público: empresários, diretores e gestores de pequenas e médias empresas.

Promessa oficial: **"Você nunca mais decide sozinho."** Tagline institucional histórica: **"Seu mais valioso parceiro rumo ao sucesso."**

A plataforma de marca completa (propósito, crença central, transformação do cliente, posicionamento, personalidade, tom de voz, 7 princípios, "o que a marca não é") está em `docs/01_Plataforma_da_Marca.md` — **é a fonte normativa**; em conflito com qualquer decisão visual, ela prevalece.

A **Design Language v1.0** (`docs/DESIGN_LANGUAGE_VALANDRO.md`) é a fonte normativa da linguagem visual: princípios permanentes, Método da Mesa, linguagem editorial, duas vozes, regras consolidadas, elementos em validação, descartes e política de evolução. Hierarquia de fontes de verdade:

1. `docs/01_Plataforma_da_Marca.md` — plataforma da marca
2. `docs/DESIGN_LANGUAGE_VALANDRO.md` — linguagem de design (seções 1–7 normativas; Apêndices A e B **não** normativos)
3. Design System (`styles.css`, `tokens/`, `components/`, `guidelines/`, `assets/`) — tokens, componentes e especificações
4. `docs/HISTORICO_DECISOES_DESIGN.md` — contexto histórico, não normativo

Os itens da seção **2.1 (elementos em validação)** da Design Language não são regra obrigatória e **não** foram promovidos a tokens, componentes ou guidelines deste Design System.

## Origem deste projeto e fontes

Este design system foi reconstruído a partir do pacote de migração `plataforma-valandro` (enviado em `uploads/Valandro Gestão Design System.zip`), que por sua vez foi gerado de um projeto Claude Design anterior (`ae6096a3-4b48-445b-9efa-51f523c0053f`). Nenhum novo design foi inventado aqui: tokens, componentes, guidelines, assets e exemplos aplicados são os originais, com caminhos e namespace ajustados a este projeto.

**Fontes brutas originais** (agora em `sources/`; não são arquivos-fonte do sistema, são material recebido do cliente):
- `logo_valandro_2023_print.pdf`, `branco_valandro.png` — logotipo oficial (versão print e versão branca)
- `Valandro gestao - template modelo apresentação.pptx` e `valandro-template.pptx` — template institucional de apresentação (20 slides): capa, escopo/processo, citação/propósito, cronograma de 5 semanas. Fonte da paleta, das texturas e do tom de voz visual
- `Proposta Paola e William.pdf` — proposta comercial real; fonte do copy de serviços, método e investimento
- `wallpaper_valandro_1920x1080_12/13.png` — wallpapers institucionais (aperto de mãos + padrão hexagonal)
- `assinatura_valandro_ana.cdr` — assinatura de e-mail em CorelDraw; **formato não legível** pelas ferramentas disponíveis. Se a assinatura precisar ser recriada, envie um PNG/SVG exportado.

Não houve Figma, repositório GitHub nem código de produto — nenhum link ou codebase foi fornecido em nenhuma etapa. Todos os componentes são primitivos de UI autorais criados para a marca (ver "Componentes").

## Índice do projeto

| Caminho | O que é |
| --- | --- |
| `styles.css` | Entrada única de CSS global (apenas `@import`s) |
| `tokens/` | `colors.css`, `typography.css`, `spacing.css`, `effects.css` — custom properties |
| `assets/` | Logos (color/white), wallpapers, foto de ambiente, texturas de fundo |
| `guidelines/` | 14 cards de fundamentos (aba Design System → grupos Colors, Type, Spacing, Brand) |
| `components/` | Primitivos de UI: `core/`, `feedback/`, `forms/`, `navigation/`, `overlay/` |
| `ui_kits/dashboard/` | Recriação interativa de painel financeiro executivo (2 telas por tab) |
| `slides/` | 4 tipos de slide (Capa, Escopo/Processo, Citação, Cronograma) |
| `social/` | Post educativo 1080×1080 (Fluxo de Caixa x DRE) |
| `examples/` | 4 peças finais validadas em Design Language v1.0 (Proposta, Relatório, Dashboard, Carrossel) |
| `docs/` | Plataforma da Marca e Design Language (normativas), Histórico de Decisões (não normativo), LEIAMEs das duas migrações |
| `sources/` | Arquivos brutos recebidos do cliente |
| `SKILL.md` | Versão portátil para uso como Agent Skill no Claude Code |
| `thumbnail.html` | Tile da homepage |

## Componentes

13 primitivos, agrupados por área. Nenhum código de produto foi fornecido, então o inventário é um conjunto padrão dimensionado às necessidades reais da marca (propostas, relatórios, dashboards, posts):

- **Forms** — `Button`, `Input`, `Select`, `Checkbox`, `Radio`, `Switch`
- **Feedback** — `Badge`, `Tag`, `Tooltip`, `Toast`
- **Core** — `Card`
- **Navigation** — `Tabs`
- **Overlay** — `Dialog`

Cada diretório tem um card `@dsCard` com os estados e variantes principais. Cada componente tem `.jsx` + `.d.ts` + `.prompt.md`.

### Intentional additions

- **Nenhum ícone foi desenhado.** Os componentes e o UI kit usam glifos tipográficos Unicode como marcadores neutros (ver "Iconografia"). Um wrapper de ícone só deve ser criado quando um pacote de ícones for adotado formalmente.

## Substituição de fonte (flag para o usuário)

Nenhum arquivo de fonte foi fornecido. Como aproximação no Google Fonts foram escolhidas **Manrope** (títulos/destaques, geométrica e moderna) e **IBM Plex Sans** (texto corrido/interface, altamente legível), carregadas por `@import url(...)` em `tokens/typography.css`. `--font-mono` referencia **IBM Plex Mono**, que ainda não tem arquivo físico nem import — hoje cai no fallback `ui-monospace`.

**Se a Valandro Gestão tiver tipografia oficial licenciada, envie os `.ttf`/`.otf`** para substituição exata (e o arquivo de IBM Plex Mono, ou a decisão de trocar por outra mono).

## Conteúdo — fundamentos

**Tom de voz**: profissional e conversacional — frases que soariam naturais ditas em voz alta numa reunião. Ancorado em fato e dado, nunca em alarme. Educa antes de vender. Confiante sem ser arrogante, direto sem ser frio.

**Pessoa**: segunda pessoa direta para o cliente ("você e sua empresa"), primeira pessoa do plural para a Valandro ("acompanhamos", "ajudamos a entender", "construímos junto"). Nunca "eu". Nunca verbos de venda agressiva ("garantimos resultados", "não perca").

**Casing**: títulos curtos em Title Case; títulos longos e corpo em frase (maiúscula inicial apenas). Nunca CAPS em frases — CAPS/`tracking-wide` só em kickers curtos (ex. "EDUCAÇÃO FINANCEIRA").

**Emoji**: nunca. Exclamações: praticamente nunca.

**Números e datas**: valores sempre em `R$` com separador de milhar (`R$ 128.400`); percentuais com sinal quando indicam variação (`+12% vs. jun`); datas `dd/mm/aaaa`.

**Exemplos reais** (extraídos do PPTX e da proposta):
- "Seu mais valioso parceiro rumo ao sucesso."
- "Nosso propósito é transformar informações financeiras em decisões estratégicas."
- "Venha tomar um café com a gente para que possamos entender em qual estágio da jornada você e sua empresa se encontram."
- "Boas decisões nascem de boas informações e boas conversas. Por isso, você nunca mais decide sozinho."

**Estrutura de proposta comercial** (do PDF real): Capa → Escopo (4 frentes) → Método (ciclo de gestão) → Investimento (valor mensal + condição de permanência) → Encerramento com tagline.

**Vibe**: sóbria, adulta, sem hype. O cliente é tratado como protagonista capaz. Um número relevante nunca é infantilizado nem enfeitado.

## Fundamentos visuais

**Cores**: azul institucional `--blue-500 #0ba0dc` é a cor principal — CTAs, ícones ativos, links, destaque de dados. Navy `--navy-900 #0a1e2e` / `--navy-800` para fundos institucionais, capas, sidebars. Branco e cinzas (`--gray-25/50/100` para superfícies; `--gray-600/900` para texto) são o apoio. Verde/vermelho/âmbar são **restritos a significado** (positivo, negativo, alerta) — nunca decorativos. Máximo 1–2 cores de fundo por peça: branco **ou** navy.

**Tipografia**: Manrope para display (600–800, `--tracking-tight` em títulos grandes) + IBM Plex Sans para corpo (400–600). Escala `--text-xs` (12px) a `--text-4xl` (60px). Hierarquia explícita: título grande e pesado, corpo discreto em cinza secundário. Line-height 1.15 em títulos, 1.55 em corpo.

**Espaçamento**: escala base 4px (4/8/12/16/20/24/32/40/48/64/80/96/128). Muito branco. Padding de card 24–32px; padding de slide 72–80px. Poucos elementos por tela; nunca lotado. `--container-max: 1200px`.

**Backgrounds**: predominantemente branco sólido (peças de conteúdo/dashboard) ou navy sólido (capas, painéis institucionais). Fotografia real de ambiente de negócio usada **só** com overlay navy semitransparente em diagonal (`linear-gradient(100deg, rgba(10,20,30,.92) 30%, rgba(10,30,46,.55) 100%)`) para garantir contraste. Padrão hexagonal sutil existe nos wallpapers (`assets/wallpaper-handshake-*.png`) — é textura de fundo, não elemento gráfico solto. `assets/texture-gradient-blue.png` (gradiente azul→cinza-escuro diagonal) para painéis de destaque secundários. Sem repetição de padrão em corpo de texto, sem grão, sem ruído aplicado.

**Animação**: as fontes originais não têm motion design. Padrão adotado: transições sutis e rápidas, `--duration-fast 120ms` / `--duration-base 200ms` com `--ease-standard cubic-bezier(.2,.8,.2,1)`. Fade e mudança de cor apenas. Nada de bounce, spring, parallax ou entrada escalonada chamativa.

**Hover**: escurecimento leve da cor base (`--blue-500` → `--blue-600`) e, em botões, elevação de 1px (`translateY(-1px)`). Links: `--text-link` → `--text-link-hover`. Itens de lista/nav: fundo `rgba(255,255,255,.08)` em superfície navy, `--gray-50` em superfície branca.

**Press**: só cor (tom mais escuro). Sem `scale`, sem shrink.

**Foco**: anel de 3px em `--blue-50` (ou `box-shadow` equivalente) — sempre visível, nunca removido.

**Bordas**: 1px em `--border-subtle` (#e7e9ec) ou `--border-default` (#d3d7dc). **Nunca** borda lateral colorida como recurso decorativo. Divisores internos: 1px `--border-subtle`.

**Sombras**: `--shadow-sm 0 1px 2px rgba(10,30,46,.06)` para cards; `--shadow-md` para elementos elevados (dropdown, toast); `--shadow-lg` para dialog. Nunca sombra dramática, nunca sombra colorida, nunca inner shadow decorativa.

**Raio de canto**: `--radius-sm 4px` (controles pequenos, badges quadradas), `--radius-md 8px` (inputs, botões, itens de nav), `--radius-lg 14px` (cards, painéis), `--radius-xl 20px` (painéis grandes/hero), `--radius-full` (pills e tags). Nunca 0, nunca pill em botão de ação.

**Cards**: fundo branco, borda 1px `--border-subtle`, `--shadow-sm`, `--radius-lg`, padding 24–32px. Sem borda lateral colorida, sem gradiente de fundo.

**Transparência e blur**: transparência apenas em (1) overlay navy sobre fotografia, (2) estados de hover/ativo em superfície escura, (3) texto secundário sobre navy (`rgba(255,255,255,.72)`). **Nunca** glassmorphism, nunca `backdrop-filter` decorativo. Gradiente de proteção (não cápsula) é a técnica padrão para texto sobre imagem.

**Layout**: grid modular. Dashboard: sidebar navy fixa de 232px + conteúdo fluido, padding horizontal 32px. Slides 1280×720 com padding 80px. Post social 1080×1080 com padding 72px. Elementos fixos: sidebar e top bar no dashboard; logo sempre no mesmo canto em cada família de peça.

**Imagens**: ambientes reais de negócio — reunião, escritório, análise financeira, planejamento. Tom frio/azulado, discretamente dramático (`assets/photo-office-real.png`). Sem saturação alta, sem filtro quente, sem preto e branco, sem grão. Evitar stock genérico de aperto de mãos isolado sobre fundo branco.

**Números-herói**: KPIs em `--font-display`, peso 800, 24–26px no dashboard, cor `--text-primary`; variação em `Badge` com tom semântico ao lado — nunca o mesmo peso do texto ao redor.

## Iconografia

As fontes originais **não trazem sistema de ícones**: nenhum SVG, nenhuma fonte de ícones, nenhum PNG de ícone. O único elemento gráfico da marca é o checkmark contido no próprio logotipo.

Consequências e regras:

- Os componentes e o UI kit usam **glifos tipográficos Unicode** como marcadores neutros: `▦` (visão geral), `↕` (fluxo), `≡` (demonstrativo), `◎` (clientes), `⚙` (configurações), `✕` (fechar). São uma substituição declarada, não um sistema.
- **Nenhum ícone foi desenhado à mão** neste projeto, por decisão explícita.
- **Substituição recomendada e sinalizada**: para produção, adotar **Lucide** via CDN (`https://unpkg.com/lucide-static@latest/icons/<nome>.svg`) — outline de 2px, cantos arredondados, geometria sóbria, o pacote mais próximo do peso tipográfico da marca. Ainda **não** foi aplicado ao sistema porque é uma escolha de marca a confirmar.
- **Emoji nunca é usado.**
- Ícones, quando adotados, herdam a cor do texto (`currentColor`) e recebem `--blue-500` só no estado ativo/selecionado.

## Estado da migração

Dois pacotes foram incorporados: o Design System original (`docs/LEIAME_MIGRACAO.md`) e a Design Language + peças finais (`docs/LEIAME_MIGRACAO_DESIGN_LANGUAGE.md`). Nada mais está pendente do projeto pessoal de origem.

Pendências futuras (não bloqueiam nada):

- Arquivo de fonte oficial não enviado — Manrope / IBM Plex Sans / IBM Plex Mono seguem como aproximação Google Fonts.
- `sources/assinatura_valandro_ana.cdr` não legível pelas ferramentas disponíveis.
- Sistema de ícones não adotado formalmente (ver Iconografia).
- Exemplos antigos (`ui_kits/`, `slides/`, `social/`) precedem a Design Language v1.0 e usam vocabulário descartado por ela (kicker mono-uppercase, grid de cards com sombra em peça editorial, bloco navy com gradiente diagonal como abertura). Foram preservados como registro histórico, **não** como referência de execução atual — a referência atual é `examples/`. Decidir depois se ficam, são revisados ou saem.
- Conversão dos exemplos antigos em `templates/` (mecanismo atual da plataforma) — não executada nesta etapa por instrução explícita.
