# Instalação do APP
**01:** Clone o repositório https://github.com/FelipeBigarelli/Exame-Suficiencia-Backend.git

**02:** Entre no projeto e instale as dependências de acordo com seu gerenciador de pacotes
  - yarn install
  - npm install

**03:** Configure o container do docker do banco de dados
  - docker run --name backend -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1234 -d mysql

**04:** Verifique se a instância 'backend' foi criada
  - docker ps OU docker ps -a
  - Caso não tenha iniciado, execute o comando:
    - docker start backend

**05:** Conecte ao MySQL Container
  - docker exec -it backend mysql -uroot -p

**06:** Crie o database
  - CREATE DATABASE backend;

**07:** Execute a aplicação
  - yarn dev

**08:** No Postman ou Dbeaver, conecte ao database da aplicação com as configurações contidas no arquivo src/shared/database/index.js

## OBSERVAÇÃO :
 - Na pasta do projeto, está adicionado o arquivo: Insomnia Suficiência Backend.json.
 - Este arquivo contêm as configurações das rotas para teste, juntamente com a atualização automática do token quando há uma nova autenticação.
 - Se preferir, importe este arquivo JSON montado.

**09:** Crie e execute a rota de criação de tabelas do banco de dados
  - POST: http://localhost:3000/models
