const express = require('express');
const router = express.Router();
const habitDateController = require('../controllers/habitdate')

router.get('/', habitDateController.index);
router.get('/:id', habitDateController.show);
router.get('/habits/:id', habitDateController.showHabitDates);
router.put('/:id', habitDateController.update);

module.exports = router;
