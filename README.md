# Desafio Técnico – iGreen Energy

## Tecnologias Utilizadas

### Front-end

- React + TypeScript + Vite
- Context API + React Router DOM
- React Hook Form + Zod
- TailwindCSS (estilização responsiva)
- Axios (requisições HTTP)

### Back-end

- Node.js + Express + TypeScript
- Prisma ORM + PostgreSQL
- JWT para autenticação
- Zod para validação

---

## Requisitos para Rodar

- Node.js 18+
- PostgreSQL local
- Prisma (via `npx`)
- Terminal com suporte a scripts TypeScript (ex: `ts-node`)

---

# Passo a passo para rodar o projeto

## Back-end (API REST)

1. Criar banco de dados PostgreSQL

### No seu terminal SQL (psql ou PgAdmin):

CREATE DATABASE igreen
WITH
OWNER = postgres
ENCODING = 'UTF8'
LC_COLLATE = 'pt-BR'
LC_CTYPE = 'pt-BR'
LOCALE_PROVIDER = 'libc'
TABLESPACE = pg_default
CONNECTION LIMIT = -1
IS_TEMPLATE = False;

2.  Rodar as migrações com Prisma

-- A tabela "user" será criada automaticamente com base no schema Prisma

npx prisma migrate dev --name init

-- Esse comando executa as migrations já preparadas no projeto e cria as tabelas no PostgreSQL automaticamente, inclusive visíveis no PgAdmin

3. Instalar dependências do backend
   cd backend
   npm install

4. Criar arquivo .env

- Crie um .env na raiz do backend com base em

DATABASE_URL="postgresql://
postgres:SENHA@localhost:5432/BANCO?schema=public"
JWT_SECRET="sua_chave_jwt"

- A Estrutura do Projeto no backend ficará assim

|-- backend
| |-- prisma/
| |-- scripts/hashPassword.ts
| |-- src/
| |-- .env

5. Gerar o Prisma Client

npx prisma generate

6. Criar usuário admin para login

-- No diretório 'backend', rode o comando para gerar a senha

npx ts-node src/scripts/hashPassword.ts
--- (Se der erro, use npm install -D ts-node)

-- Depois no VALUES, preencha o email, e a senha gerada pelo script acima

INSERT INTO "User" (email, password)
VALUES (
'admin@admin.com',
'hash_bcrypt_gerada'
);

- Esse script insere:
  - Email: admin@igreen.com
  - Senha: hash_bcrypt(123456)

7. Rodar o servidor backend

npm run dev

---

Frontend (React + Vite)

1. Instalar dependências do frontend

cd ../frontend
npm install

2. Rodar frontend

npm run dev

- A Estrutura final do projeto ficará assim

|-- backend
| |-- prisma/
| |-- scripts/hashPassword.ts
| |-- src/
| |-- .env  
|-- frontend
| |-- src/
|-- README.md

# Documentação da API

## POST | /login | Faz login, retorna JWT

- Headers

Content-Type: application/json

- Body POST /login

{
"email": "admin@admin.com",
"password": "123456"
}

- Exemplo de Resposta (Usuário e Senha válidos)
- STATUS 200

{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzUyMjM2NDkwLCJleHAiOjE3NTIyNDAwOTB9.57oIXdt4acUzi5cTWwXB0069eiZu-tf86dalxjycQIk"
}

---

- Exemplo de Resposta (Usuário e Senha inválidos) - STATUS 401

{
"message": "Credenciais inválidas"
}

---

### CURL completo da requisição POST /login

curl --location 'http://localhost:3000/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{
"email": "admin@admin.com",
"password": "123456"
}'

---

## GET | /data | Retorna usuário + lista de dados da API pública

- Headers

Authorization: Bearer {SEU_TOKEN_GERADO}

- Exemplo de Resposta (Token Válido) - STATUS 200

{
"user": {
"userId": 1,
"email": "admin@admin.com",
"iat": 1752236490,
"exp": 1752240090
},
"pokemons": [
{
"name": "bulbasaur",
"url": "https://pokeapi.co/api/v2/pokemon/1/"
},
{
"name": "ivysaur",
"url": "https://pokeapi.co/api/v2/pokemon/2/"
}
]
}

---

- Exemplo de Resposta (Token inválido)
- STATUS 401

{
"message": "Token inválido"
}

---

### CURL completo da requisição GET /data

curl --location 'http://localhost:3000/api/data' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzUyMjM2NDkwLCJleHAiOjE3NTIyNDAwOTB9.57oIXdt4acUzi5cTWwXB0069eiZu-tf86dalxjycQIk'
