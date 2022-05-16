const koaRouter = require('koa-router')
const { getUserReports, getUserDetails } = require('./reportServices')

const router = new koaRouter({
  prefix: '/report',
})

router.get('/', getUserReports)
router.get('/:patientId', getUserDetails)

module.exports = router
