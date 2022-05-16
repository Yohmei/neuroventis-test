import 'dotenv/config'
import * as db from '../modules/reports/db.json'
import * as request from 'supertest'

describe('Report Controller (e2e)', () => {
  it('should get all patient reports', (done) => {
    const userReports = db.map(({ _id, name, email, gender, registered, reports }) => ({
      _id,
      name,
      email,
      gender,
      registered,
      reports,
    }))

    request(process.env.DEV_SERVER_URL)
      .get('/report')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toEqual(userReports)
        done()
      })
  })

  it('should get a specific patient report', (done) => {
    const patients = db.filter((patient) => patient._id === '610d4b69a2962f35e46f028c')
    let user = null

    if (patients.length > 0) user = patients[0]

    request(process.env.DEV_SERVER_URL)
      .get('/report/610d4b69a2962f35e46f028c')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toEqual(user)
        done()
      })
  })
})
