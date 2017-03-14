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
    rating: req.body.rating
  });

 Review.addReview(newReview, (err, review) => {
    if(err) {
      res.json({success: false, msg:'Failed to create review ' + err});
    } else {
      res.json({success: true, msg:'Review created'});
    }
  });

});

module.exports = router;