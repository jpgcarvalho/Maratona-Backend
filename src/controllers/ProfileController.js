const Profile = require('../model/Profile')


module.exports = {
    index(req, res) {
        return res.render("profile", { profile: Profile.get()})
    },
    update(req, res) {
        // req.body para pegar os dados
        const data = req.body

        // definir quantas semanas tem num ano: 52 semanas
        const weeksPerYear = 52

        // remover as semanas de férias do ano, para pegar quantas semanas tem 1 mes
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12

        // total de horas trabalhadas na semana 
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

        // horas trabalhadas no mes
        const monthlyTotalHours = weekTotalHours * weeksPerMonth

        // qual sera o valor da minha hora
        const valueHour = data["value-hour"] = data["monthly-budget"] / monthlyTotalHours

        Profile.update({
            ...Profile.get(),
            ...req.body,
            "value-hour": valueHour
        })

        return res.redirect('/profile')
    },
}