const express = require('express');
const router = express.Router();

const aircraftController = require('../controllers/aircraft');

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

router.post('/', aircraftController.createAircraft);
/*
  #swagger.tags = ['Aircraft']
  #swagger.description = 'Create a new aircraft'
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: { $ref: '#/definitions/Aircraft' }
  }
*/

router.put('/:id', aircraftController.updateAircraft);
/*
  #swagger.tags = ['Aircraft']
  #swagger.description = 'Update an aircraft'
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: { $ref: '#/definitions/Aircraft' }
  }
*/

router.delete('/:id', aircraftController.deleteAircraft);
/*
  #swagger.tags = ['Aircraft']
  #swagger.description = 'Delete an aircraft'
*/

module.exports = router;