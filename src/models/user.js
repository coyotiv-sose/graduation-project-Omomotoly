const Conference = require('./conference')
const Calender = require('./calender')

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  conferences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conference' }],
  calenders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Calender' }],
})

module.exports = mongoose.model('User', userSchema)

class User {
  createCalender(conference, date) {
    const calender = new Calender(this, conference, date)
    this.calenders.push(calender)
    return calender
  }

  get profile() {
    return `
      ##Name: ${this.name}
      ${
        this.conferences.length > 0
          ? `Conferences: ${this.conferences.map(conference => conference.name).join(', ')}`
          : ''
      }`
  }

  createConference(name, location, date) {
    const conference = new Conference(this, name, location, date)
    this.conferences.push(conference)
    return conference
  }

  joinConference(conference) {
    this.conferences.push(conference)
    conference.attendees.push(this)
  }

  leaveConference(conference) {
    this.conferences.splice(this.conferences.indexOf(conference), 1)
    conference.attendees.splice(conference.attendees.indexOf(this), 1)
  }
}
userSchema.loadClass(User)
module.exports = mongoose.model('User', userSchema)
