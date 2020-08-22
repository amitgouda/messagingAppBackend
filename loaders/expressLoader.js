const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const controllers = require('../controllers');
const {sendMail} = require('../utils/mail')
const expressLoader = async (app) => {
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });
  app.enable('trust proxy');

  app.use(cors());
  //app.use(require('morgan')('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json());

  // ...More middlewares
  app.use(morgan('dev'));
  app.use('/api', controllers);
  
  // Return the express app
  return app;
};

module.exports = expressLoader;
