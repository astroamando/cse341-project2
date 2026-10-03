const express = require('express');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const session = require('express-session');
const passport = require('./auth');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'aerospace-api-secret',
    resave: false,
    saveUninitialized: false
  })
);

// Passport authentication
app.use(passport.initialize());
app.use(passport.session());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/aircraft', require('./routes/aircraft'));
app.use('/missions', require('./routes/missions'));
app.use('/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.send('Aerospace API is running!');
});

mongodb.initDb((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});