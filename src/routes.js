const express = require("express") // express é uma biblioteca pra criar o servidor
const routes = express.Router() // router é um método do express pra criar os caminhos da página
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')

// req, res
routes.get('/', JobController.index)
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)


module.exports = routes; // está exportando routes para podermos reutiliza-lo na aplicação principal