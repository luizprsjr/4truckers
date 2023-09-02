# 4truckers

## RFs (Requisitos funcionais)

- [] Deve ser possível se cadastrar;
- [] Deve ser possível se autenticar;
- [] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível cadastrar uma nova viagem;
- [] Deve ser possível listar as viagens futuras;

## RNs (Regras de negócio)

- [] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [] Somente usuários do tipo caminhoneiro podem registrar um caminhão;
- [] Somente usuários do tipo usuário podem colocar informações adicionais no anúncio, essas informações do caminhoneiro devem estar na tabela do caminhão;

## RNFs (Requisitos não-funcionais)

- [] A senha do usuário precisa estar criptografada;
- [] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
- [] O usuário dever ser identificado por um JWT;
