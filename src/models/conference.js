class Conference {
  attendees = []
  static list = []

  constructor(creator, name, location, date) {
    this.name = name
    this.location = location
    this.date = date
    creator.joinConference(this)
  }
}

module.exports = Conference
