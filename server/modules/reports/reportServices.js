const db = require('./db.json')
const fs = require('fs')

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

const getUserReports = (ctx) => {
  const userReports = db.map(({ _id, name, email, gender, registered, reports }) => ({
    _id,
    name,
    email,
    gender,
    registered,
    reports,
  }))

  ctx.status = 200
  ctx.body = userReports
}

const getUserDetails = (ctx) => {
  const users = db.filter((patient) => patient._id === ctx.params.patientId)
  let user = null

  if (users.length > 0) user = users[0]

  ctx.status = 200
  ctx.body = user
}

const postUserReport = (ctx) => {
  const { reportName, content, event } = ctx.request.body
  let statusCode
  let response
  let message = []

  if (event === '') message.push({ event: 'Must not be empty' })
  if (content === '') message.push({ content: 'Must not be empty' })
  if (reportName === '') message.push({ reportName: 'Must not be empty' })

  if (reportName === '' || content === '' || event === '') {
    statusCode = 400
    response = { statusCode: 400, message, error: 'Bad Request' }
  } else {
    statusCode = 200
    const users = db.map((patient) => {
      if (db.find((patient) => patient._id === ctx.params.patientId))
        patient.reports.push({ _id: uid(), reportName, content, event, created: new Date().toISOString() })

      return patient
    })

    fs.writeFile('./modules/reports/db.json', JSON.stringify(users), (err) => {
      console.log('writing file')
      if (err) console.log(err)
    })

    const patients = users.filter((patient) => patient._id === ctx.params.patientId)
    let user = null

    if (patients.length > 0) user = patients[0]

    response = { statusCode: 200, message: user }
  }

  ctx.status = statusCode
  ctx.body = response
}

module.exports = {
  getUserReports,
  getUserDetails,
  postUserReport,
}
