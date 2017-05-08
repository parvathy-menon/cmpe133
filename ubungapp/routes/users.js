const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const mongoose = require('mongoose')
const Workout = require('../models/workout');

// User Register
router.post('/register', (req, res, next) => {
	let newUser = new User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
		height: "",
		weight: "",
		bio: "",
		img: "https://img.clipartfox.com/60b365c0b69ce6f142a418820e0390fe_big-image-png-clipart-of-facebook-profile-picture_2400-2400.png",
		workouts: [],
		sunday: [],
		monday: [],
		tuesday: [],
		wednesday: [],
		thursday: [],
		friday: [],
		saturday: [],

	});

	User.addUser(newUser, (err, user) => {
		if (err) {
			res.json({
				success: false,
				msg: 'Failed to register user'
			});
		} else {
			res.json({
				success: true,
				msg: 'User registered'
			});
		}
	});
});

//User Authenticate
router.post('/authenticate', (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	User.getUserByUsername(username, (err, user) => {
		if (err) throw err;
		if (!user) {
			return res.json({
				success: false,
				msg: 'User not found'
			});
		}

		User.comparePassword(password, user.password, (err, isMatch) => {
			if (err) throw err;
			if (isMatch) {
				const token = jwt.sign(user, config.secret, {
					expiresIn: 604800 // 1 week
				});

				res.json({
					success: true,
					token: 'JWT ' + token,
					user: {
						id: user._id,
						name: user.name,
						username: user.username,
						email: user.email
					}
				});
			} else {
				return res.json({
					success: false,
					msg: 'Wrong Password'
				});
			}
		});
	});
});

// User Profile
router.get('/profile', passport.authenticate('jwt', {
	session: false
}), (req, res, next) => {
	res.json({
		user: req.user
	});
});

router.patch('/update', passport.authenticate('jwt', {
	session: false
}), (req, res, next) => {
	userId = req.user._id;
	profile = req.body;

	User.getUserById(userId, (err, user) => {
		if(profile.nBio){
			user.bio = profile.nBio;
		}
		if(profile.nEmail){
			user.email = profile.nEmail;
		}
		if(profile.nHeight){
			user.height = profile.nHeight;
		}
		if(profile.nWeight){
			user.weight = profile.nWeight;
		}
		if(profile.nUsername){
			user.username = profile.nUsername;
		}
		//user.username = req.body.username || profile.username;
		//user.password = req.body.password || profile.nPassword;
		//user.height = req.body.height || profile.nHeight;
		//user.weight = req.body.weight || profile.nWeight;
		//user.bio = req.body.bio || profile.nBio;

		user.save((err, updatedUser) => {
			console.log(updatedUser);
			if(err) return err;
			res.json({success: true, user: {updatedUser}});
		})
	})

});

// router.get('/workouts', passport.authenticate('jwt', {
// 	session: false
// }), (req, res, next) => {
// 	userId = req.user._id;

// 	User.getUserById(userId, (err, user) => {
// 		if(err) return err;
// 		workouts = user.workouts;
// 	})
// 	res.json({
// 		user: req.user
// 	});
// });

// Add a new workout to a User
router.patch('/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
	userId = req.user._id;

	User.getUserById(userId, (err, user) => {
		if (user.workouts.indexOf(req.body._id) === -1) {
			user.workouts.push(req.body._id);
			user.save((err, updatedUser) => {
				if (err) return err;
				res.json({success: true, user: {workouts: user.workouts}});
			});
		} else {
			res.json({success: false, msg: 'User already has this workout'});
		}
	});
});

//Add a workout to a user's schedule
router.patch('/workouts/days', passport.authenticate('jwt', {
	session: false
}), (req, res, next) => {
	userId = req.user._id;
	workout = req.body.workout;
	days = req.body.days;

	User.getUserById(userId, (err, user) => {
		for(let day of days) {
			console.log(user[day]);
			if(user[day].indexOf() === -1) {
				user[day].push(workout._id);
			}
		}

		user.save((err, updatedUser) => {
			if(err) return err;
			res.json({success: true, user: {updatedUser}});
		})
	})

});

//Get a user's workouts
router.get('/workouts', passport.authenticate('jwt', {
	session: false
}), (req, res, next) => {

	Workout.find({
		'_id': {
			$in: req.user.workouts
		}
	}, function (err, workouts) {
		if(err) return err;
		res.json({
			success: true,
			workouts: workouts
		})
	});
});

//Get a users workouts for a particular day
router.get('/workouts/:day', passport.authenticate('jwt', {
	session: false
}), (req, res, next) => {
	day = req.params.day;
	Workout.find({
		'_id': {
			$in: req.user[day]
		}
	}, (err, workouts) => {
		if(err) return err;
		res.json({
			success: true,
			workouts: workouts
		})
	});
});

module.exports = router;
