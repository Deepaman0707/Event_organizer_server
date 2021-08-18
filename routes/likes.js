const router = require('express').Router()
const authorize = require('../middleware/authorization')
const pool = require('../db/db')

router
  .route('/:eventid')
  .put(async (req, res, next) => {
    const { eventid } = req.params
    const { id } = req.body
    try {
      const results = await pool.query(
        'UPDATE event SET likes = likes || $1 WHERE id = $2 returning *',
        [[id], eventid]
      )
      res.status(200).json({
        status: 'success',
        data: results.rows[0],
      })
    } catch (error) {
      console.log(error)
    }
  })
  .delete(async (req, res, next) => {
    try {
      const { eventid } = req.params
      const { id } = req.body
      const results = await pool.query(
        'UPDATE event SET likes = array_remove(likes, $1) WHERE id = $2 returning *',
        [id, eventid]
      )
      res.status(201).json({
        status: 'success',
        data: results.rows[0],
      })
    } catch (error) {
      console.log(error)
    }
  })

module.exports = router
