'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64'); 
const User = require('./model.js'); 

module.exports = async(req, res, next) => {
  let basicHeaderParts = req.headers.authorization.split(' '); 
  let encodedString = basicHeaderParts.pop();  
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':'); 

  console.log(username, password);
  try {
    const user = await User.findOne({ username: username })
    const valid = await bcrypt.compare(password, user.password);
    console.log('user:', user, 'valid', valid);
    if (valid) {
      req.user = user;
      next();
    }
    else {
      throw new Error('Invalid User')
    }
  } catch (error) { next("Invalid Login"); }
}