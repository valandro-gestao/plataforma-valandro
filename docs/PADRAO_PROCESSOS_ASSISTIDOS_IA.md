# Padrão de Processos Assistidos por IA — Plataforma Valandro Gestão

> Este documento registra um **padrão de processo**, não um padrão tecnológico.
> Ele não define stack, infraestrutura ou deploy — isso permanece em
> `PADRAO_TECNOLOGICO_VALANDRO.md`. Aqui documentamos **como a Valandro conduz
> processos em que a IA transforma informação externa, potencialmente
> ambígua, em dados, classificações ou configurações que terão efeito
> posterior em um sistema**.

## 1. Objetivo e escopo

Este documento nasce de um caso real e validado: a implantação assistida por
IA do plano de contas de clientes do Software DRE. Ele preserva o
**aprendizado reutilizável** desse caso, sem incorporar as regras de negócio
específicas do DRE.

O escopo é intencionalmente pequeno. Este não é um framework corporativo de
IA — é o registro de um padrão que já se mostrou útil uma vez, para que possa
ser reconhecido e reaproveitado (não reimplementado do zero) caso surja um
segundo caso real semelhante em outra aplicação da Valandro.

## 2. Quando este padrão se aplica

Aplica-se quando uma aplicação da Valandro tem um processo em que:

- há **informação externa** (planilha do cliente, ERP, integração, sistema de
  origem) que precisa ser interpretada e estruturada;
- essa informação pode ser **ambígua, incompleta ou inconsistente**;
- o resultado do processo vira **dado, classificação ou configuração** que
  será persistido e passa a ter **efeito posterior** em um sistema.

Não se aplica automaticamente a:

- transformações determinísticas simples (formatação, conversão, mapeamento
  1:1 já conhecido);
- processos cujo resultado não é persistido nem tem efeito posterior;
- funcionalidades de IA de uso conversacional/geral, sem produção de
  configuração estruturada.

## 3. Padrão de mapeamento: Origem → Destino → Estrutura

Quando o processo envolve mapear ou classificar informação, três papéis
conceituais tendem a se repetir:

- **Origem** — a representação vinda do sistema/fonte externa do cliente;
- **Destino** — a representação interna da aplicação da Valandro para a qual
  aquela informação será mapeada;
- **Estrutura** — a hierarquia ou contexto organizacional em que o Destino
  está inserido.

Fluxo conceitual:

```
Origem → Destino → Estrutura
```

Esses três papéis são um vocabulário conceitual, não nomes de campo
obrigatórios. Cada aplicação modela e nomeia isso de acordo com seu próprio
domínio.

## 4. Human-in-the-loop: IA propõe → humano valida → sistema persiste

Princípio central: a IA deve resolver a maior parte do trabalho de análise e
proposta, mas **não deve transformar incerteza em decisão silenciosa**.

Fluxo padrão:

1. analisar a estrutura/dados fornecidos e o sistema de origem;
2. identificar hierarquia, categorias e relacionamentos;
3. propor o mapeamento (de/para);
4. identificar lacunas, duplicidades e ambiguidades;
5. apresentar a proposta para validação humana;
6. **somente após validação**, gerar/persistir a configuração definitiva.

Resumo do princípio:

```
IA propõe → humano valida → sistema persiste
```

## 5. Tratamento explícito de incerteza

Quando não houver evidência suficiente para propor um mapeamento ou
classificação com confiança, a IA deve sinalizar isso de forma explícita, em
vez de decidir por conta própria.

O padrão corporativo é a **existência de um estado explícito de incerteza**
no processo — não um texto ou rótulo específico. No caso do Software DRE,
esse estado é hoje representado pelo marcador `A CLASSIFICAR`; esse é um
exemplo concreto de implementação, não uma exigência literal para outras
aplicações. Cada app pode nomear seu próprio estado de incerteza como fizer
sentido para seu domínio.

## 6. Princípio: ausência de evidência não vira decisão silenciosa

Este é o princípio que sustenta os itens 4 e 5, e vale a pena registrar à
parte: **a ausência de evidência suficiente nunca deve ser resolvida
silenciosamente** por uma heurística interna da IA (chute, valor padrão,
inferência forçada) sem visibilidade humana. Incerteza deve ser visível e
passar pelo fluxo de validação — não ser mascarada por uma resposta confiante
porém não sustentada.

## 7. Separação entre processo assistido e software consumidor

O processo assistido por IA (analisar, propor, apoiar a validação) é uma
**metodologia**, não um produto acoplado a uma ferramenta específica. A
configuração resultante, já validada, pode alimentar diferentes consumidores
(ETL, banco de dados, frontend, outras aplicações). A metodologia de
implantação não deve ficar arquiteturalmente amarrada a um único software
consumidor.

Consequência prática: se o processo evoluir e passar a produzir informação
mais rica ou estruturas diferentes das que o software consumidor atual
suporta, isso é uma questão de **compatibilidade de contrato de dados**, não
algo a ser resolvido dentro deste documento. Ver
`PADRAO_TECNOLOGICO_VALANDRO.md`, seção "Contratos de dados entre produtor e
consumidor".

## 8. Limites: quando automação sem validação humana faz sentido

Human-in-the-loop **não é uma exigência universal para todo processo com
IA**. Ele é especialmente necessário quando a IA:

- interpreta informação ambígua;
- cria uma classificação ou configuração nova;
- toma uma decisão com **efeito persistente** em um sistema;
- e/ou um erro silencioso teria consequência relevante para o negócio ou
  para o cliente.

Por outro lado, processos que forem:

- determinísticos,
- reversíveis ou facilmente corrigíveis,
- de baixo risco/impacto,

podem justificar maior grau de automação conforme a aplicação amadurecer e a
confiança na qualidade do processo aumentar. Essa redução de validação
humana é uma decisão deliberada de cada aplicação, avaliada caso a caso — não
um padrão automático nem uma proibição permanente.

Isso é intencional: o objetivo deste documento é apoiar decisão de
arquitetura, não criar burocracia. Human-in-the-loop é uma ferramenta de
controle de risco, a ser aplicada onde o risco justifica.

## 9. Caso de origem: Software DRE (plano de contas)

Este padrão foi extraído de um caso real: a implantação assistida por IA do
plano de contas de clientes do Software DRE (processo antes conhecido
informalmente como "Gerador de Plano de Contas"). Esse caso é a **origem e a
validação empírica** do padrão — não uma regra normativa para outras
aplicações.

Detalhes específicos dessa implantação (quantidade de níveis do DRE,
tratamento de contas como INSS/FGTS, estrutura de arquivos do Zeus,
particularidades do Conta Azul ou do Wingraph, campos como `exibir_dre` e
`auditoria_only`) são regras de negócio do Software DRE e permanecem
documentados exclusivamente no repositório dele.

## 10. Fora do escopo deste documento

- Regras de negócio de qualquer aplicação específica.
- Escolha de modelo/provedor de IA ou detalhes de prompt.
- Qualquer biblioteca, serviço, schema corporativo ou "engine de aprovação"
  compartilhada — ver seção 11.

## 11. Não criação de componente compartilhado (por enquanto)

Neste momento este documento registra um padrão aprendido a partir de **um
único caso real**. Não há, até o momento, biblioteca, serviço, schema
corporativo ou motor de aprovação compartilhado entre aplicações, e não se
recomenda criar nenhum agora.

**Futuro:** se um segundo caso real e independente demonstrar a mesma
necessidade, avaliar extrair uma abstração comum (por exemplo, um componente
de "fluxo de validação humana" reutilizável). Isso não deve ser antecipado.

## 12. Classificação das recomendações

- **Obrigatório:** aplicar o fluxo humano-no-loop (seção 4) sempre que a IA
  interpretar informação ambígua e gerar classificação/configuração com
  efeito persistente em um sistema.
- **Recomendado:** cada aplicação implementar um estado explícito de
  incerteza (seção 5) adequado ao seu próprio domínio.
- **Futuro:** extrair componente/biblioteca compartilhada apenas após um
  segundo caso real validar a necessidade (seção 11).

## 13. Registro da decisão

| Campo | Conteúdo |
|---|---|
| Data | 2026-08-20 |
| Contexto | Migração de conhecimento do antigo "Gerador de Plano de Contas" (Software DRE) para a Plataforma Valandro |
| Decisão | Registrar o padrão de processos assistidos por IA como documento próprio, separado do padrão tecnológico, generalizando o aprendizado sem transformá-lo em framework corporativo |
| Caso de origem | Implantação de plano de contas — Software DRE (cliente Zeus) |
| Revisão futura | Ao surgir um segundo caso real de processo assistido por IA com efeito persistente em algum sistema da Valandro |
