const express = require("express") // express é uma biblioteca pra criar o servidor
const routes = express.Router() // router é um método do express pra criar os caminhos da página


/* O ejs por padrão espera que a pasta views esteja na pasta principal do projeto
assim temos que fazer essa linha abaixo para ele achar as paginas
__dirname: me dá o caminho atual do arquivo que estamos, como routes está na mesma
pasta que views usamos o caminho dele para acharmos a nossa pasta view.

*/ 
const views = __dirname + "/views/"


const profile = {
    name: "João Pedro",
    avatar: "https://avatars.githubusercontent.com/u/56309566?v=4",
    "monthly-budget": 300,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4
}

// req, res
routes.get('/', (req, res) => res.render(views + "index"))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile }))


module.exports = routes; // está exportando routes para podermos reutiliza-lo na aplicação principal