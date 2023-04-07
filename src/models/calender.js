const Conference = require('./conference')

class Calender {
  constructor(user, conference, date) {
    this.user = user
    this.conference = conference
    this.date = date
  }
}

module.exports = Calender
