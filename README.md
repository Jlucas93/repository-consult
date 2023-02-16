# Sobre o projeto

<p>Um projeto em react usando o vite para criar o app, utiliza do react router dom versão para lidar com a troca de páginas, e axios para o consumo da api. Para estilização utiliza a lib style components</p>

<p>O projeto consome a API do github, onde busca um repositório do git pelo seu nome, e irá armazenar no LocalStorage do navegador, assim não persiste mesmo atualizando a página ou fechando o navegador.</p>

<p> Na tela inicial do app é necessário buscar somente o nome do repositório. Note que o github usa do nome do usuário antes do nome do repositório em si. Ex: facebook/react, angular/angular, Jlucas93/repository consult. </p>

<img src="./public/homepage.png" alt="home page">

<p> Uma vez que o repositpório tenha sido encontrado você pode olhar mais detealhes sobre, incluindo as issues que ele contém. Como mostra a imagem abaixo</p>

<img src = "./public/repoinfo.png" alt="repo info" />

# Para instalar e rodar o projeto

```
npm install ou yarn 

npm run dev ou yarn dev
```