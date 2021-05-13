import { Next, ParameterizedContext } from "koa";
import Router from "koa-router";
import { Controller, Method, GET, POST, PUT, DELETE, PATCH, ALL, Path, MethodType, CustomConf } from "./src/Decorator";
import { ScanControllerOpts } from "./src/ScanController";
declare type BeforeCallMethodConf<T> = {
    fullPath: string;
    method: MethodType;
    customConf?: T;
};
declare type OnBeforeCallMethodFunc<T> = {
    (ctx: ParameterizedContext, methodConf: BeforeCallMethodConf<T>): unknown;
};
export declare type OtherOpts<T> = {
    logRoute?: boolean;
    /**
     * if return ture, will be call method. else not call method and ctx.body will be set to you function return value.
     *  */
    onBeforeCallMethod?: OnBeforeCallMethodFunc<T>;
};
export default function ClassifyKoaRouter<T>(router: Router, scanController: ScanControllerOpts, otherOpts?: OtherOpts<T>): (ctx: ParameterizedContext, next: Next) => Promise<void>;
export { Controller, Method, GET, POST, PUT, DELETE, PATCH, ALL, Path, CustomConf, BeforeCallMethodConf };
