const mongoose = require('mongoose');
const config = require('../config/database');

const ProfileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  height: {
    type: String
  },

  weight: {
    type: Number
  },

  bio: {
    type: String
  }

});

const Profile = module.exports = mongoose.model('Profile', ProfileSchema);

module.exports.addProfile = function(newProfile, callback){
  newProfile.save(callback)
}
