const request = require('supertest')
const app = require('../src/app')

describe('Confapp', () => {
  it('can create a user', async () => {
    const name = 'Tobi'
    const expectedOutput = {
      name,
    }

    const actualOutput = await request(app).post('/users').send({
      name,
    })

    expect(actualOutput.body).toMatchObject(expectedOutput)
  })

  it('can create a conference', async () => {
    const name = 'Tobi'
    const user = await request(app).post('/users').send({
      name,
    })

    const conferenceName = 'Conf'
    const conferenceLocation = 'Berlin'
    const conferenceDate = '2019-01-01'

    const expectedOutput = {
      name: conferenceName,
      location: conferenceLocation,

      date: conferenceDate,
      attendees: [user],
    }

    const actualOutput = await request(app).post('/conferences').send({
      name: conferenceName,
      location: conferenceLocation,
      date: conferenceDate,
      user: user.body._id,
    })

    // expect(actualOutput.body).toMatchObject(expectedOutput)
    expect(actualOutput.body.name).toBe(expectedOutput.name)
  })
})
