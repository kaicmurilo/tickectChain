# Aplicação de Venda de Ingressos com React e Blockchain

Esta aplicação permite a venda de ingressos utilizando React para o frontend, Solidity para os smart contracts na blockchain Ethereum, MetaMask para interação com a carteira do usuário e armazenamento de dados na blockchain para persistência.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [📦 Estrutura do Projeto](#-estrutura-do-projeto)
- [⚙️ Pré-requisitos](#️-pré-requisitos)
- [🚀 Instalação](#-instalação)
  - [1. Clonar o Repositório](#1-clonar-o-repositório)
  - [2. Configurar o Backend (Truffle e Smart Contracts)](#2-configurar-o-backend-truffle-e-smart-contracts)
    - [a. Navegar para o Diretório do Backend](#a-navegar-para-o-diretório-do-backend)
    - [b. Instalar Dependências](#b-instalar-dependências)
    - [c. Iniciar a Blockchain Local com Ganache](#c-iniciar-a-blockchain-local-com-ganache)
    - [d. Compilar os Contratos](#d-compilar-os-contratos)
    - [e. Migrar os Contratos para a Blockchain](#e-migrar-os-contratos-para-a-blockchain)
  - [3. Configurar o Frontend (React)](#3-configurar-o-frontend-react)
    - [a. Navegar para o Diretório do Frontend](#a-navegar-para-o-diretório-do-frontend)
    - [b. Instalar Dependências](#b-instalar-dependências-1)
    - [c. Configurar o Frontend](#c-configurar-o-frontend)
- [🔧 Executando a Aplicação](#-executando-a-aplicação)
  - [1. Iniciar o Backend](#1-iniciar-o-backend)
  - [2. Iniciar o Frontend](#2-iniciar-o-frontend)
- [🔄 Refazer o Build](#-refazer-o-build)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [🛠️ Solução de Problemas](#️-solução-de-problemas)
- [📚 Recursos Adicionais](#-recursos-adicionais)
- [📄 Licença](#-licença)

## Visão Geral

A aplicação consiste em duas partes principais:

1. **Backend**: Smart contracts desenvolvidos em Solidity e gerenciados pelo Truffle. Utiliza Ganache para uma blockchain local de desenvolvimento.
2. **Frontend**: Aplicação React que interage com os smart contracts através do Web3.js e MetaMask.

## 📦 Estrutura do Projeto

```
ticket-sale-app/
├── backend/
│   ├── contracts/
│   │   ├── Migrations.sol
│   │   └── TicketSale.sol
│   ├── migrations/
│   │   ├── 1_initial_migration.js
│   │   └── 2_deploy_contracts.js
│   ├── build/
│   │   └── contracts/
│   │       ├── Migrations.json
│   │       └── TicketSale.json
│   ├── test/
│   ├── truffle-config.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── contracts/
│   │   │   └── TicketSale.json
│   │   ├── utils/
│   │   │   └── getWeb3.js
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── ... (outros arquivos do React)
└── README.md
```

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado o seguinte em sua máquina:

- [Node.js](https://nodejs.org/) (v16.x ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)
- [Truffle](https://www.trufflesuite.com/truffle) (`npm install -g truffle`)
- [Ganache](https://www.trufflesuite.com/ganache) (GUI ou CLI)
- [MetaMask](https://metamask.io/) (extensão do navegador)

## 🚀 Instalação

### 1. Clonar o Repositório

Primeiro, clone este repositório para sua máquina local:

```bash
git clone https://github.com/seu-usuario/ticket-sale-app.git
cd ticket-sale-app
```

### 2. Configurar o Backend (Truffle e Smart Contracts)

#### a. Navegar para o Diretório do Backend

```bash
cd backend
```

#### b. Instalar Dependências

Embora o Truffle seja instalado globalmente, é uma boa prática instalar também localmente:

```bash
npm install
```

#### c. Iniciar a Blockchain Local com Ganache

Abra um novo terminal e inicie o Ganache. Se estiver usando a versão CLI:

```bash
ganache-cli
```

Ou, se estiver usando a GUI, abra o Ganache e inicie uma nova blockchain local.

#### d. Compilar os Contratos

No diretório `backend/`, execute:

```bash
truffle compile
```

#### e. Migrar os Contratos para a Blockchain

Certifique-se de que o Ganache está rodando e execute:

```bash
truffle migrate --reset
```

**Nota**: O `--reset` força a reimplantação de todos os contratos.

### 3. Configurar o Frontend (React)

#### a. Navegar para o Diretório do Frontend

Em outro terminal, navegue para o diretório do frontend:

```bash
cd ../frontend
```

#### b. Instalar Dependências

Instale as dependências necessárias do React:

```bash
npm install
```

#### c. Configurar o Frontend

Copie o arquivo `TicketSale.json` gerado pelo Truffle para o frontend:

```bash
cp ../backend/build/contracts/TicketSale.json src/contracts/
```

Assegure-se de que o arquivo `src/contracts/TicketSale.json` existe.

## 🔧 Executando a Aplicação

### 1. Iniciar o Backend

Certifique-se de que o Ganache está rodando e que os contratos estão migrados conforme os passos acima.

### 2. Iniciar o Frontend

No diretório `frontend/`, execute:

```bash
npm start
```

Isso iniciará a aplicação React em `http://localhost:3000`.

**Nota**: Abra o navegador e conecte o MetaMask à rede local (normalmente `http://127.0.0.1:8545`). Importe uma das contas fornecidas pelo Ganache para o MetaMask para interagir com os contratos.

## 🔄 Refazer o Build

Se você precisar refazer o build dos contratos ou do frontend, siga os passos abaixo.

### Backend (Truffle)

1. **Limpar os Artefatos de Compilação**:

   ```bash
   rm -rf build/
   ```

2. **Recompilar os Contratos**:

   ```bash
   truffle compile
   ```

3. **Migrar Novamente os Contratos**:

   ```bash
   truffle migrate --reset
   ```

### Frontend (React)

1. **Reinstalar Dependências (se necessário)**:

   ```bash
   npm install
   ```

2. **Recompilar o Frontend**:

   ```bash
   npm run build
   ```

   Isso criará uma versão otimizada para produção na pasta `build/`.

## 📂 Estrutura do Projeto

### Backend (`backend/`)

- **contracts/**: Contém os smart contracts Solidity.
  - `Migrations.sol`: Contrato de migração padrão do Truffle.
  - `TicketSale.sol`: Contrato principal para venda de ingressos.
- **migrations/**: Scripts de migração para implantar os contratos.
  - `1_initial_migration.js`: Migração para o contrato `Migrations`.
  - `2_deploy_contracts.js`: Migração para o contrato `TicketSale`.
- **build/**: Artefatos compilados gerados pelo Truffle.
- **truffle-config.js**: Configuração do Truffle.

### Frontend (`frontend/`)

- **src/**
  - **contracts/**: Contém os artefatos do contrato `TicketSale.json`.
  - **utils/**: Utilitários, como `getWeb3.js` para configurar o Web3.
  - `App.js`: Componente principal React.
  - `index.js`: Ponto de entrada do React.

## 🛠️ Solução de Problemas

- **Erro ao Migrar Contratos**: Certifique-se de que o Ganache está rodando e que as configurações de rede no `truffle-config.js` estão corretas.
- **MetaMask Não Conecta à Rede Local**:
  - Verifique se a rede local está selecionada no MetaMask.
  - Importe uma das contas do Ganache no MetaMask usando a chave privada fornecida pelo Ganache.
- **Ingressos Não Aparecem como Disponíveis**:
  - Verifique se os contratos foram migrados corretamente.
  - Atualize o frontend para refletir os dados mais recentes da blockchain.

## 📚 Recursos Adicionais

- [Documentação do Truffle](https://www.trufflesuite.com/docs)
- [Documentação do React](https://reactjs.org/docs/getting-started.html)
- [Documentação do Web3.js](https://web3js.readthedocs.io/)
- [Documentação do MetaMask](https://docs.metamask.io/)
- [Solidity Documentation](https://docs.soliditylang.org/)

## 📄 Licença

Este projeto está licenciado sob a licença [MIT](LICENSE).

---

**Desenvolvido por [Seu Nome](https://github.com/seu-usuario)**
