'use strict';

const Model = require('../mongo.js');
const schema = require('./todo-schema.js');

/**
 * Class representing a To Do Item.
 * @extends Model
 */
class Todo extends Model {}

module.exports = new Todo(schema);

