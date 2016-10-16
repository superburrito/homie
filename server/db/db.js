'use strict';

var Sequelize = require('sequelize');
var databaseURI = require('../config.js').databaseURI;

var db = new Sequelize(databaseURI, {
  define: {
    timestamps: true,
    underscored: true
  }
});

db.define('user', {
  fbId: {
    type: Sequelize.STRING,
    allowNull: true
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
  salt: {
    type: Sequelize.STRING,
    allowNull: true
  },
  password: {
  	type: Sequelize.STRING,
    allowNull: true
  },
  bgUrl: {
    type: Sequelize.STRING,
    allowNull: true
  }
});



module.exports = db;
