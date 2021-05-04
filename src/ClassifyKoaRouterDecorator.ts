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
            path: fixPath(conf?.path) || Reflect.get(target, 'path')
        })
    }
}
export function Method(conf?: MethodDecoratorConf) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let value = target[propertyKey]
        let path = fixPath(conf?.path || value.path || propertyKey)
        Object.assign(target[propertyKey], {
            path: path,
            method: conf?.method || value.method || 'GET',
            rateLimitConsumeFn: conf?.rateLimitConsumeFn || value.rateLimitConsumeFn,
            rateLimitInstance: conf?.rateLimitInstance || value.rateLimitInstance
        })
    };
}

export function Path(path: string) {
    return function (target: any, propertyKey?: string, descriptor?: PropertyDescriptor) {
        if (propertyKey && descriptor) {
            Method({ path })(target, propertyKey, descriptor)
        } else {
            Controller({ path })(target)
        }
    };
}


export function POST() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Method({ method: 'POST' })(target, propertyKey, descriptor)
    };
}

export function GET() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Method({ method: 'GET' })(target, propertyKey, descriptor)
    };
}

export function PUT() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Method({ method: 'PUT' })(target, propertyKey, descriptor)
    };
}

export function DELETE() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Method({ method: 'DELETE' })(target, propertyKey, descriptor)
    };
}

export function PATCH() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Method({ method: 'PATCH' })(target, propertyKey, descriptor)
    };
}

export function ALL() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        Method({ method: 'ALL' })(target, propertyKey, descriptor)
    };
}
