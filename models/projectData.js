'use strict';
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const Projectschema = new Schema ({
  project: {type: String, default: '', required: true},
  date: {type: Date},
  deliverable: {type: String, default: '', required: true},
  details: {type: String, default: '', required: true},
  updated: { type: Date, default: Date.now }
});


var Projectinput = mongoose.model('Project', Projectschema);

module.exports = {Projectinput};
