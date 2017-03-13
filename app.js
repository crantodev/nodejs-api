const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/db');

app.use(bodyParser.json());
app.use(expressValidator());

const UserController = require('./controllers/UsersController');
app.use('/users', UserController);

module.exports = app;