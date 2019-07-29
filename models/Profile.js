const Sequelize = require('sequelize');
const sequelize = require('../config/db').sequelize;
const Op = require('../config/db').Op;
const User = require('./User'); 

const Profile = sequelize.define(
  'profile',
  {
    profiles_id : {
      type: Sequelize.UUIDV4,
      primaryKey: true
    },
    mobile_no : {
      type: Sequelize.BIGINT,
      allowNull: true
    },
    dob: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    company: {
      type: Sequelize.STRING,
      allowNull: true
    },
    website: {
      type: Sequelize.STRING,
      allowNull: true
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    },
    skills: {
      type: Sequelize.STRING,
      allowNull: false
    },
    bio:{
      type: Sequelize.STRING(500),
      allowNull: true
    },
    githubusername: {
      type: Sequelize.STRING(100),
      allowNull:true
    },
    youtube: {
      type: Sequelize.STRING(100),
      allowNull:true
    },
    linkedin: {
      type: Sequelize.STRING(100),
      allowNull:true
    },
    instagram: {
      type: Sequelize.STRING(100),
      allowNull:true
    },
    facebook: {
      type: Sequelize.STRING(100),
      allowNull:true
    }
  },{
    timestamps: false
  }
);
Profile.belongsTo(User);

module.exports = Profile;