const mongoose = require('mongoose');
const { database } = require('../config');
const chalk = require('chalk');

mongoose.set('strictQuery', true);
mongoose.connect(database, () => console.log(chalk.green('db connected')));