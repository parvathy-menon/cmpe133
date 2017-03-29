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

  createdAt: {
    type: Date,
    default: Date.now()
  },

  cardioExercises: [{
    name: String,
    duration: Number
  }],

  LiftingExercises: [{
    name: String,
    sets: Number,
    reps: Number
  }],
  
  updated_at: String
});

const Workout = module.exports = mongoose.model('Workout', WorkoutSchema);

module.exports.addWorkout = function(newWorkout, callback) {
  newWorkout.save(callback)
}

module.exports.getWorkoutById = function(id, callback){
  Workout.findById(id, callback);
}
