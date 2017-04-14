const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Workout = require('../models/workout');
const mongoose = require('mongoose');



// Workout Create
router.post('/create', passport.authenticate('jwt', {session:false}),(req, res, next) => {
  console.log("*******" + req.user._id)
  let newWorkout = new Workout({
    title: req.body.title,
    body: req.body.body,
    user: mongoose.Types.ObjectId(req.user._id),
    cardioExercises: req.body.cardioExercises,
    liftingExercises: req.body.liftingExercises,
    created_at: new Date().toString()
  });

  Workout.addWorkout(newWorkout, (err, workout) => {
    if(err) {
      res.json({success: false, msg:'Failed to create workout'});
      console.log(err);
    } else {
      res.json({success: true, msg:newWorkout});
    }
  });
});

//search workout by title
router.get('/workout/:title', (req,res) => {
  Workout.find({title: req.params.title}, function(err, workout){
    if (err) console.log(err);
    res.json({success:true, msg: workout});
  });
});


// display all workout
router.get('/all', (req, res, next) => {
  Workout.find({}, function(err, workout){
    if (err) return console.log(err);
    res.json({success:true, msg: workout});
  });
});

// delete workout
router.delete('/delete/:_id', passport.authenticate('jwt', {session:false}), function(req, res, next){
  Workout.findOneAndRemove({_id: req.params._id}, function(err,workout) {
    if (err) console.log(err);
    res.json({success:true, msg: workout});
  });
});

module.exports = router;
