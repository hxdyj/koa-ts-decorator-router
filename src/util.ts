import Router from "koa-router";
import { getOtherOpts } from "./baseUtil";
import { ControllerMethod, ControllerType, fixPath } from "./ClassifyKoaRouterDecorator";
import { dealParam } from "./dealParam";
const requireAll = require('require-all')
export type ScanControllerOpts = {
    dirname: string,
    filter: RegExp
}

function register(router: Router, controller: ControllerType, isInstance = false) {
    let currentController = isInstance ? Reflect.get(controller, '__proto__') : controller
    Object.getOwnPropertyNames(currentController).forEach(key => {
        let value = Reflect.get(currentController, key)
        let excludeKeys = ['length', 'prototype', 'path', 'constructor']
        if (!excludeKeys.includes(key) && value instanceof Function) {
            let func = value as unknown as ControllerMethod
            let controllerPath = Reflect.get(isInstance ? currentController.constructor : currentController, 'path')
            controllerPath = controllerPath ? '/' + controllerPath + '/' : '/'
            const methodPath = fixPath(func.path || key)  // 没有写注解的method默认取方法名
            let path = controllerPath + methodPath
            if (getOtherOpts().logRoute) {
                console.log(`${(func.method || 'get').toUpperCase().padEnd(8)} : ${path}`);
            }
            router[func.method || 'get'](path, async ctx => {
                try {
                    if (func.rateLimitInstance && func.rateLimitConsumeFn) {
                        await func.rateLimitConsumeFn.call(null, func.rateLimitInstance, ctx)
                    }
                } catch (error) {
                    ctx.status = 429
                    ctx.body = 'Too Many Requests'
                }
                if (ctx.status == 429) return
                let param = dealParam(ctx)
                let result = await func.call(controller, param, ctx.request)
                if (result instanceof Promise) {
                    result.catch((err: Error) => {
                        return err
                    })
                }
                ctx.body = result
            })
        }

    })
}

function registerRoute(router: Router, controller: ControllerType) {
    //注册原型上的方法
    register(router, controller)
    //注册实例上的方法
    let instance = new controller.prototype.constructor()
    register(router, instance, true)
}


export function scanControllerAndRegister(router: Router, scanControllerOpts: ScanControllerOpts) {
    const allControllers = requireAll(scanControllerOpts)
    const controllers: ControllerType[] = []
    function recursionGetControllerClass(object: any) {
        Object.values(object).forEach(item => {
            let i = item as Object
            let keys = Object.getOwnPropertyNames(i)
            let exludeKeys = ['__esModule']
            if (i.hasOwnProperty('__esModule') && Reflect.get(i, '__esModule') === true) {
                keys.forEach(key => {
                    if (!exludeKeys.includes(key)) {
                        controllers.push(Reflect.get(i, key))
                    }
                })
            } else {
                recursionGetControllerClass(i)
            }
        })
    }
    recursionGetControllerClass(allControllers)
    controllers.forEach(controller => {
        registerRoute(router, controller)
    })
}