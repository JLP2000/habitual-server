const db = require("../db/init")

const Habit = require("./Habit")

module.exports = class HabitDate {
	constructor(data, habit) {
		this.habitdate_id = data.habitdate_id
		this.date = data.date
		this.complete = data.complete
		this.on_time = data.on_time
		this.habit = { id: data.habit_id, path: `/habits/${data.habit_id}` }
	}

	static get all() {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await db.query("SELECT * FROM habitdates")
				const habitdates = response.rows.map((hd) => new HabitDate(hd))
				resolve(habitdates)
			} catch (err) {
				reject("Habit Dates not found")
			}
		})
	}

	static findById(id) {
		return new Promise(async (resolve, reject) => {
			try {
				let habitData = await db.query(
					`SELECT * FROM habitdates WHERE habitdate_id = $1`,
					[id]
				)
				let target = new HabitDate(habitData.rows[0])
				resolve(target)
			} catch (err) {
				reject("Habit date not found")
			}
		})
	}

	static create(id, date) {
		return new Promise(async (resolve, reject) => {
			try {
				// console.log("Hello")
				let habitData = await db.query(
					`INSERT INTO habitdates (date, habit_id) VALUES ($1, $2) RETURNING *`,
					[date, id]
				)
				let newHabitDate = new HabitDate(habitData.rows[0])
				// console.log(habitData.rows[0])
				resolve(newHabitDate)
			} catch (err) {
				reject("Habit Date could not be created")
			}
		})
	}

	static update(habitdate_id, data) {
		return new Promise (async (resolve, reject) => {
			try {
				const {complete, on_time} = data;
				let result = await db.query('UPDATE habitdates SET complete = $1, on_time = $2 WHERE habitdate_id = $3 RETURNING *;', [complete, on_time, habitdate_id]);
				resolve(result.rows[0]);
			} catch (err) {
				reject("Could not update habit date")
			}
		})
	}

}
