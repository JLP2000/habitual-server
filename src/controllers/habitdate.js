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

async function showHabitDates(req, res) {
    try {
        const habitdate = await HabitDate.findByHabitId(req.params.id);
        // const habits = await HabitDate.habits;
        res.status(200).json({habitdate});
    } catch (err) {
        res.status(500).send(err);
    };
}

async function update(req, res) {
    try {
        const habitdate = await HabitDate.update(req.params.id, req.body);
        res.status(200).json(habitdate)
    } catch (err) {
        res.status(404).send(err)
    }
}


module.exports = { index, show, showHabitDates, update }
