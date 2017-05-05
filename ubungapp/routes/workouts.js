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

  let newWorkout = new Workout({
    title: req.body.title,
    description: req.body.description,
    user: mongoose.Types.ObjectId(req.user._id),
    cardioname: req.body.cardioname,
    duration: req.body.duration,
    liftingname: req.body.liftingname,
    sets: req.body.sets,
    reps: req.body.reps,
    created_by: req.user.name,
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
  console.log(workout);
  Workout.find({title: {"$regex": req.params.title, "$options": "i"}}, function(err, workout){
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
