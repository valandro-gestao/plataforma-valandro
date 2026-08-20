# plataforma-valandro

Repositório oficial e versionado dos padrões compartilhados da Plataforma
Valandro Gestão: decisões de arquitetura, infraestrutura e processos
aplicáveis a mais de uma aplicação da Valandro.

## O que este repositório é

Este repositório não contém código de produção de nenhuma aplicação. Ele
existe para registrar o que é comum entre as aplicações da Valandro, para
que cada novo projeto (ou evolução de um existente) parta do que já foi
decidido, em vez de reabrir a mesma discussão.

## O que este repositório NÃO é

- Não contém regras de negócio de nenhuma aplicação específica.
- Não é um framework corporativo abstrato — cada documento nasce de decisões
  e casos reais, não de antecipação de necessidades futuras.
- Não substitui a documentação própria de cada aplicação (ex.: Software DRE,
  Lyon Reports), que continua vivendo nos respectivos repositórios.

## Documentos

| Documento | Conteúdo |
|---|---|
| [`docs/PADRAO_TECNOLOGICO_VALANDRO.md`](docs/PADRAO_TECNOLOGICO_VALANDRO.md) | Stack tecnológica, infraestrutura, deploy, autenticação, versionamento e convenções técnicas comuns entre aplicações. |
| [`docs/PADRAO_PROCESSOS_ASSISTIDOS_IA.md`](docs/PADRAO_PROCESSOS_ASSISTIDOS_IA.md) | Padrão de processo para uso de IA em fluxos que transformam informação externa ambígua em dados/configuração com efeito persistente, com humano no loop. |

## Princípios gerais

- Simplicidade operacional acima de sofisticação técnica.
- Baixo custo de infraestrutura.
- Reutilização entre projetos, evitando padrões diferentes para o mesmo problema.
- Escalabilidade gradual — evitar antecipar complexidade.
- Segurança dos dados.
- Documentação clara das decisões.
- Nenhum sistema existente é reescrito apenas por preferência estética ou tecnológica.

## Como propor uma mudança a este repositório

1. Descreva o problema ou aprendizado e o **caso real** que o motiva (não
   propor a partir de hipótese).
2. Classifique a proposta como **Obrigatória**, **Recomendada** ou **Futura**.
3. Diferencie explicitamente: regra de negócio (fica na aplicação) vs.
   arquitetura/processo (pode subir para cá).
4. Após validação, registre a decisão no documento correspondente (ver
   seção "Registro da decisão" em `PADRAO_PROCESSOS_ASSISTIDOS_IA.md` como
   modelo de formato).
