'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const products = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  price: { type: Number, required: true },
  inStock: { type: Number, required: true },
});

module.exports = mongoose.model('products', products);
