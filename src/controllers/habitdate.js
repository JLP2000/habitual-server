const HabitDate = require('../models/HabitDate')

async function index(req, res) {
    try {
        const habitdates = await HabitDate.all;
        res.status(200).json(habitdates);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function show(req, res) {
    try {
        const habitdate = await HabitDate.findById(req.params.id);
        const habits = await HabitDate.habits;
        res.status(200).json({ ...habitdate, habits });
    } catch (err) {
        res.status(500).send(err);
    };
}

module.exports = { index, show }
