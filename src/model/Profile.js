let data = {
	name: "João Pedro",
	avatar: "https://avatars.githubusercontent.com/u/56309566?v=4",
	"monthly-budget": 300,
	"days-per-week": 5,
	"hours-per-day": 5,
	"vacation-per-year": 4,
	"value-hour": 75
}

module.exports = {
	get() {
		return data
	},
	update(newData) {
		data = newData
	}
}