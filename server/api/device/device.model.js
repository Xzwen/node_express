'use strict';

let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate')

let DeviceSchema = new mongoose.Schema({
  name: String,
  type: String,
  num: Number,
  content: String
}, {
  timestamps: true
})

DeviceSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Device', DeviceSchema);
