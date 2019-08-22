const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const rest = require('./rest');
const api=require('./controllers/api');
const path = require('path');
const staticFiles = require('koa-static');

const app = new Koa();
process.env.NODE_ENV = 'production'
app.use(bodyParser());
// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
app.use(staticFiles(path.join(__dirname + './public/')));
for (var url in api) {
    if (url.startsWith('GET ')) {
        // 如果url类似"GET xxx":
        var Path = url.substring(4);
        router.get(Path, api[url]);
        console.log(`register URL mapping: GET ${Path}`);
    } else if (url.startsWith('POST ')) {
        // 如果url类似"POST xxx":
        var Path = url.substring(5);
        router.post(Path, api[url]);
        console.log(`register URL mapping: POST ${Path}`);
    } else if(url.startsWith('DELETE')){
        // 如果url类似"DELETE xxx":
        var Path = url.substring(7);
        router.delete(Path, api[url]);
        console.log(`register URL mapping: DELETE ${Path}`);
    } else if(url.startsWith('PUT')){
        // 如果url类似"PUT xxx":
        var Path = url.substring(4);
        router.put(Path, api[url]);
        console.log(`register URL mapping: PUT ${Path}`);
    } else {
        // 无效的URL:
        console.log(`invalid URL: ${url}`);
    }
}
app.use(router.routes());
app.use(rest.restify());

app.listen(3000);
console.log('app started at port 3000');