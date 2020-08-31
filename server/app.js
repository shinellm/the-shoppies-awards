const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 8080;

// api routes
const indexRouter = require('./api/index');

const app = express();


const createApp = () => {
  // logging middleware
  app.use(morgan('dev'));

  //cookie parser middleware
  app.use(cookieParser());

  // Cross-Origin requests allowed
  app.use(cors());

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // serve static files
  app.use(express.static(path.join(__dirname, '../client/build')));

  // auth and api routes
  app.use('/api', indexRouter);

  // if express doesn't recognize the route, the React app will handle the routing
  app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });

  // catch 404 and perform error handling
  app.use((req, res, next) => {
    next(createError(404, 'Not found.'));
  });

  // error handler
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });

  module.exports = app;
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () => console.log(`Node ${isDev ? 'dev server' : 'production server'}: Mixing it up on port ${PORT}`));
}

async function bootApp() {
  createApp();
  startListening();
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp();
} else {
  createApp();
}
