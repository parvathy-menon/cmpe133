const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Review = require('../models/review');
const mongoose = require('mongoose')

// Review Create
router.post('/create', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  let newReview = new Review({
    title: new String(req.body.title),
    body: new String(req.body.body),
    user: mongoose.Types.ObjectId(req.user._id),
    workout: mongoose.Types.ObjectId(req.body.workout._id),
    rating: req.body.rating
  });

 Review.addReview(newReview, (err, review) => {
    if(err) {
      res.json({success: false, msg:'Failed to create review ' + err});
    } else {
      res.json({success: true, msg:newReview});
    }
  });

});

//search review by title
router.get('/review/:title', (req,res) => {
  Workout.find({title: req.params.title}, function(err, review){
    if (err) console.log(err);
    console.log("Freaking done");
    res.json({success:true, msg: review});
  });
});

// delete review by id
router.delete('/delete/:_id', passport.authenticate('jwt', {session:false}), function(req, res, next){
  Review.findOneAndRemove({_id: req.params._id}, function(err,review) {
    if (err) console.log(err);
    res.json({success:true, msg: review});
  });
});


module.exports = router;
