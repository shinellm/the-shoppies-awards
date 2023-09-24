const { Sequelize } = require('sequelize');
const pkg = require('../../package.json');
const chalk = require('chalk');

console.log(chalk.yellow('Opening database connection'));
console.log('Opening database connection');

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const database = new Sequelize(
    process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
    {
      logging: (...msg) => console.log(msg),
      dialectOptions: {
        ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
      }
    }
  )
module.exports = database;