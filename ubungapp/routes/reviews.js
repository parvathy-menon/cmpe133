const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Review = require('../models/review');

// Review Create
router.post('/create', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  let newReview = new Review({
    title: req.body.title,
    body: req.body.body,
    user: req.user._id,
    rating: req.body.rating
  });

 Review.addReview(newReview, (err, review) => {
    if(err) {
      res.json({success: false, msg:'Failed to create review'});
    } else {
      res.json({success: true, msg:'Review created'});
    }
  });

  //res.send(req.user._id);
});

module.exports = router;