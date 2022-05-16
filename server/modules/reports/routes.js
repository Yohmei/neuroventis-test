const koaRouter = require('koa-router')
const { getUserReports, getUserDetails, postUserReport } = require('./reportServices')

const router = new koaRouter({
  prefix: '/report',
})

router.get('/', getUserReports)
router.get('/:patientId', getUserDetails)
router.post('/:patientId', postUserReport)

module.exports = router
