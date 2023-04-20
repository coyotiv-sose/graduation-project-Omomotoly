var express = require('express')
var router = express.Router()
const User = require('../models/user')
const Conference = require('../models/conference')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  res.send(await User.find())
})

/*create a new user*/
router.post('/', async function (req, res, next) {
  const user = await User.create({ name: req.body.name })
  res.send(user)
})

/*create a conference for a user*/
/*router.post('/:userId/conferences', function (req, res, next) {
  const user = User.list.find(user => user.name === req.params.userId)
  const conference = user.createConference(req.body.name, req.body.location, req.body.date)
  res.send({ name: conference.name, location: conference.location, date: conference.date })
})

//join a conference
router.post('/:userId/conferences/:conferenceId', function (req, res, next) {
  try {
    const user = User.list.find(user => user.name === req.body.name)
    const conference = Conference.list.find(conference => conference.name === req.params.conferenceId)

    user.joinConference(conference)

    res.send({
      name: conference.name,
      location: conference.location,
      date: conference.date,
      attendees: conference.attendees.map(attendee => attendee.name),
    })
  } catch (e) {
    res.status(400).send(e.message)
  }
}) */
module.exports = router
