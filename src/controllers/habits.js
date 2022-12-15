const Habit = require("../models/Habit")
const User = require("../models/User")
const Session = require("../models/Session")

async function index(req, res) {
	try {
		const userToken = req.headers["authorization"]
		const sesh = await Session.findBySessionToken(userToken)
		const habits = await Habit.all(sesh.user_id)
		res.status(200).json(habits)
	} catch (err) {
		res.status(500).json(err)
	}
}

async function show(req, res) {
	try {
		const habit = await Habit.findById(req.params.id)
		res.status(200).json(habit)
	} catch (err) {
		res.status(404).json(err)
	}
}

async function create(req, res) {
	try {
		const userToken = req.headers["authorization"]
		const sesh = await Session.findBySessionToken(userToken)
		console.log("create - controllers: ", req.body)
		const newHabit = await Habit.create({ ...req.body, user_id: sesh.user_id })
		res.status(201).json(newHabit)
	} catch (err) {
		res.status(422).json(err)
	}
}

async function destroy(req, res) {
	try {
		const habit = await Habit.findById(req.params.id)
		const resp = await habit.destroy()
		res.status(204).end()
	} catch (err) {
		res.status(404).json(err);
		console.log(err)
	}
}

async function update(req, res) {
	try {
		const habit = await Habit.update(req.params.id, req.body)
		res.status(200).json(habit)
	} catch (err) {
		res.status(417).json(err)
	}
}


module.exports = { index, show, create, destroy, update}
