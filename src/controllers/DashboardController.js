const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')


module.exports = {
	async index(req, res) {
		const jobs = await Job.get()
		const profile = await Profile.get()

		let statusCount = {
			progress: 0,
			done: 0,
			total: jobs.length
		}

		// total de horas por dia de cada Job em progresso
		let jobTotalHours = 0

		const updatedJobs = jobs.map((job) => {
			//ajustes no job
			const remaining = JobUtils.remainingDays(job)
			const status = remaining <= 0 ? 'done' : 'progress'

			// Estou somando 1 dependendo do valor que a constante status recebe. Se for 'done' soma 1 na minha propriedade done do statusCount assim como se for 'progress'.
			statusCount[status] += 1

			// total de horas por dia de cada Job em progresso
			jobTotalHours = status === 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours


			return {
				...job,
				remaining,
				status,
				budget: JobUtils.calculateBudget(job, profile["value-hour"])
			}
		})

		// quantidade de horas que quero trabalhar MENOS a quantidade de horas de cada Job com status 'progress'
		const freeHours = profile['hours-per-day'] - jobTotalHours

		return res.render("index", { jobs: updatedJobs, profile, statusCount, freeHours })
	}
}

