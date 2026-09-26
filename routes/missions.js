const express = require('express');
const router = express.Router();

const missionsController = require('../controllers/missions');

router.get('/', missionsController.getAll);
/*
  #swagger.tags = ['Missions']
  #swagger.description = 'Get all missions'
*/

router.get('/:id', missionsController.getSingle);
/*
  #swagger.tags = ['Missions']
  #swagger.description = 'Get one mission by ID'
*/

router.post('/', missionsController.createMission);
/*
  #swagger.tags = ['Missions']
  #swagger.description = 'Create a new mission'
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: { $ref: '#/definitions/Mission' }
  }
*/

router.put('/:id', missionsController.updateMission);
/*
  #swagger.tags = ['Missions']
  #swagger.description = 'Update a mission'
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: { $ref: '#/definitions/Mission' }
  }
*/

router.delete('/:id', missionsController.deleteMission);
/*
  #swagger.tags = ['Missions']
  #swagger.description = 'Delete a mission'
*/

module.exports = router;