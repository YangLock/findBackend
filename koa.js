const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const rest = require('./rest');
const api=require('./controllers/api');


const app = new Koa();
process.env.NODE_ENV = 'develop'
app.use(bodyParser());
// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
for (var url in api) {
    if (url.startsWith('GET ')) {
        // 如果url类似"GET xxx":
        var path = url.substring(4);
        router.get(path, api[url]);
        console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
        // 如果url类似"POST xxx":
        var path = url.substring(5);
        router.post(path, api[url]);
        console.log(`register URL mapping: POST ${path}`);
    } else if(url.startsWith('DELETE')){
        // 如果url类似"DELETE xxx":
        var path = url.substring(7);
        router.DELETE(path,api[url]);
        console.log(`register URL mapping: DELETE ${path}`);
    }else {
        // 无效的URL:
        console.log(`invalid URL: ${url}`);
    }
}
app.use(router.routes());
app.use(rest.restify());

app.listen(3000);
console.log('app started at port 3000');