import { RateLimiterStoreAbstract } from "rate-limiter-flexible";
import { ParameterizedContext } from "koa";
declare type ControllerDecoratorConf = {
    path?: string;
};
export declare type MethodType = "GET" | "PUT" | "POST" | "DELETE" | "PATCH" | "ALL";
declare type MethodDecoratorConf<T> = {
    path?: string;
    method?: MethodType;
    customConf?: T;
    rateLimitInstance?: RateLimiterStoreAbstract;
    rateLimitConsumeFn?: {
        (rateLimitInstance: RateLimiterStoreAbstract, ctx: ParameterizedContext): Promise<any>;
    };
};
export declare type ControllerType = Function & ControllerDecoratorConf;
export declare type ControllerMethod<T> = Function & MethodDecoratorConf<T> & {
    method: MethodType;
};
export declare function fixPath(path: string | undefined): string;
export declare function Controller(conf?: ControllerDecoratorConf): (target: Function) => void;
export declare function Method<T>(conf?: MethodDecoratorConf<T>): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function Path(path: string): (target: any, propertyKey?: string | undefined, descriptor?: PropertyDescriptor | undefined) => void;
export declare function CustomConf<T>(customConf: T): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function POST(path?: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function GET(path?: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function PUT(path?: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function DELETE(path?: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function PATCH(path?: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function ALL(path?: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export {};
