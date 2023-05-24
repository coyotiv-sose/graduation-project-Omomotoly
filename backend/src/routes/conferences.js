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
  /*  const berlin = req.session.berlin || 0

  req.session.berlin = berlin + 1

  req.session.visits = req.session.visits || []

  req.session.visits.push(`conference detail ${req.params.id}`)

  console.log('fetching conferences.Number of visits', berlin) */

  const conferences = await Conference.find()

  console.log('Aftr')

  return res.send(conferences)

  res.render('conferences', {
    conferences,
  })
})

/* GET conference details. */
router.get('/:id', async function (req, res, next) {
  /*  const berlin = req.session.berlin || 0

  req.session.berlin = berlin + 1

  req.session.visits = req.session.visits || []

  req.session.visits.push(`conference detail ${req.params.id}`)

  console.log('fetching conferences. Number of visits:', berlin, req.session.visits)*/

  const conference = await Conference.findById(req.params.id)

  if (!conference) return res.status(404).send('Conference not found')

  return res.send(conference)

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
