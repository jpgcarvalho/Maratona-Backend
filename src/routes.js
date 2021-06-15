const express = require("express") // express é uma biblioteca pra criar o servidor
const routes = express.Router() // router é um método do express pra criar os caminhos da página


/* O ejs por padrão espera que a pasta views esteja na pasta principal do projeto
assim temos que fazer essa linha abaixo para ele achar as paginas.
__dirname: me dá o caminho atual da pasta que estamos, como routes está na mesma
pasta que views usamos o caminho dele para acharmos a nossa pasta view.

*/ 
const views = __dirname + "/views/"


const profile = {
    name: "João Pedro",
    avatar: "https://avatars.githubusercontent.com/u/56309566?v=4",
    "monthly-budget": 300,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75
}

const jobs = [
    {
        id: 1,
        name: "Pizzaria Guloso",
        'daily-hours': 2,
        'total-hours': 60,
        created_at: Date.now() 
    },
    {
        id: 2,
        name: "OneTwo Project",
        'daily-hours': 3,
        'total-hours': 47,
        created_at: Date.now() 
    }
]


function remainingDays(job) {
        // ajustes no job
        // calculo de tempo restante
        const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()

        const createdDate = new Date(job.created_at)
        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDateInMs = createdDate.setDate(dueDay)

        const timeDiffInMs = dueDateInMs - Date.now()
        // transformar milli em dias
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.floor(timeDiffInMs / dayInMs)

        // restam X dias
        return dayDiff
}



// req, res
routes.get('/', (req, res) => {
    const updatedJobs = jobs.map((job) => {
        const remaining = remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'


        return {
            ...job,
            remaining,
            status,
            budget: profile["value-hour"] * job["total-hours"]

        }
    })




    res.render(views + "index", { jobs: updatedJobs })

})








routes.get('/job', (req, res) => res.render(views + "job"))
routes.post('/job', (req, res) => {
    // req.body { name: 'asdf', 'daily-hours': '3', 'total-hours': '12'}

    // pegando o id do job cadastrado. Se for o primeiro job automaticamente o id = 1
    const lastId = jobs[jobs.length - 1]?.id || 1

    jobs.push({
        id: lastId + 1,
        name: req.body.name,
        'daily-hours': req.body['daily-hours'],
        'total-hours': req.body['total-hours'],
        created_at: Date.now() // atribuindo a data de hoje
    })
    return res.redirect('/')
})
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile }))


module.exports = routes; // está exportando routes para podermos reutiliza-lo na aplicação principal