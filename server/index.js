const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa();
const reportRouter = require('./modules/reports/routes');
app.use(cors());
app.use(reportRouter.routes());

app.listen(5000, () => {
    console.log("Listening on 5000. Up and ready!");
});
