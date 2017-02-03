'use strict';

var Sequelize = require('sequelize');
var databaseURI = require('./../env/index.js').databaseURI;


var db = new Sequelize(databaseURI, {
  define: {
    timestamps: true,
    underscored: true
  }
});

var User = db.define('user', {
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
  password: {
    type: Sequelize.STRING,
    allowNull: true
  },
  src: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  bgUrl: {
    type: Sequelize.TEXT,
    allowNull: true
  }
});

var Coord = db.define('coord', {
  lat: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }, 
  lng: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
})

// Coord has a userId
Coord.belongsTo(User);


module.exports = db;
