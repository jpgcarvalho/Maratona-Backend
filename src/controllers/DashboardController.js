const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')


module.exports = {
	index(req, res) {
		const jobs = Job.get()
		const profile = Profile.get()

		let statusCount = {
			progress: 0,
			done: 0,
			total: jobs.length
		}

		const updatedJobs = jobs.map((job) => {
			//ajustes no job
			const remaining = JobUtils.remainingDays(job)
			const status = remaining <= 0 ? 'done' : 'progress'

			// Estou somando 1 dependendo do valor que a constante status recebe. Se for 'done' soma 1 na minha propriedade done do statusCount assim como se for 'progress'.
			statusCount[status] += 1


			return {
				...job,
				remaining,
				status,
				budget: JobUtils.calculateBudget(job, profile["value-hour"])
			}
		})

		return res.render("index", { jobs: updatedJobs, profile, statusCount })
	}
}

