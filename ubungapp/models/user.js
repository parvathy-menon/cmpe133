const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const Workout = require('../models/workout');


//User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  height: {
    type: String,
    required: false
  },
  weight: {
    type: String,
    required: false
  },
  bio: {
    type: String,
    required: false
  },
  img: {
    type: String,
    required: false
  },
  workouts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout'
  }],
  sunday: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout'
  }],
  monday: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout'
  }],

  tuesday: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout'
  }],
  wednesday: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout'
  }],
  thursday: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout'
  }],
  friday: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout'
  }],
  saturday: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout'
  }]

});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    })
  });
}

module.exports.updateProfile = function(req, res) {
        console.log(req.user);
        Profile.user = req.user;
        Profile.user.username = req.body.username || Profile.user.username;
        Profile.user.password = req.body.password || Profile.user.password;
        Profile.user.height = req.body.height || Profile.user.height;
        Profile.user.weight = req.body.weight || Profile.user.weight;
        Profile.user.bio = req.body.bio || Profile.user.bio;

        // Save the updated document back to the database
        Profile.save();
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
