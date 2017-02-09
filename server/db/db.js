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
      allowNull: true,
      unique: true
    },
    name: {
    	type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
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
    description: {
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

var Message = db.define('message', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

// Relations
// Coord has a userId
Coord.belongsTo(User);
// Every message has a sender and a receiver
Message.belongsTo(User, {as: 'sender'});
Message.belongsTo(User, {as: 'receiver'});

module.exports = db;
