'use strict';

let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate')

let MeetingSchema = new mongoose.Schema({
  theme: String,
  address: String,
  content: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'Users'}
}, {
  timestamps: true
})

let autoPopulate = function(next) {
  this.populate([{path: 'creator'}])
  next()
}

MeetingSchema
  .pre('find', autoPopulate)
  .pre('findById', autoPopulate)
  .pre('findOne', autoPopulate)

MeetingSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Meeting', MeetingSchema);
