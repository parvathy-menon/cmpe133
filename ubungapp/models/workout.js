const mongoose = require('mongoose');
const config = require('../config/database');

const WorkoutSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  body: {
    type: String,
    required: true
  },

// user who created workout
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: String,
  updated_at: String
});

const Workout = module.exports = mongoose.model('Workout', WorkoutSchema);

module.exports.addWorkout = function(newWorkout, callback) {
  newWorkout.save(callback)
}
