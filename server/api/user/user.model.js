'use strict';

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  sex: String
}, {
  timestamps: {}
});

module.exports = mongoose.model('User', UserSchema);
