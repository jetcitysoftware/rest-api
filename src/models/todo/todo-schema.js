'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const todo = mongoose.Schema({
  text: { type:String, required:true },
  assignee: { type:String, required:true },
  due: { type:Date, required:true },
  difficulty: {type:Number, required:true},
});

module.exports = mongoose.model('todo', todo);
