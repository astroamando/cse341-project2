const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Aerospace API',
    description: 'CSE 341 Project 2 API for aircraft and space missions'
  },
  host: 'cse341-project2-pdui.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';

const endpointsFiles = [
  './routes/aircraft.js',
  './routes/missions.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc);