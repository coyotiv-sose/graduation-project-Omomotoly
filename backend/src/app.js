require('dotenv').config()
const User = require('./models/user')
const Conference = require('./models/conference')
const Attendee = require('./models/attendee')

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const pluralize = require('pluralize')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
require('./database-connection')
const passport = require('passport')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const conferencesRouter = require('./routes/conferences')
const accountsRouter = require('./routes/accounts')

// console.log(process.env.MONGODB_CONNECTION_STRING)
// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy())

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

const app = express()
app.set('trust proxy', 1)

app.use(cors({ origin: true, credentials: true }))

app.locals.pluralize = pluralize

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const clientPromise = mongoose.connection.asPromise().then(connection => (connection = connection.getClient()))

//const connectionPromise = mongoose.connection.asPromise().then(connection => connection.getClient())

app.use(
  session({
    secret: 'assjjdhhdk6673!!@@##$656',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
      // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      domain: process.env.NODE_ENV === 'production' ? '.herokuapp.com' : 'localhost',
    },
    store: MongoStore.create({ clientPromise, stringify: false }),
    //      mongoUrl: process.env.MONGODB_CONNECTION_STRING,
    //ttl: 60 * 60 * 24 * 15, // 15 days
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  const numberOfVisits = req.session.numberOfVisits || 0
  req.session.numberOfVisits = numberOfVisits + 1
  req.session.history = req.session.history || []
  req.session.history.push({ url: req.url, ip: req.ip })

  console.log('session', req.session.numberOfVisits)

  next()
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/users', usersRouter)
app.use('/conferences', conferencesRouter)
app.use('/', indexRouter)
app.use('/accounts', accountsRouter)

// catch 404 and forward to error handler
/* app.use(function (req, res, next) {
  next(createError(404))
}) */

app.get('/delete', async (req, res) => {
  await User.deleteMany()
  await Conference.deleteMany()
  res.send('Deleted')
})

// error handler
app.use(function (err, req, res, next) {
  console.log(err)

  //render the error page
  res.status(err.status || 500)
  res.send('err')
})

app.createSocketServer = function (server) {
  const io = require('socket.io')(server, {
    cors: {
      origin: true,
      credentials: true,
    },
  })
}

module.exports = app
