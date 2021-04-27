'use strict';

const express = require('express');
const cors = require('cors');

const authRoutes = require('./auth/routes.js');

const notFound = require('./error-handlers/404.js');
const errors = require('./error-handlers/500.js');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);

app.use('*', notFound);
app.use(errors);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, console.log(`Server is up and running on port: ${port}`));
  },
};
