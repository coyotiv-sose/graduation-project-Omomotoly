const express = require('express')
const router = express.Router()
const Conference = require('../models/conference')
const User = require('../models/user')
const user = require('../models/user')

/* const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  name: String,
  location: String,
  date: String,
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})
module.exports = mongoose.model('User', userSchema) */

/* GET conferences listing. */
router.get('/', async function (req, res, next) {
  console.log('before')
  const conferences = await Conference.find()
  console.log('After')
  if (req.query.view === 'json')
    return res.send(
      conferences.map(conference => ({
        name: conference.name,
        location: conference.location,
        date: conference.date,
        attendees: conference.attendees.map(attendee => attendee.name),
      }))
    )

  res.render('conferences', {
    conferences,
  })
})

/* GET conference details. */
router.get('/:name', function (req, res, next) {
  const conference = Conference.list.find(conference => conference.name === req.params.name)

  if (!conference) return res.status(404).send('Conference not found')

  if (req.query.view === 'json')
    return res.send({
      name: conference.name,
      location: conference.location,
      date: conference.date,
      attendees: conference.attendees.map(attendee => attendee.name),
    })

  res.render('conference-detail', {
    conference,
  })
})

//create a conference for a user
router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.user)

  const conference = await user.createConference(req.body.name, req.body.location, req.body.date)

  res.send(conference)
})

//join a conference
router.post('/:conferenceId/attendees', async function (req, res, next) {
  const user = await User.findById(req.body.user)

  console.log('user', req.body.user, req.params.conferenceId)
  const conference = await Conference.findById(req.params.conferenceId)

  await user.joinConference(conference)

  res.send({
    name: conference.name,
  })
})



module.exports = router

/* userSchema.loadClass(User)
module.exports = mongoose.model('User', userSchema) */
