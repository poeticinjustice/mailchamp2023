// update for test
import express from 'express'
import connectDB from './config/db.js'
import path from 'path'

import auth from './routes/auth.js'
import report from './routes/report.js'
import reports from './routes/reports.js'
import transfer from './routes/transfer.js'
import users from './routes/users.js'

const app = express()

// Connect Database
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

// Define Routes

app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api', report)
app.use('/api', reports)
app.use('/api', transfer)

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
