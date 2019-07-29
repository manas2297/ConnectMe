const Sequelize = require('sequelize');
const sequelize = require('../config/db').sequelize;
const Op = require('../config/db').Op;

const Profile = require('../models/Profile');

const Education = sequelize.define(
    'education',
    {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        school: {
            type: Sequelize.STRING,
            allowNull: false
        },
        degree:{
            type: Sequelize.STRING,
            allowNull: false
        },
        fieldofstudy: {
            type: Sequelize.STRING,
            allowNull: false
        },
        from: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        to: {
            type: Sequelize.DATEONLY,
            allowNull: true
        },
        current: {
            type: Sequelize.BOOLEAN,
            allowNull:true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        }
    },{
        timestamps: false
    }
);
// Education.belongsTo(Profile);

module.exports = Education;