import { Next, ParameterizedContext } from "koa";
import Router from "koa-router";
import { Controller, Method, GET, POST, PUT, DELETE, PATCH, ALL, Path } from "./src/ClassifyKoaRouterDecorator";
import { scanControllerAndRegister, ScanControllerOpts } from "./src/util";
export type OtherOpts = {
    logRoute?: boolean
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