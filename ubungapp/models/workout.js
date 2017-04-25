const mongoose = require('mongoose');
const config = require('../config/database');

const WorkoutSchema = mongoose.Schema({
  title: {
    type: String,
  },

  body: {
    type: String,
  },

// user who created workout
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  created_by: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },

  cardioname: String,
  duration: String,

  liftingname: String,
  sets: Number,
  reps: Number,

  updated_at: String
});

const Workout = module.exports = mongoose.model('Workout', WorkoutSchema);

module.exports.addWorkout = function(newWorkout, callback) {
  newWorkout.save(callback)
}

module.exports.getWorkoutById = function(id, callback){
  Workout.findById(id, callback);
}
