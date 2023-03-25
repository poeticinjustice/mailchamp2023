const express = require('express')
const request = require('superagent')
const cors = require('cors')
const router = express.Router()

router.use(express.json())
router.use(cors())

require('dotenv').config()

const apiUrl = process.env.MC_API_URL
const apiToken = process.env.MC_ACCESS_TOKEN
const link = `${apiUrl}/reports?offset=0&count=8`

router.get('/reports', function (req, res) {
  request
    .get(link)
    .auth('anystring', apiToken, { type: 'auto' })
    .end((err, _res) => {
      if (err) {
        return console.log(err)
      }
      res.send(_res.body)
    })
})

module.exports = router
