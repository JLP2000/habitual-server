const Habit = require('../models/Habit')

async function index(req, res){
    try{
        const habits = await Habit.all;
        res.status(200).json(habits);
    } catch(err){
        res.status(500).json(err);
    }
}

async function show(req, res){
    try{
        const habit = await Habit.findById(req.params.id);
        res.status(200).json(habit)
    } catch(err){
        res.status(404).json(err);
    }
}

async function create(req, res){
    try{
        const newHabit = await Habit.create(req.body)
        res.status(201).json(newHabit)
    } catch(err){
        res.status(422).json(err);
    }
}

async function destroy(req, res){
    try{
        const habit = await Habit.findById(req.params.id)
        const res = habit.destroy();
        res.status(204).end();
    } catch(err){
        res.send(404).json(err);
    }
}

async function update(req, res){
    try{
        const habit = await Habit.update(req.body)
    } catch(err){
        res.status(417).json(err);
    }
}

async function edit(req, res){
    res.status(501)
}

async function neww(req, res){
    res.status(501)
}


module.exports = {index, show, create, destroy, update, edit, neww}
