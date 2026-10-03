const express = require('express');
const router = express.Router();

const missionsController = require('../controllers/missions');

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({
    message: 'Authentication required'
  });
};

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

router.post('/', isAuthenticated, missionsController.createMission);
/*
  #swagger.tags = ['Missions']
  #swagger.description = 'Create a new mission - authentication required'
  #swagger.responses[401] = {
    description: 'Authentication required'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: { $ref: '#/definitions/Mission' }
  }
*/

router.put('/:id', isAuthenticated, missionsController.updateMission);
/*
  #swagger.tags = ['Missions']
  #swagger.description = 'Update a mission - authentication required'
  #swagger.responses[401] = {
    description: 'Authentication required'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    schema: { $ref: '#/definitions/Mission' }
  }
*/

router.delete('/:id', isAuthenticated, missionsController.deleteMission);
/*
  #swagger.tags = ['Missions']
  #swagger.description = 'Delete a mission - authentication required'
  #swagger.responses[401] = {
    description: 'Authentication required'
  }
*/

module.exports = router;