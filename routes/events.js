const express = require('express')
const router = express.Router()
const pool = require('../db')

//authorizeentication
router.use(express.json())
router.post('/newevent', async (req, res) => {
  try {
    const { title, description, fee, creator, category } = req.body
    let newEvent = await pool.query(
      'INSERT INTO event (event_name, event_Description, creator, fee, category, likes, attendees) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, description, creator, fee, category, [creator], [creator]]
    )
    const eventData = newEvent.rows[0]
    res.json({ eventData })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})
router.get('/', async (req, res) => {
  try {
    // const { title, description, fee, creator, category } = req.body
    let results = await pool.query('SELECT * FROM event')
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: results.rows,
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})
router.get('/:creatorid', async (req, res) => {
  try {
    const { creatorid } = req.params

    // const { title, description, fee, creator, category } = req.body
    let results = await pool.query('SELECT * FROM event where creator = $1', [
      creatorid,
    ])
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: results.rows,
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
