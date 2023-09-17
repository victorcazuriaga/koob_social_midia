# Lacrei Saúde


## Índice

- [Visão Geral](#visão-geral)
- [Requisitos](#requisitos)
- [Tecnologias](#tecnologias-utilizadas)
- [Configuração de Variáveis de ambiente ](#configuração-de-variáveis-de-ambiente)
- [Instalação das Dependências](#instalação-das-dependências)
- [Executando o Projeto](#executando-o-projeto)
- [Executando com Docker](#executando-com-docker)
- [Testes](#testes)
- [Uso](#uso)
- [Licença](#licença)


## Visão Geral
![image](https://github.com/victorcazuriaga/koob_social_midia/assets/47061852/b8033446-2a1b-4f16-87f7-4e57add5ad02)



## Tecnologias Utilizadas
A API foi desenvolvida utilizando as seguintes tecnologias:

- Linguagem de Programação: [Typescript]
- Framework: [NestJS]
- Banco de Dados: [Postgres]
- Outras Bibliotecas: [Bcrypt, Swagger, PrismaORM, Jwt]



## Requisitos

- NodeJs (versão 18.0.X)
- Docker (versão 23.0.X)
- Docker Compose (versão 2.17.X)
- Postgres (versão 15.X.X)


## Configuração de Variáveis de ambiente
1. crie na raiz do projeto o arquivo .env

2. preencha a .env de acordo com .env.example
   
```
JWT_SECRET={insira uma secret_key}
DATABASE_URL={insira uri banco de dados}

```

## Instalação das Dependências
Para instalar as dependências do projeto, execute o seguinte comando:

pnpm: 
```
pnpm install

```
npm: 
```
npm install

```

## Executando o Projeto
Siga os passos abaixo para executar o projeto:

1. Gerar as migrações

pnpm: 
```
pnpm prisma migrate deploy

```
npm: 
```
npx prisma migrate deploy

```
2. Inicie o servidor de desenvolvimento:

pnpm: 
```
pnpm start:dev

```
npm: 
```
npm run start:dev
```
O servidor estará disponível em http://localhost:3000.

## Executando com Docker
Siga os passos abaixo para executar o projeto utilizando o Docker:

1. Execute o comando para construir as imagens e iniciar os containers:

```
docker compose up
```
Isso irá construir as imagens e iniciar os containers necessários para o projeto.

2. O servidor estará disponível em http://localhost:3000.

## Testes
Para executar os testes do projeto, utilize o seguinte comando:
pnpm: 
```
pnpm test

```
npm: 
```
npm run test

```

## Uso
- Executando em ambiente local
1. Consultar a documentação Swagger
```
localhost:3000/api
```

- Utilizando a versão publicada no Render
BaseUrl: https://desafio-koob.onrender.com/
1. Consultar a documentação Swagger
```
https://desafio-koob.onrender.com/api
```
* Observações: deploy utilizando nivel free no render, devido a isto e possível que ao acessar as rotas pela primeira vez demore cerca de  2 - 10 minutos,
já que a maquina fica inativa. 
## Licença
[MIT License](LICENSE)

[Linkedin](https://www.linkedin.com/in/victorcazuriaga/)
