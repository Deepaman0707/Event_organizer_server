const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const pool = require('../db/db')
const validInfo = require('../middleware/validInfo')
const jwtGenerator = require('../utils/jwtGenerator')
const authorize = require('../middleware/authorization')

//authorizeentication
router.get('/', (req, res) => {
  res.json('HELLO')
})
router.post('/register', validInfo, async (req, res) => {
  try {
    const { email, name, password } = req.body
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ])

    if (user.rows.length !== 0) {
      return res.status(401).json('User already exist!')
    }

    const salt = await bcrypt.genSalt(10)
    const bcryptPassword = await bcrypt.hash(password, salt)

    let newUser = await pool.query(
      'INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *',
      [email, name, bcryptPassword]
    )

    const jwtToken = jwtGenerator(newUser.rows[0].id)
    const userData = newUser.rows[0]
    res.json({ jwtToken, userData })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

router.post('/login', validInfo, async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ])

    if (user.rows.length === 0) {
      return res.status(401).json('Invalid Credential')
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password)

    if (!validPassword) {
      return res.status(401).json('Invalid Credential')
    }
    const login = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ])
    const userData = login.rows[0]
    const jwtToken = jwtGenerator(user.rows[0].id)
    return res.json({ jwtToken, userData })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

router.get('/is-verify', authorize, async (req, res) => {
  try {
    res.json(true)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
