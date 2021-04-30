import { RateLimiterStoreAbstract } from "rate-limiter-flexible";
import { ParameterizedContext } from "koa";
declare type ControllerDecoratorConf = {
    path?: string;
};
export declare type MethodType = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH' | 'ALL';
declare type MethodDecoratorConf = {
    path?: string;
    method?: MethodType;
    rateLimitInstance?: RateLimiterStoreAbstract;
    rateLimitConsumeFn?: {
        (rateLimitInstance: RateLimiterStoreAbstract, ctx: ParameterizedContext): Promise<any>;
    };
};
export declare type ControllerType = Function & ControllerDecoratorConf;
export declare type ControllerMethod = Function & MethodDecoratorConf & {
    method: MethodType;
};
export declare function fixPath(path: string | undefined): string;
export declare function Controller(conf?: ControllerDecoratorConf): (target: Function) => void;
export declare function Method(conf?: MethodDecoratorConf): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export {};
