const express = require('express');
const habitsRouter = express.Router();
const habitsController = require('../controllers/habits')
const authenticator = require('../middleware/auth')

habitsRouter.get('/', habitsController.index)
habitsRouter.get('/:id', habitsController.show)
habitsRouter.get('/new', habitsController.neww)
habitsRouter.get('/:id/edit', habitsController.edit)
habitsRouter.post('/', habitsController.create)
habitsRouter.put('/:id', habitsController.update)
habitsRouter.delete('/:id', habitsController.destroy)

module.exports = habitsRouter

