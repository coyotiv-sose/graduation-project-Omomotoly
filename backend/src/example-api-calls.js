const User = require('./models/user')
const Conference = require('./models/conference')
const axios = require('axios')
axios.defaults.baseURL = 'http://localhost:3000'
require('dotenv').config()
require('./database-connection')

console.log('The Platform is an App for Creating and Managing Events')
//I need two main objects: Users, Events and, and users can create events and attendees will join the events
//I need to be able to create a usesr, create an event, and create an attendee
//I need to be able to get a list of all users, get a list of all events
//I need to be able to get a list of all events a user has created, get a list of attendees for an event
//Attendees should be able to join an event, and users should be able to leave an event
//User should be able to delete an event, delete an attendee, and delete a user
//I need to be able to edit their account information
//I need to be able to edit an event information
//Attendees should be to have a create calender for the events they are attending
//Attendees should be able to update their calender
//Attendees should be able to delete an event from their calender

//fetch users with axios

/* axios.get('http://localhost:3000/users').then(response => {
  console.log(response.data)
}) */

// create a user with axios

async function main() {
  await User.deleteMany()
  await Conference.deleteMany()

  const tobi = await axios.post('/users', {
    name: 'Tobi',
    email: 'tobi1234@gmail.com',
    password: '123456~',
  })

  const kemi = await axios.post('/users', {
    name: 'Kemi',
    email: 'kemi1234@gmail.com',
    password: '123456~',
  })

  /*await axios.post('/users', {
    name: 'Zainab',
  })

  await axios.post('/users', {
    name: 'Omotola',
  })*/
  const tobiGoogleConference = await axios.post('/conferences', {
    user: tobi.data._id,
    name: 'TobiGoogleConference',
    location: 'Whispering Palms',
    date: '12/10/2019',
  })

  const kemiAnnualConference = await axios.post('/conferences', {
    user: kemi.data._id,
    name: 'KemiAnnualConference',
    location: 'National Park',
    date: '12/12/2019',
  })

  await axios.post(`/conferences/${tobiGoogleConference.data._id}/attendees`, {
    user: kemi.data._id,
  })
  await axios.post(`/conferences/${kemiAnnualConference.data._id}/attendees`, {
    user: tobi.data._id,
  })

  const allUsers = await axios.get('/users')
  console.log('List of all users', allUsers.data)

  /* const tobi = await axios.post('/users', {
    name: 'Tobi',
    email: 'tobi@gmail.com',
    password: '123456~',
  })

  const tobiGoogleConference = await axios.post('/conferences', {
    user: tobi.data._id,

    name: 'TobiGoogleConference',
    location: 'Whispering Palms',
    date: '12/10/2019',
  })
 */
  // const loggedInTobi = await axios.post('/accounts/session', {
  //   email: 'tobi@gmail.com',
  //   password: '123456~',
  // })

  // console.log('Tobi', loggedInTobi.data)
}

main().catch(error => {
  console.log(error.message ? error.message : error)
})

/* const tobi = new User('Tobi')
const kemi = new User('Kemi')
const zainab = new User('Zainab')

//const tobisConference = new Conference(tobi, "Tobi's Conference", "Whispering Palms", "12/10/2019")
//const kemisConference = new Conference(kemi, "Kemi's Conference", "National Park", "12/12/2019")

const tobisConference = tobi.createConference("Tobi's Conference", 'Whispering Palms', '12/10/2019')
const kemisConference = kemi.createConference("Kemi's Conference", 'National Park', '12/12/2019')
zainabLeaveConference = zainab.leaveConference(tobisConference)

kemi.joinConference(tobisConference)
zainab.joinConference(tobisConference)
zainab.createCalender(tobisConference, '12/10/2019')
zainab.createCalender(kemisConference, '12/10/2019')
 */
//console.log(`KEMI has a name of ${kemi.name} and has joined ${kemi.conferences.length} conferences`)
//console.log(`tobisConference has a name of ${tobisConference.name} and has ${tobisConference.attendees.length} attendees: ${tobisConference.attendees.map(attendee => attendee.name).join(', ')}.`)
//console.log(`kemisConference has a name of ${kemisConference.name} and has ${kemisConference.attendees.length} attendees: ${kemisConference.attendees.map(attendee => attendee.name).join(', ')}.`)
//console.log(tobisConference)
//console.log(`tobis conference has two attendees: ${tobisConference.attendees.length === 2}`)
//console.log(`tobis Conference has kemi as the second attendee: ${tobisConference.attendees[1] === kemi}`)
//console.log(`tobi has joined kemis conference: ${tobi.conferences[0] === kemisConference}`)
//console.log(tobisConference)
//console.log(`Tobi has a name of ${tobi.name} and has created )
//console.log(`zainab has a name of ${zainab.name} and has joined ${zainab.conferences.length} conferences`)
//console.log(`zainab has a name of ${zainab.name} and has created ${zainab.calender.length} calenders`)
