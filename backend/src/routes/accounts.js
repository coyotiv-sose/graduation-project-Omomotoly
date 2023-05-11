const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')

router.get('/session', async function (req, res, next) {
  res.send(req.user)
})

router.post('/session', passport.authenticate('local', { failWithError: true }), function (req, res) {
  res.send(req.user)
})

/* router.post('/', async function (req, res, next) {
  const { name, email } = req.body

  const user = new User({ name, email })
  await user.setPassword(password)
  await user.save()
}) */

router.delete('/session', (req, res) => {
  req.logout(() => {
    res.sendStatus(200)
  })
})

module.exports = router
