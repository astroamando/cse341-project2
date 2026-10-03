const express = require('express');
const router = express.Router();

const aircraftController = require('../controllers/aircraft');

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({
    message: 'Authentication required'
  });
};

router.get('/', aircraftController.getAll);
/*
  #swagger.tags = ['Aircraft']
  #swagger.description = 'Get all aircraft'
*/

router.get('/:id', aircraftController.getSingle);
/*
  #swagger.tags = ['Aircraft']
  #swagger.description = 'Get one aircraft by ID'
*/

router.post('/', isAuthenticated, aircraftController.createAircraft);
/*
  #swagger.tags = ['Aircraft']
  #swagger.description = 'Create a new aircraft - authentication required'
  #swagger.responses[401] = {
    description: 'Authentication required'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: { $ref: '#/definitions/Aircraft' }
  }
*/

router.put('/:id', isAuthenticated, aircraftController.updateAircraft);
/*
  #swagger.tags = ['Aircraft']
  #swagger.description = 'Update an aircraft - authentication required'
  #swagger.responses[401] = {
    description: 'Authentication required'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: { $ref: '#/definitions/Aircraft' }
  }
*/

router.delete('/:id', isAuthenticated, aircraftController.deleteAircraft);
/*
  #swagger.tags = ['Aircraft']
  #swagger.description = 'Delete an aircraft - authentication required'
  #swagger.responses[401] = {
    description: 'Authentication required'
  }
*/

module.exports = router;