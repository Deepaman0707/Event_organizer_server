const express = require('express')
const PORT = process.env.PORT || 8080
const app = express()
const morgan = require('morgan')
const cors = require('cors')

//middleware

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.json('HELLO')
})
//routes
app.use('/auth', require('./routes/jwtAuth'))
// app.use("/authentication", require("./routes/jwtAuth"));

app.use('/dashboard', require('./routes/dashboard'))
app.use('/events', require('./routes/events'))
app.use('/likes', require('./routes/likes'))
app.use('/attendees', require('./routes/attendees'))
app.use('/userdetail', require('./routes/userdetail'))
app.listen(PORT, () => console.log('Magic happening on PORT', +PORT))

