const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

secretKey = "abc123";

const protect = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers
  console.log(authorization)

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]
  console.log(token)

  // it doesnt find the correct ID so its says invalid token
  try {
    const { _Id } = jwt.verify(token, secretKey);
    req.user = await User.findOne({ _Id }).select('_Id');
  
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
}

module.exports = { protect }