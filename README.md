# Instalação do APP
**1:** Clone o repositório https://github.com/FelipeBigarelli/Exame-Suficiencia-Backend.git

**2:** Entre no projeto e instale as dependências de acordo com seu gerenciador de pacotes
  - yarn install
  - npm install

**3:** Configure o docker do banco de dados
  - docker run --name backend -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1234 -d mysql

**4:** Verifique se a instância 'backend' foi criada
  - docker ps OU docker ps -a
  - Caso não tenha iniciado, execute o comando:
    - docker start backend

**5:** Execute a aplicação
  - yarn dev
