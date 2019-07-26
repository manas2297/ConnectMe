const Sequelize = require('sequelize');
const config = require('config');

const dbName = config.get('dbName');
const dbUser = config.get('dbUser');
const dbPass = config.get('dbPass');

const sequelize =  new Sequelize(
            dbName,
            dbUser,
            dbPass,
            {
                host:'localhost',
                dialect: 'postgres'
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
        console.log('Server connected');
        
  



const Op = Sequelize.Op;
module.exports = {
    sequelize,
    Op
}