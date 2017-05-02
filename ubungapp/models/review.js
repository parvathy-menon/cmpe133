const mongoose = require('mongoose');
const config = require('../config/database');

//Review Schema
const ReviewSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  body: {
    type: String,
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  workout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout'
  },

  rating: {
    type: Number,
  },

  created_by: {
    type: String,
  },

  created_at: {
    type: Date,
    default: Date.now()
  }



});

const Review = module.exports = mongoose.model('Review', ReviewSchema);

module.exports.addReview = function(newReview, callback){
  newReview.save(callback)
}
