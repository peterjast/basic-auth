'use strict';

const express = require('express');
const bcrypt = require('bcrypt');

const basicAuth = require('./basicAuth.js')
const User = require('./model.js'); 

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = new User(req.body);
    const record = await user.save(req.body);
    res.status(201).json(record);
  } catch (e) { res.status(403).send("Error Creating User"); }
});

router.post('/signin', basicAuth, (req, res) => {
  const user = req.user;
  res.status(200).json(user);
});

module.exports = router;