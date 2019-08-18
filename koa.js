const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const rest = require('./rest');

const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(bodyParser());
app.use(rest.restify());

app.listen(3000);
console.log('app started at port 3000');