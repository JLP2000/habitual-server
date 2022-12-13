const db = require("../db/init")
const dayjs = require("dayjs")
const HabitDate = require("./HabitDate")

class Habit {
	constructor(data) {
		this.habit_id = data.habit_id
		this.name = data.name
		this.start_date = data.start_date
		this.interval_in_days = data.interval_in_days
		this.interval_in_months = data.interval_in_months
		this.end_date = data.end_date
		this.note = data.note
		this.colour = data.colour
	}

	static async all(userId) {
		return new Promise(async (resolve, reject) => {
			console.log(userId)
			try {
				let response = await db.query(
					"SELECT habits.*, habitdates.* FROM habits INNER JOIN habitdates ON habits.habit_id = habitdates.habit_id WHERE habits.user_id = $1;",
					[userId]
				)
				let habits = response.rows
				resolve(habits)
			} catch (err) {
				reject("Habit not found")
			}
		})
	}

	static async findById(id) {
		return new Promise(async (resolve, reject) => {
			try {
				let habitData = await db.query(
					"SELECT * FROM habits WHERE habit_id = $1;",
					[id]
				)
				// console.log(habitData);
				let habit = new Habit(habitData.rows[0])
				resolve(habit)
			} catch (err) {
				reject("Habit not found")
				console.log(err)
			}
		})
	}

	static async create(habitData) {
		return new Promise(async (resolve, reject) => {
			try {
				// console.log(habitData)
				const {
					name,
					start_date,
					interval_in_days,
					interval_in_months,
					end_date,
					note,
					colour,
					user_id,
				} = habitData
				const result = await db.query(
					"INSERT INTO habits (name, start_date, interval_in_days, interval_in_months, end_date, note, colour, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
					[
						name,
						start_date,
						interval_in_days,
						interval_in_months,
						end_date,
						note,
						colour,
						user_id,
					]
				)
				// console.log(result);
				let newHabit = new Habit(result.rows[0])
				newHabit.createDates()
				resolve(newHabit)
			} catch (err) {
				reject("Could not create habit")
				console.log(err)
			}
		})
	}

	async destroy() {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await db.query(
					"DELETE FROM habits WHERE habit_id = $1;",
					[this.habit_id]
				)
				resolve("Habit was destroyed")
			} catch (err) {
				reject("Could not destroy habit")
				// console.log(err)
			}
		})
	}

	static async update(id, habitData) {
		return new Promise(async (resolve, reject) => {
			try {
				const { name, note, colour } = habitData
				const result = await db.query(
					"UPDATE habits SET name = $1, note = $2, colour = $3 WHERE habit_id = $4 RETURNING *;",
					[name, note, colour, id]
				)
				resolve(result.rows[0])
			} catch (err) {
				reject("Could not update habit")
				console.log(err)
			}
		})
	}

	async createDates() {
		return new Promise(async (resolve, reject) => {
			try {
				let date = dayjs(this.start_date)
				await HabitDate.create(this.habit_id, date)
				if (this.interval_in_months == 0 || this.interval_in_months == null) {
					while (date.diff(dayjs(this.end_date), "day") != 0) {
						date = dayjs(date).add(this.interval_in_days, "day")
						let result = await HabitDate.create(this.habit_id, date)
					}
				} else if (
					this.interval_in_days == 0 ||
					this.interval_in_days == null
				) {
					while (date.diff(dayjs(this.end_date), "month") != 0) {
						date = dayjs(date).add(this.interval_in_months, "month")
						let result1 = await HabitDate.create(this.habit_id, date)
					}
				}
				resolve("Dates added")
			} catch (err) {
				reject("Could not add dates")
				console.log(err)
			}
		})
	}
}

module.exports = Habit
