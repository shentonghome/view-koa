const isProduction = process.env.NODE_ENV === 'production';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const controller = require('./controllers');

const staticFiles = require('./static-files');

const templating = require('./templating');

const app = new Koa();

//记录日志用的
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

app.use(bodyParser());

app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

app.use(staticFiles('/static/',__dirname + '/static'));

app.use(controller());



var port = 30001;
app.listen(port);

console.log(`start at http://localhost:${port}`);