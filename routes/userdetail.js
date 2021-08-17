const router = require('express').Router()
const pool = require('../db')

router.get('/:userid', async (req, res, next) => {
  const { userid } = req.params
  try {
    const results = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [userid]
    )
    res.status(200).json({
      status: 'success',
      data: results.rows[0],
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
