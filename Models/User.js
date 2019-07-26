const Sequelize = require('sequelize');
const sequelize = require('../config/db').sequelize;
const Op = require('../config/db').Op;

const User  = sequelize.define(
    'users',
    {   
        userid:{
            type: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },{
        timestamps: false
});

module.exports = User;