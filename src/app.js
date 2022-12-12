const express = require('express');
const cors = require('cors');
const server = express();

const userRouter = require('./routers/users')
const habitsRouter = require('./routers/habits')
const habitsDateRouter = require('./routers/habitdate')

server.use(cors());
server.use(express.json())

server.use('/users', userRouter);
server.use('/habits', habitsRouter);
server.use('/habitdates', habitsDateRouter);

server.get('/', (req, res) => res.send('Welcome to the Habits API'))

module.exports = server;
