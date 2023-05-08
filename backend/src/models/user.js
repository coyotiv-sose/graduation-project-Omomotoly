const Conference = require('./conference')
const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  conferences: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conference',
      autopopulate: false,
    },
  ],
})

userSchema.plugin(autopopulate)

class User {
  /*createCalender(conference, date) {
    const calender = new Calender(this, conference, date)
    this.calenders.push(calender)
    return calender
  } */

  async createConference(name, location, date) {
    const conference = await Conference.create({ name: name, location: location, date: date })

    await this.joinConference(conference)

    return conference
  }

  async joinConference(conference) {
    conference.attendees.push(this)
    this.conferences.push(conference)

    await conference.save()
    await this.save()
  }

  leaveConference(conference) {
    this.conferences.splice(this.conferences.indexOf(conference), 1)
    conference.attendees.splice(conference.attendees.indexOf(this), 1)
  }

  get profile() {
    return `
# ${this.name}

${this.conferences.length} conferences:
${this.conferences
  .map(
    conference => `
- ${conference.name} (${conference.location} on ${conference.date})
`
  )
  .join('')}
    `
  }
}

userSchema.loadClass(User)
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
module.exports = mongoose.model('User', userSchema)
