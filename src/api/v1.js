'use strict';

/**
 * API Router Module (V1)
 * Integrates with various models through a common Interface (.get(), .post(), .put(), .delete())
 * @module src/api/v1
 */

const cwd = process.cwd();

const express = require('express');

const auth = require(`${cwd}/src/auth/middleware.js`);
const modelFinder = require(`${cwd}/src/middleware/model-finder.js`);

const router = express.Router();

// Evaluate the model, dynamically
router.param('model', modelFinder.load);



// API Routes
/**
 * Get a list of records for a given model
 * Model must be a proper model, located within the ../models folder
 * @route GET /api/v1/{model}
 * @param {model} model.path - Model Name
 * @security basicAuth
 * @returns {object} 200 { count: 2, results: [ {}, {} ] }
 * @returns {Error}  500 - Server error
 */
router.get('/api/v1/:model', auth('read'), handleGetAll);

/**
 * @route POST /api/v1/:model
 * Model must be a proper model, located within the ../models folder
 * @param {model} model.path.required
 * @returns {object} 200 - Count of results with an array of results
 * @returns {Error}  500 - Unexpected error
 */
router.post('/api/v1/:model', auth('create'), handlePost);

router.get('/api/v1/:model/:id', auth('read'), handleGetOne);
router.put('/api/v1/:model/:id', auth('update'), handlePut);
router.delete('/api/v1/:model/:id', auth('delete'), handleDelete);

// Models List
router.get('/api/v1/models', (request, response) => {
  modelFinder.list()
    .then(models => response.status(200).json(models));
});

// JSON Schema
router.get('/api/v1/:model/schema', (request, response) => {
  response.status(200).json(request.model.jsonSchema());
});

// Route Handlers
function handleGetAll(request,response,next) {
  request.model.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

function handleGetOne(request,response,next) {
  request.model.get(request.params.id)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}

function handlePost(request,response,next) {
  request.model.post(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function handlePut(request,response,next) {
  request.model.put(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function handleDelete(request,response,next) {
  request.model.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

module.exports = router;
