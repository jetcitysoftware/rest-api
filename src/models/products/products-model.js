'use strict';

const Model = require('../mongo.js');
const schema = require('./products-schema.js');

/**
 * Class representing a Product.
 * @extends Model
 */
class Products extends Model { }

module.exports = new Products(schema);

