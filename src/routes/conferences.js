const express = require('express')
const router = express.Router()
const Conference = require('../models/conference')

/* GET conferences listing. */
router.get('/', function (req, res, next) {
  if (req.query.view === 'json')
    return res.send(
      Conference.list.map(conference => ({
        name: conference.name,
        location: conference.location,
        date: conference.date,
        attendees: conference.attendees.map(attendee => attendee.name),
      }))
    )

  res.render('conferences', {
    conferences: Conference.list,
  })
})

module.exports = router
