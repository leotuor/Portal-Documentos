# Portal-Documentos

Sistema de gerenciamento de solicitações de declarações acadêmicas para a UCEFF.

## 📋 Descrição

O Portal-Documentos é uma aplicação web completa que permite aos alunos solicitar diferentes tipos de declarações acadêmicas de forma digital e automatizada. O sistema é composto por uma API REST em Node.js e uma interface frontend em Nuxt.js.

## 🏗️ Arquitetura do Projeto

```
Portal-Documentos/
├── UCEFF-API/          # Backend - API REST
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   └── utils/
│   └── package.json
└── UCEFF-Front/        # Frontend - Nuxt.js
    ├── pages/
    ├── plugins/
    ├── public/
    └── package.json
```

## 🛠️ Tecnologias Utilizadas

### Backend (UCEFF-API)
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Sequelize** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados

### Frontend (UCEFF-Front)
- **Nuxt.js 3** - Framework Vue.js
- **Vue.js** - Framework JavaScript
- **Vuetify** - Biblioteca de componentes UI
- **TypeScript** - Tipagem estática

## 📊 Banco de Dados

### Estrutura das Tabelas

#### Tabela `aluno`
```sql
CREATE TABLE aluno (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(75) NOT NULL,
    data_nascimento DATE NOT NULL,
    matricula VARCHAR(14),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Tabela `tipo_declaracao`
```sql
CREATE TABLE tipo_declaracao (
    id INT PRIMARY KEY,
    tipo VARCHAR(30) NOT NULL
);
```

#### Tabela `pedidos_declaracoes`
```sql
CREATE TABLE pedidos_declaracoes (
    id SERIAL PRIMARY KEY,
    id_tipo_declaracao INT REFERENCES tipo_declaracao(id),
    id_aluno INT REFERENCES aluno(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Dados Iniciais
```sql
INSERT INTO tipo_declaracao(id, tipo) VALUES 
    (1, 'matricula'),
    (2, 'conclusao'),
    (3, 'frequencia');
```

## ⚙️ Configuração e Instalação

### Pré-requisitos
- Node.js (versão 16 ou superior)
- PostgreSQL
- npm ou yarn

### 1. Configuração do Banco de Dados

Execute os comandos SQL acima para criar as tabelas e inserir os dados iniciais.

### 2. Configuração do Backend (UCEFF-API)

```bash
cd UCEFF-API
npm install
```

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
POSTGRES_HOST=localhost
POSTGRES_DB=seu_banco_de_dados
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=sua_senha
POSTGRES_PORT=5432
API_PORT=3333
API_HOST=http://localhost
```

### 3. Configuração do Frontend (UCEFF-Front)

```bash
cd UCEFF-Front
npm install
```

## 🚀 Executando o Projeto

### Backend
```bash
cd UCEFF-API
npm run dev
```
A API estará disponível em `http://localhost:3333`

### Frontend
```bash
cd UCEFF-Front
npm run dev
```
A aplicação estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

### Backend (UCEFF-API)
- `src/controllers/` - Controladores da API
- `src/models/` - Modelos do Sequelize
- `src/routes/` - Definição das rotas

### Frontend (UCEFF-Front)
- `pages/` - Páginas da aplicação
- `plugins/` - Plugins do Nuxt.js
- `public/` - Arquivos estáticos

## 🔧 Funcionalidades

- ✅ Cadastro e gerenciamento de alunos
- ✅ Solicitação de declarações acadêmicas
- ✅ Diferentes tipos de declaração (matrícula, conclusão, frequência)
- ✅ Geração automática de documentos em PDF
- ✅ Interface responsiva e intuitiva
