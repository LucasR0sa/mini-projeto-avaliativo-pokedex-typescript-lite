# Pokédex TypeScript Lite

Aplicação de terminal em **Node.js + TypeScript** que consulta a [PokeAPI](https://pokeapi.co/), transforma os dados em um objeto simplificado e gerencia um catálogo local de Pokémon com persistência em arquivo JSON.

> Mini-Projeto Avaliativo — Módulo 01, Semana 08 — Desenvolvedor(a) Back End Node.

---

## 📑 Sobre o projeto

O **Pokédex TypeScript Lite** é uma aplicação back-end (sem interface gráfica), executada pelo terminal, que:

- consulta um Pokémon por **nome ou ID** na PokeAPI;
- transforma a resposta JSON (grande) em um **objeto enxuto e tipado**;
- mantém um **catálogo local**, impedindo registros duplicados;
- **persiste** o catálogo em `pc_box.json` entre execuções;
- trata erros (Pokémon inexistente / falha de rede) **sem quebrar**.

## 🎯 Objetivo

Praticar os conceitos do Módulo 01: Node.js, TypeScript, interfaces, classes, POO, `async/await`, `fetch`, métodos de array, tratamento de erros, Git/GitFlow e **arquitetura em camadas**.

## 🛠️ Tecnologias utilizadas

- **Node.js** (v18+; desenvolvido no v24)
- **TypeScript** (strict mode)
- **tsx** (execução em ambiente de desenvolvimento)
- **ESLint** + typescript-eslint
- **PokeAPI**
- **Git / GitHub**

## ✅ Pré-requisitos

- Node.js 18 ou superior (o `fetch` nativo exige essa versão)
- npm
- Git

## 📥 Como instalar

```bash
# clonar o repositório
git clone https://github.com/LucasR0sa/mini-projeto-avaliativo-pokedex-typescript-lite.git

# entrar na pasta
cd mini-projeto-avaliativo-pokedex-typescript-lite

# instalar as dependências de desenvolvimento
npm install
```

## ▶️ Como executar

```bash
# rodar a aplicação
npm run start

# (opcional) compilar o TypeScript para a pasta dist/
npm run build

# (opcional) checar o código com o linter
npm run lint
```

## ⚙️ Funcionalidades

- 🔍 Buscar Pokémon por nome ou ID na PokeAPI
- 🧹 Transformar a resposta da API em objeto simplificado (`PokemonResumo`)
- 🚫 Tratar erro de Pokémon inexistente (HTTP 404)
- ➕ Adicionar Pokémon ao catálogo (sem duplicar pelo `id`)
- 📋 Listar o catálogo
- ➖ Remover Pokémon por ID
- 💾 Persistir o catálogo no arquivo `pc_box.json`
- 🗣️ Mensagens claras no terminal (`[OK]`, `[AVISO]`, `[ERRO]`)

## 🧪 Exemplos de execução

### Busca válida + adição
Entradas testadas: `pikachu`, `charmander`
```
[OK] pikachu adicionado ao catálogo.
[OK] charmander adicionado ao catálogo.
```

### Duplicidade
Entrada: adicionar `pikachu` novamente
```
[AVISO] pikachu já está no catálogo.
```

### Busca inválida
Entrada: `pokemon-inexistente`
```
[ERRO] Pokémon não encontrado: pokemon-inexistente
```

### Listagem
```
--- Catálogo ---
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60 | HP: 35 | Ataque: 55 | Defesa: 40
#4 - charmander | Tipos: fire | Altura: 6 | Peso: 85 | HP: 39 | Ataque: 52 | Defesa: 43
```

### Remoção
Entrada: remover ID `25`
```
[OK] Pokémon com ID 25 removido do catálogo.
```

## 🗂️ Estrutura do projeto

```
mini-projeto-avaliativo-pokedex-typescript-lite/
├── src/
│   ├── main.ts                        # Ponto de entrada: cria serviços, injeta dependências e inicia
│   ├── controllers/
│   │   └── TerminalController.ts       # Orquestra o fluxo (camada de interface)
│   ├── services/
│   │   ├── PokeApiService.ts           # Integração com a PokeAPI (fetch + mapeamento)
│   │   ├── BoxService.ts               # Persistência local (node:fs/promises)
│   │   └── CatalogoPokemon.ts          # Lógica do catálogo (adicionar/listar/remover)
│   └── models/
│       ├── Pokemon.ts                  # Interfaces PokemonResumo e PokemonApiResponse
│       └── CustomErrors.ts             # Erros customizados (APIError, LocalBoxError)
├── pc_box.json                         # Banco de dados local (persistência JSON)
├── tsconfig.json                       # Configuração do TypeScript (strict mode)
├── eslint.config.mjs                   # Configuração do ESLint
└── package.json                        # Manifesto e scripts
```

### Explicação curta dos arquivos
- **main.ts** — ponto de entrada; cria os serviços e os injeta no controller.
- **TerminalController.ts** — coordena busca, catálogo e persistência (injeção de dependências).
- **PokeApiService.ts** — busca na PokeAPI com `fetch`, mapeia para `PokemonResumo` e lança `APIError` em caso de 404.
- **BoxService.ts** — lê e grava o `pc_box.json` usando `node:fs/promises`.
- **CatalogoPokemon.ts** — classe com array `private`; métodos `adicionar`, `listar`, `remover`.
- **models/** — interfaces (`Pokemon.ts`) e classes de erro customizadas (`CustomErrors.ts`).

## 🧠 Conceitos aplicados

- **TypeScript e tipagem:** todos os parâmetros e retornos são tipados — por exemplo, `buscarPokemon(nomeOuId: string): Promise<PokemonResumo>` e os métodos do catálogo com retorno `void`. O `strict mode` do `tsconfig.json` obriga a tratar valores `null`/`undefined`, evitando erros silenciosos.
- **Interfaces (`PokemonResumo` / `PokemonApiResponse`):** foram criadas duas interfaces porque a PokeAPI devolve um objeto grande e aninhado. A `PokemonApiResponse` descreve apenas os campos usados da resposta crua; a `PokemonResumo` é o objeto enxuto que a aplicação usa internamente. Assim separamos o formato externo do formato interno.
- **`fetch` e `async/await`:** o `PokeApiService` consulta a PokeAPI com `await fetch(url)` e lê o corpo da resposta com `await resposta.json()`. Os métodos são `async` e retornam `Promise`, o que permite esperar a resposta da rede sem travar o programa.
- **Tratamento de erros:** quando a resposta não é `ok` (ex.: 404), o serviço lança um `APIError`; ao falhar ao gravar o arquivo, o `BoxService` lança um `LocalBoxError`. Quem captura é o `TerminalController`, com `try/catch` e checagem `instanceof Error`, exibindo `[ERRO]`. Ou seja: a camada de serviço **detecta e lança** o erro, e a camada de cima **trata**.
- **Métodos de array:** `map` (transformar os tipos da API em lista de nomes), `find` (localizar as stats HP/Attack/Defense), `some` (verificar duplicidade pelo `id`), `forEach` (listar o catálogo) e `filter` (remover um Pokémon pelo `id`).
- **Classes e POO (`CatalogoPokemon`):** classe com atributo `private pokemons` (encapsulamento), construtor que recebe a lista inicial e métodos `adicionar`, `listar`, `remover` e `obterTodos`. As classes de erro `APIError` e `LocalBoxError` usam **herança** (`extends Error`).
- **Injeção de dependências:** o `main.ts` cria o `PokeApiService` e o `BoxService` e os **injeta** no construtor do `TerminalController`, que apenas os utiliza (não os cria). Isso desacopla as camadas e deixa o código mais organizado e fácil de testar.



## 🌿 Branches utilizadas (GitFlow)

- `main` — versão estável/entregável
- `develop` — integração do desenvolvimento
- `feat/pokedex` — desenvolvimento da funcionalidade
- `docs/readme` — documentação

## 👤 Autor

Lucas Rosa — [@LucasR0sa](https://github.com/LucasR0sa)
