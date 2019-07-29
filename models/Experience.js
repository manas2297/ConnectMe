const Sequelize = require('sequelize');
const sequelize = require('../config/db').sequelize;
const Op = require('../config/db').Op;

const Profile = require('../models/Profile');

const Experience = sequelize.define(
    'experiences',
    {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull:false
        },
        company: {
            type:Sequelize.STRING,
            allowNull:false
        },
        location: {
            type:Sequelize.STRING,
            allowNull: true
        },
        from:{
            type: Sequelize.DATEONLY,
            allowNull:true
        },
        to:{
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        current: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        description:{
            type: Sequelize.STRING,
            allowNull: true
        }
    },{
        timestamps: false
    }
);

module.exports = Experience;