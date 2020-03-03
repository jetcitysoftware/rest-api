'use strict';

const Model = require('../mongo.js');
const schema = require('./categories-schema.js');

/**
 * Class representing a Category.
 * @extends Model
 */
class Category extends Model { }

module.exports = new Category(schema);

