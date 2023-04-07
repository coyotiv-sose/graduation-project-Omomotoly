const Conference = require('./conference')

class Attendee {
  calender = []
  conferences = []

  constructor(name) {
    this.name = name
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

module.exports = Attendee
