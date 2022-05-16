import 'dotenv/config'
import * as db from '../modules/reports/db.json'
import * as request from 'supertest'

describe('AuthController (e2e)', () => {
  it('', (done) => {
    const userReports = db.map(({ _id, name, email, gender, registered, reports }) => ({
      id: _id,
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
})
