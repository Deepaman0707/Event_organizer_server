const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

//middleware

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

//routes
app.use('/auth', require('./routes/jwtAuth'))
// app.use("/authentication", require("./routes/jwtAuth"));

app.use('/dashboard', require('./routes/dashboard'))
app.use('/events', require('./routes/events'))
app.use('/likes', require('./routes/likes'))
app.use('/attendees', require('./routes/attendees'))
app.use('/userdetail', require('./routes/userdetail'))

app.listen(5000, () => {
  console.log(`Server is starting on port 5000`)
})
