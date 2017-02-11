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
  },
  senderdeleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  receiverdeleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

var Question = db.define('question', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  category: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})


var Response = db.define('response', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  likesCtr: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

var Like = db.define('like');

// Relations
// Coord has a userId
Coord.belongsTo(User);
// Every message has a sender and a receiver
Message.belongsTo(User, {as: 'sender'});
Message.belongsTo(User, {as: 'receiver'});

// Every like has a liker and a likedresponse
Like.belongsTo(User, {as: 'liker'});
Like.belongsTo(Response, {as: 'likedresponse'})


// Every question has a asker
Question.belongsTo(User, {as: 'asker'});
// Every response has a responder
Response.belongsTo(User, {as: 'responder'});
// Every question has many responses
Question.hasMany(Response);

module.exports = db;
