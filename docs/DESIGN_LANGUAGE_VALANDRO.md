# Design Language — Valandro Gestão
### v1.0 — documento de referência oficial

> A linguagem visual da Valandro existe para deixar visível, em qualquer peça, que uma decisão boa nasce de evidência lida junto com o cliente — nunca entregue a ele já fechada.

Este documento consolida decisões já aprovadas. Não é espaço de exploração: designers, desenvolvedores, agentes de IA e futuros colaboradores devem tratá-lo como referência estável, revisada apenas pelo processo descrito na seção 7.

---

## 1. Princípios permanentes

Regras que devem seguir válidas mesmo que fonte, cor, tecnologia ou formato mudem no futuro.

- **Raciocínio antes de decoração.** Nenhum elemento visual existe sem justificar sua função no raciocínio da peça. Se um elemento só "fica bonito", ele não pertence ao sistema.
- **Método da Mesa.** Toda peça é construída sobre um ciclo de quatro passos, sempre nesta ordem: **Evidência** (o fato, sem interpretação) → **Leitura** (o que o fato revela) → **Recomendação** (até onde vai a responsabilidade da Valandro) → **Decisão** (pertence ao empresário; o que ele decide alimenta a evidência do ciclo seguinte). Nenhuma leitura existe sem evidência que a sustente; nenhuma recomendação existe sem leitura que a justifique. A disciplina é obrigatória; a exposição é flexível — na maior parte das peças, o ciclo vive só na estrutura do texto e do layout, nunca rotulado com os nomes dos quatro passos. O nome "Método da Mesa" e seus quatro passos só aparecem explícitos em material institucional e de treinamento — nunca em proposta, relatório, dashboard ou conteúdo voltado ao cliente.
- **Linguagem editorial.** Segunda pessoa, tom de parceria, nunca exclamação, nunca gíria. Todo número vem acompanhado do que significa — nunca aparece isolado. Toda recomendação carrega o motivo dentro da própria frase, nunca como item de checklist solto. Toda conclusão abre a próxima conversa — nunca fecha com uma tagline institucional solta. Todo título afirma algo, como faria um consultor falando; nunca rotula uma seção como faria um produto de software.
- **Duas vozes.** Todo dado (evidência) e toda interpretação (leitura) são visualmente distinguíveis por voz, não por rótulo ou caixa colorida — uma voz para o fato, outra para a leitura sobre ele. A execução atual dessa voz está na seção 4; o princípio sobrevive a qualquer troca de fonte ou cor.

---

## 2. Regras consolidadas

Elementos já validados em projetos reais e considerados parte estável da linguagem.

- **Terminal sempre arredondado** — nenhuma linha do sistema (régua, sublinhado, traço de gráfico) termina em ponta reta.
- **Traço monolinear único** — uma só espessura de linha por peça; hierarquia resolvida por espaço e cor, nunca por variação de peso de linha.
- **Marca de confirmação** — check gestual assimétrico, derivado do símbolo da marca, usado exclusivamente para marcar dado conferido/reconciliado.
- **Grade de base tipográfica única** — toda tabela ou coluna numérica segue alinhamento rígido de linha de base.
- **Convenções contábeis substituem cards.** Subtotal = traço simples; total fechado = traço duplo. Correção de número é mostrada, nunca escondida: valor antigo riscado ao lado do valor corrigido.
- **Cards com sombra/caixa só onde há função real de produto** (ex.: dashboard operacional) — nunca em proposta, relatório ou conteúdo editorial.

## 2.1 Elementos em validação

Ideias já desenhadas e testadas uma vez, mas que ainda não cumpriram o critério de validação da seção 7. Podem ser usadas com atenção, mas não são cobradas como padrão obrigatório.

- **Círculo como único contêiner permitido** (nunca card com canto arredondado — só círculo verdadeiro para marcadores, índices e pontos de status).
- **Proporção curto/longo** (todo par evidência+leitura seguindo a proporção formal do símbolo da marca — marca curta ao lado de linha longa).
- **Envelope de contenção vertical** (nenhum elemento gráfico ultrapassa a altura do conteúdo ao lado dele).

---

## 3. O que a marca deve fazer o cliente sentir

Não é sobre layout. É o teste por trás de qualquer decisão visual futura.

- **Raciocínio, antes de estética.** O cliente deve sentir que alguém pensou nos números dele, não que alguém desenhou uma peça bonita.
- **Parceria, antes de autoridade.** A Valandro mostra o caminho até uma conclusão; não impõe a conclusão como verdade fechada.
- **Rigor, antes de espetáculo.** Nenhuma peça deve impressionar por volume visual — deve convencer por precisão.
- **Continuidade, antes de entrega única.** Cada peça deve parecer parte de um acompanhamento em curso, nunca um documento isolado e definitivo.
- **A decisão continua sendo do cliente.** Nenhuma peça deve terminar como se a Valandro tivesse decidido por ele.

---

## 4. Implementação atual (v1.0)

Decisões de execução — podem mudar sem alterar os princípios das seções 1 a 3.

- **Tipografia:** Manrope (display/itálico de leitura), IBM Plex Sans (corpo), IBM Plex Mono (dado tabular).
- **Voz do dado:** `var(--font-mono)`, numérico tabular, `var(--text-primary)`.
- **Voz da leitura:** `var(--font-display)` itálico, peso 600, `var(--red-500)` — reservada à frase que interpreta um dado; nunca rótulo decorativo repetido.
- **Cor:** paleta e tokens do design system vigente (azul institucional, navy-900, cinzas, red-500/green-500/amber-500 restritos a status). Máximo 1–2 cores de fundo por peça.
- **Espaçamento:** escala de 4px do design system vigente.

---

## 5. O que foi descartado

- Kicker mono-uppercase repetido no topo de cada seção.
- Linha/barra azul decorativa sem função.
- Grid de cards brancos com sombra como padrão default para qualquer bloco de conteúdo.
- Bloco navy com gradiente diagonal como abertura universal repetida sem variação.
- Qualquer estética de livro-razão antigo, papel envelhecido ou nostalgia cartorial — a referência a convenções contábeis deve parecer papel de trabalho contemporâneo, nunca arquivo histórico.
- Interface de produto (abas, dropdowns, botões de ação) em peças que não são software real.

---

## 6. Onde cada regra se aplica

- **Proposta, Relatório, Conteúdo/Carrossel:** linguagem editorial, duas vozes, elementos consolidados (seção 2) e convenções contábeis — sem componentes de interface.
- **Dashboard** (única peça que é produto real): pode usar componentes funcionais de interface onde há função genuína — mas a leitura deve estar sempre ao lado do dado que explica, nunca isolada em badge ou tag decorativa.

---

## 7. Evolução da Design Language

Uma nova regra só entra oficialmente nas seções 1 ou 2 quando, cumulativamente:

- tiver sido aplicada em pelo menos dois projetos reais;
- melhorar comprovadamente a compreensão do cliente;
- funcionar em mais de um tipo de artefato (software, relatório, proposta, conteúdo etc.);
- não depender de uma tecnologia, fonte ou ferramenta específica.

Até cumprir os quatro critérios, uma ideia permanece na seção 2.1 (elementos em validação) ou fora do documento. Este processo existe para impedir que ideias promissoras se tornem regra permanente sem uso real que as sustente.

---

## Apêndice A — Origem geométrica dos elementos proprietários (não normativo)

Contexto de origem das seções 2 e 2.1. Não introduz regra nova; explica de onde as regras vieram, para que não sejam reabertas sem entender o raciocínio.

O wordmark da Valandro é inteiramente minúsculo e geométrico, com traço monolinear (peso único, sem variação) e todos os bojos ('a', 'o', 'd', 'g') desenhados como círculos verdadeiros — não ovais, não retângulos arredondados. Todo terminal de traço é arredondado, nunca reto. O símbolo à esquerda do wordmark é um gesto assimétrico de dois traços — um curto e mais grosso, outro longo e afunilado até a ponta — contido inteiramente dentro da altura do wordmark, nunca ultrapassando-a.

Dessa leitura nasceram os elementos das seções 2 e 2.1:

- **Terminal sempre arredondado** e **traço monolinear único** (seção 2) vêm diretamente da disciplina de traço da letra.
- **Grade de base tipográfica única** (seção 2) replica a base única sobre a qual o wordmark minúsculo se apoia.
- **Marca de confirmação** (seção 2) é o gesto assimétrico do símbolo redesenhado como check funcional, reservado ao momento de maior confiança do documento (dado conferido/reconciliado).
- **Círculo como único contêiner** (seção 2.1) é a extensão literal dos bojos circulares do wordmark para qualquer contêiner do sistema — ainda não validada em dois projetos reais.
- **Proporção curto/longo** (seção 2.1) formaliza a relação entre o traço curto e o traço longo do símbolo como ritmo entre evidência (curta) e leitura (longa) — hipótese, não regra.
- **Envelope de contenção vertical** (seção 2.1) generaliza a regra de que o símbolo nunca ultrapassa a altura do wordmark para qualquer elemento gráfico do sistema — também hipótese.

## Apêndice B — Racional dos descartes (não normativo)

Contexto de origem da seção 5. Preserva por que cada item foi rejeitado, para que não seja proposto de novo sem essa memória.

- **Kicker mono-uppercase recorrente** — funcionava como wayfinding de interface (rótulo fixo de seção), não como voz de marca; virou ruído repetido, reconhecido como o clichê mais "SaaS" do sistema anterior.
- **Linha azul puramente decorativa** — elemento sem significado, criado apenas como "elemento de identidade" sem referenciar nada da Plataforma da Marca; era preenchimento, não comunicação.
- **Grid de cards brancos com sombra como padrão universal** — é o vocabulário de dashboard de produto SaaS aplicado a documentos que deveriam parecer redigidos por pessoas (proposta, relatório) — não gerados por um app.
- **Bloco navy com gradiente diagonal como abertura repetida** — reconhecido como o dispositivo mais clonado do design corporativo B2B; repetia-se quase pixel a pixel em capas e headers, virando template reaproveitado, não identidade.
- **Estética de livro-razão antigo / nostalgia cartorial** — ao buscar inspiração em livros-razão e cadernos de laboratório, a primeira execução simulou papel antigo (pauta de caderno, aparência de registro histórico). Isso foi rejeitado explicitamente: o objetivo é um papel de trabalho contemporâneo de controller/CFO, não um efeito vintage ou nostálgico.
- **Interface de produto (abas, dropdowns, botões de exportar) fora do dashboard** — reconhecido como comoditização da marca a "mais uma fintech"; uma boutique de controladoria não deveria expor chrome de software em peças que não são software real (proposta, relatório, conteúdo).
