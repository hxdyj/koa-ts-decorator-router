import Router from "koa-router";
import { ControllerMethod, ControllerType, fixPath } from "./ClassifyKoaRouterDecorator";
const requireAll = require('require-all')

export type ScanControllerOpts = {
    dirname:string,
    filter:RegExp
}

function registerRoute(router: Router, controller: ControllerType) {
    Object.getOwnPropertyNames(controller).forEach(key => {
        let value = Reflect.get(controller, key)
        let excludeKeys = ['length', 'prototype', 'path']
        if (!excludeKeys.includes(key) && value instanceof Function) {
            let func = value as unknown as ControllerMethod 
            let controllerPath = Reflect.get(controller, 'path')
            controllerPath = controllerPath?'/'+controllerPath+'/':'/'
            const methodPath = fixPath(func.path||key)  // 没有写注解的method默认取方法名
            let path = controllerPath + methodPath
            router[func.method || 'get'](path, async ctx => {
                try {
                    if(func.rateLimitInstance&&func.rateLimitConsumeFn){
                        await func.rateLimitConsumeFn.call(null,func.rateLimitInstance,ctx)
                    }
                } catch (error) {
                    ctx.status = 429
                    ctx.body = 'Too Many Requests'                     
                }
                if(ctx.status == 429) return
                let body = Reflect.get(ctx.request,'body')
                let param = body || ctx.request.query || {}
                if (!(param instanceof Array)) {
                    if(Object.prototype.toString.call(body)==='[object Object]'){
                        Object.assign(param, ctx.request.query)
                    }
                }
                let paramType = Object.prototype.toString.call(param)
                if(paramType==='[object Object]'||paramType==='[object Array]'){
                    Object.keys(param).forEach(key => {
                        let val = param[key]
                        //auto transform param value string to number.
                        if ( Object.prototype.toString.call(val)==="[object String]" && /^(-|\+)?\d+\.?\d*$/g.test(val)) {
                            try {
                                if (/\./.test(val)) {
                                    param[key] = parseFloat(val)
                                } else {
                                    param[key] = parseInt(val)
                                }
                            } catch (error) {
                            }
                        }
    
                    })
                }
           
                let result = await func.call(null, param,ctx.request)
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


export function  scanControllerAndRegister(router:Router,scanControllerOpts:ScanControllerOpts){
    const allControllers = requireAll(scanControllerOpts)
    const controllers:ControllerType[] = []
    function recursionGetControllerClass(object:any){
        Object.values(object).forEach(item=>{
            let i = item as Object
            if(i.hasOwnProperty('default')&&i.hasOwnProperty('__esModule')&&Reflect.get(i,'__esModule')===true){
                controllers.push(Reflect.get(i,'default'))
            }else{
                recursionGetControllerClass(i)
            }
        })
    }
    recursionGetControllerClass(allControllers)
    controllers.forEach(controller=>{
        registerRoute(router, controller)
    })
}