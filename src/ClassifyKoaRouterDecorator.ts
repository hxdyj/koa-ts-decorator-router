import { RateLimiterStoreAbstract } from "rate-limiter-flexible"
import { ParameterizedContext } from "koa";
import trimChars from 'lodash/fp/trimChars'
type ControllerDecoratorConf = {
    path?: string
}

export type MethodType = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH' | 'ALL'

type MethodDecoratorConf = {
    path?: string,
    method?: MethodType,
    rateLimitInstance?: RateLimiterStoreAbstract
    rateLimitConsumeFn?: {
        (rateLimitInstance: RateLimiterStoreAbstract, ctx: ParameterizedContext): Promise<any>;
    };
}

export type ControllerType = Function & ControllerDecoratorConf
export type ControllerMethod = Function & MethodDecoratorConf & {
    method: MethodType,
}

export function fixPath(path: string | undefined) {
    let result = path || ''
    return trimChars('/', result)
}


export function Controller(conf?: ControllerDecoratorConf) {
    return function (target: Function) {
        Object.assign(target, {
            path: fixPath(conf?.path)
        })
    }
}
export function Method(conf?: MethodDecoratorConf) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let path = fixPath(conf?.path || propertyKey)
        Object.assign(target[propertyKey], {
            path: path,
            method: conf?.method || 'GET',
            rateLimitConsumeFn: conf?.rateLimitConsumeFn,
            rateLimitInstance: conf?.rateLimitInstance
        })
    };
}
