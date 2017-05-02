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
    workout: mongoose.Types.ObjectId(req.body.workoutId), //WORKOUT HERE IS JUST ID THRU POSTMAN - NEED TO FIX
    rating: req.body.rating,
    created_by: new String(req.user.name),
    created_at: new Date().toString()
  });

 Review.addReview(newReview, (err, review) => {
    if(err) {
      res.json({success: false, msg:'Failed to create review ' + err});
      console.log("review***:"+ newReview)

    } else {
      console.log("review***:"+ newReview)
      res.json({success: true, msg:newReview});
    }
  });

});

// //search review by title
// router.get('/review/:title', (req,res) => {
//   Review.find({title: req.params.title}, function(err, review){
//     if (err) console.log(err);
//     res.json({success:true, msg: review});
//   });
// });

//display reviews by workout_id
router.get('/:workout_id', (req,res) => {
  //workout: req.params.workout_id

  Review.find({workout: req.params.workout_id}, function(err, review){
    if (err) console.log(err);
    res.json({success:true, msg: review});
  });
});

// display all review
router.get('/review/all', (req, res, next) => {
  Review.find({}, function(err, review){
    if (err) return console.log(err);
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
