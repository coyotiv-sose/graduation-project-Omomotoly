const mongoose = require('mongoose')
const pluralize = require('pluralize')
const autoPopulate = require('mongoose-autopopulate')

const conferenceSchema = new mongoose.Schema({
  name: String,
  location: String,
  date: String,
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: {
        maxDepth: 1,
      },
    },
  ],
})

conferenceSchema.plugin(autoPopulate)
class Conference {}

conferenceSchema.loadClass(Conference)
module.exports = mongoose.model('Conference', conferenceSchema)
