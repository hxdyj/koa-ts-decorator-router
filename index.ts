import { Next, ParameterizedContext, Request } from "koa";
import Router from "koa-router";
import { Controller, Method } from "./src/ClassifyKoaRouterDecorator";
import { scanControllerAndRegister, ScanControllerOpts } from "./src/util";

export default function ClassifyKoaRouter(router:Router,
    scanController:ScanControllerOpts){
    scanControllerAndRegister(router,scanController)

    // tansfor rotuer to next.
    return async function (ctx:ParameterizedContext, next:Next) {
        let fn = router.routes()
        await fn(ctx as unknown as ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>, () => {
            return Promise.resolve()
        })
        await next()
    }
}
export {Controller,Method}