import { Next, ParameterizedContext } from "koa";
import Router from "koa-router";
import { Controller, Method, GET, POST, PUT, DELETE, PATCH, ALL, Path } from "./src/Decorator";
import { scanControllerAndRegister, ScanControllerOpts } from "./src/ScanController";
export type OtherOpts = {
    logRoute?: boolean,
    /**
     * if return ture, will be call method. else not call method and ctx.body will be set to you function return value.
     *  */
    onBeforeCallMethod?: (ctx: ParameterizedContext) => unknown
}


export default function ClassifyKoaRouter(
    router: Router,
    scanController: ScanControllerOpts,
    otherOpts?: OtherOpts
) {
    Object.assign(global, {
        __otherOpts: otherOpts || {}
    })
    scanControllerAndRegister(router, scanController)

    // tansfor rotuer to next.
    return async function (ctx: ParameterizedContext, next: Next) {
        let fn = router.routes()
        await fn(ctx as unknown as ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>, () => {
            return Promise.resolve()
        })
        await next()
    }
}
export { Controller, Method, GET, POST, PUT, DELETE, PATCH, ALL, Path }