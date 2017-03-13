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
    ref: 'User',
   // required: true
  },
  rating: {
    type: Number,
    required: true
  }
});

const Review = module.exports = mongoose.model('Review', ReviewSchema);

module.exports.addReview = function(newReview, callback){
  newReview.save(callback)
}

