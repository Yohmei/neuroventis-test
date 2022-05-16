const db = require('./db.json')

const getUserReports = (ctx) => {
  const userReports = db.map(({ _id, name, email, gender, registered, reports }) => ({
    id: _id,
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
  const patients = db.filter((patient) => patient._id === ctx.params.patientId)
  let user = null

  if (patients.length > 0) user = patients[0]

  ctx.status = 200
  ctx.body = user
}

module.exports = {
  getUserReports,
  getUserDetails,
}
