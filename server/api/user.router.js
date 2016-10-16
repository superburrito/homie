var router = require('express').Router();
var db = require('./../db/db.js');
var User = db.model('user');

// Encryption dependencies
var bcrypt = require('bcrypt');
const saltRounds = 10;
router.post('/', function (req, res){
	// Hashing synchronously
	var salt = bcrypt.genSaltSync(saltRounds);
	var hash = bcrypt.hashSync(req.body.password, salt);

	User.create({
		name: req.body.name,
		email: req.body.email,
		salt: salt,
		password: hash,
		bgUrl: ''
	})
	.then(function (user) {
		return res.status(200).send({ 
			success: true, 
			message: "New account created!",
			user: user 
		});
	}, function () {
		return res.status(400).send({ 
			success: false, 
			message: "Unable to create new account."
		});
	})
})

// All routes below require authentication ===================
router.use(require('./../utils/verification.middleware.js'));
// ===========================================================


router.get('/', function (req, res) {
	User.findAll()
	.then(function (users) {
		return res.status(200).send({
			success: true,
			message: "Users sent to client!",
			users: users
		});
	})
})


module.exports = router;
