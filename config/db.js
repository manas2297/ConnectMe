const Sequelize = require( 'sequelize' );
require('dotenv').config();
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const dialect = process.env.DB_DIALECT;

const sequelize = new Sequelize(
  dbName,
  dbUser,
  dbPass,
  {
    host: host,
    dialect: dialect,
  },
  {
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000
    }
  }
);
console.log( 'Server connected' );
const Op = Sequelize.Op;
module.exports = {
  sequelize,
  Op
}