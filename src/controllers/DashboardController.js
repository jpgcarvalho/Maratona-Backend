module.exports = {
	index(req, res) {
		const jobs = Job.get()
		const profile = Profile.get()

		const updatedJobs = jobs.map((job) => {
			//ajustes no job
			const remaining = JobUtils.remainingDays(job)
			const status = remaining <= 0 ? 'done' : 'progress'

			return {
				...job,
				remaining,
				status,
				budget: JobUtils.calculateBudget(job, profile["value-hour"])
			}
		})

		return res.render("index", { jobs: updatedJobs })
	}
}

