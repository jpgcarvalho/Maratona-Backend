const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")

// usando template engine
server.set('view engine', 'ejs')

/* O ejs por padrão espera que a pasta views esteja na pasta principal do projeto
assim temos que fazer essa linha abaixo para ele achar as paginas.
__dirname: me dá o caminho atual da pasta que estamos, como server está na mesma
pasta que views usamos o caminho dele para acharmos a nossa pasta views.
*/ 
server.set('views', path.join(__dirname, 'views'))



//habilitar arquivos statics
server.use(express.static("public"))

// usar o req.body
server.use(express.urlencoded({ extended: true}))

// aqui ele vai renderizar as paginas
server.use(routes)

server.listen(3000, () => console.log("rodando"))
