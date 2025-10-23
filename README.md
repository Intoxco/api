# LFJob
 Projeto feito para disciplina de Tecnologia de Sistemas Distribuidos na UTFPR - Sexto Período

Sobre o projeto:
-Busca implementar uma plataforma para procura de vagas de emprego(LFJOB -> Looking for Job -> procurando emprego) através de um protocolo coletivo
-Back-End:Feito utilizando no Spring Boot(Java) com o Maven,Migrations,Annotations e outras tecnologias que virão a ser implementadas.
-Front-End: Feito com o desenvolvimento web padrão(HTML,CSS,JAVASCRIPT), sem nenhuma biblioteca ou framework

Instalação:
-Crie uma pasta e clone esse repositório, após isso, adicione maven às dependências do projeto
-Instale o Xampp, ative o apache e mysql, após isso acesse [localhost/](http://localhost/phpmyadmin/) e crie um banco de dados chamado 'lfjob'
-O projeto conta com um driver mariadb para conectar-se ao banco de dados recem criado, dependendo do local em que será executado, será necessário configurar a conexão, no caso do IntelliJ(ferramenta usada no desenvolvimento), será  necessário criar uma nova conexão e vincular os dados.
-No caminho src/main/java/lfjob.api será encontrado o BackEnd
-No caminho src/main/resources será encontrado o FrontEnd, as migrations(formarão o banco iniciar o código na primeira vez) e o arquivo application.properties, que contém os dados para vincular o banco de dados no mariadb,gerar chaves para o JWT e configurar a porta padrão da API(20001)
-Terminada a configuração, basta executar a API e ela estará pronta para pedidos do cliente
-O FrontEnd deve ser iniciado no arquivo connection.html no navegador
