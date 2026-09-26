const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Aerospace API',
    description: 'CSE 341 Project 2 API for aircraft and space missions'
  },
  host: 'localhost:8080',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = [
  './routes/aircraft.js',
  './routes/missions.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc);