//https://www.liaoxuefeng.com/wiki/1022910821149312/1099849448318080
//https://chenshenhai.github.io/koa2-note/note/request/post-use-middleware.html
//https://koa.bootcss.com/

import Koa from 'koa'
import Router from 'koa-router'
import KoaBody from 'koa-body'
import path from 'path';
import ClassifyKoaRouter from '../index';


const app = new Koa();


// set cors
app.use(async (ctx, next) => {
    //https://stackoverflow.com/questions/36250615/cors-with-postman
    //https://www.zhihu.com/question/62678567/answer/204352928 postman为什么不会跨域呢
    ctx.set("Access-Control-Allow-Origin", "*")
    ctx.set("Content-Type", "application/json; charset=utf-8")
    ctx.set("Access-Control-Allow-Headers", "accessToken, Content-Type")
    //https://segmentfault.com/q/1010000005067552/a-1020000005157959  POST block is not worked.
    ctx.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    if (ctx.method === 'OPTIONS') {
        ctx.body = '';
        ctx.status = 204;
    } else {
        await next();
    }
})



// parse body from 
app.use(KoaBody({
    multipart: true
}))


const router = new Router()

app.use(ClassifyKoaRouter(
    router,
    {
        dirname: path.join(__dirname + '/controller'),
        filter: /(.*Controller)\.ts$/,
    },
    {
        logRoute:true
    }
))

// deal all response at here.  auto instance Result class to wrap response body.
/* app.use(ctx => {
    if (ctx.status === 200 && !(ctx.body instanceof Result)) {
        ctx.body = new Result(ctx.body, 200)
    }
}) */
app.listen(3000);
export default app