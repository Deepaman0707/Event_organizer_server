const jwt = require('jsonwebtoken')
require('dotenv').config()

//this middleware will on continue on if the token is inside the local storage

module.exports = async (req, res, next) => {
  // Get token from header
  try {
    const jwtToken = req.header('token')

    // Check if not token
    if (!jwtToken) {
      return res.status(403).json({ msg: 'authorization denied' })
    }
    // Verify token
    //it is going to give use the user id (user:{id: user.id})
    const payload = jwt.verify(jwtToken, process.env.jwtSecret)

    req.user = payload.user

    next()
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
}
