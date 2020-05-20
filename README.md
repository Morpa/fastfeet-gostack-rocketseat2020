<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src=".github/logo.png" width="300px" />
</h1>

<h3 align="center">
  :warning: Desafio Final :warning:
</h3>

<p>Este desafio faz parte do Desafio Final, que é uma aplicação completa (Back-end, Front-end e Mobile) que é avaliada para emissão do Certificado do Bootcamp GoStack, por isso é fundamental que ele seja feito com muito empenho!</p>

## :rocket: Sobre o desafio

Aplicação para uma transportadora fictícia, o FastFeet.

## Instalação e utilização

### Backend - Node.js

1.  Acesse a pasta backend e siga os passos abaixos:
2.  Rodar 'yarn' para instalar as dependências
3.  Instalar, criar e subir um banco de dados Postgres:

```
docker run --name postgresfastfeet -e POSTGRES_PASSWORD=fastfeet -p 5432:5432 -d postgres:11
```

4.  Instalar, criar e subir um banco de dados Redis:

```
docker run --name redisfastfeet -p 6379:6379 -d -t redis:alpine
```

5.  Acesse o banco postgres com algum gerenciador como exemplo postbird, crie o banco com nome de fastfeet
6.  Alterar o arquivo .env.example para .env e alterar as informações
7.  Rodar 'yarn sequelize db:migrate'
8.  Rodar 'yarn sequelize db:seed:all'
9.  Rodar 'yarn dev' // Servidor
10. Rodar 'yarn queue' // Servidor de envio de e-mails

### Frontend WEB - REACTJS

1.  Acesse a pasta web
2.  Rodar 'yarn' para instalar as dependências
3.  Rodar 'yarn start'

### Mobile APP - React Native

1.  Acesse a pasta mobile
2.  Rodar 'yarn' para instalar as dependências
3.  Alterar o arquivo .env.example para .env e alterar as informações
4.  Com o emulador conectado, rodar 'react-native run-android ou run-ios
5.  Se precisar parar e conectar de novo, rdar 'react-native start

```

Obs: Projeto testado apenas no IOS
```
