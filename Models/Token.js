const Sequelize = require('sequelize');
const sequelize = require('../config/db').sequelize;
const User = require('./User');

const Token = sequelize.define(
    'tokens',
    {
        userid: {
            type: Sequelize.UUIDV4,
            allowNull:false,
            references: {
                model: User,
                key: 'userid'
            }
        },
        token: {
            type: Sequelize.STRING,
            allowNull: false
        },

    },{
        timestamps: false
    }
);

module.exports = Token;