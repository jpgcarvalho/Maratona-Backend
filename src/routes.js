const express = require("express") // express é uma biblioteca pra criar o servidor
const routes = express.Router() // router é um método do express pra criar os caminhos da página


/* O ejs por padrão espera que a pasta views esteja na pasta principal do projeto
assim temos que fazer essa linha abaixo para ele achar as paginas.
__dirname: me dá o caminho atual da pasta que estamos, como routes está na mesma
pasta que views usamos o caminho dele para acharmos a nossa pasta view.

*/ 
const views = __dirname + "/views/"


const Profile = {
    data: {
        name: "João Pedro",
        avatar: "https://avatars.githubusercontent.com/u/56309566?v=4",
        "monthly-budget": 300,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },
    controllers: {
        index(req, res) {
            return res.render(views + "profile", { profile: Profile.data })
        },
        update(req, res){
            // req.body para pegar os dados
            const data = req.body

            // definir quantas semanas tem num ano: 52 semanas
            const weeksPerYear = 52

            // remover as semanas de férias do ano, para pegar quantas semanas tem 1 mes
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"] ) / 12 
            
            // total de horas trabalhadas na semana 
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

            // horas trabalhadas no mes
            const monthlyTotalHours = weekTotalHours * weeksPerMonth

            // qual sera o valor da minha hora
            const valueHour = data["value-hour"] = data["monthly-budget"] / monthlyTotalHours

            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hour": valueHour
            }

            return res.redirect('/profile')
        },
    }
}

const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            'daily-hours': 2,
            'total-hours': 1,
            created_at: Date.now()
        },
        {
            id: 2,
            name: "OneTwo Project",
            'daily-hours': 3,
            'total-hours': 47,
            created_at: Date.now()
        }
    ],

    controllers: {
        index(req, res){
            const updatedJobs = Job.data.map((job) => {
                //ajustes no job
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'

                return {
                    ...job,
                    remaining,
                    status,
                    budget: Profile.data["value-hour"] * job["total-hours"]
                }
            })

            return res.render(views + "index", {jobs: updatedJobs})
        },

        create(req, res){
            return res.render(views + "job")
        },

        save(req, res) {
            // req.body { name: 'asdf', 'daily-hours': '3', 'total-hours': '12'}

            // pegando o id do job cadastrado. Se for o primeiro job automaticamente o id = 1
            const lastId = Job.data[Job.data.length - 1]?.id || 1

            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                'daily-hours': req.body['daily-hours'],
                'total-hours': req.body['total-hours'],
                created_at: Date.now() // atribuindo a data de hoje
            })
            return res.redirect('/')
        }
    },

    services: {
        remainingDays(job) {
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
    }

}


// req, res
routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)


module.exports = routes; // está exportando routes para podermos reutiliza-lo na aplicação principal