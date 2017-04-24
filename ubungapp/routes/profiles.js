const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Profile = require('../models/profile');
const mongoose = require('mongoose')

// edit profile
router.post('/create', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  let newProfile = new Profile({
    user: mongoose.Types.ObjectId(req.user._id),
    height: req.body.height, //string
    weight: req.body.weight, //number
    bio: req.body.bio
  });

 Profile.addProfile(newProfile, (err, profile) => {
    if(err) {
      res.json({success: false, msg:'Failed to edit profile ' + err});
    } else {
      res.json({success: true, msg:newProfile});
    }
  });

});

//display profile by user_id
router.get('/:user_id', (req,res) => {
  Profile.find({user: req.params.user_id}, function(err, profile){
    if (err) console.log(err);
    res.json({success:true, msg: profile});
  });
});


module.exports = router;
