import { Next, ParameterizedContext } from "koa";
import Router from "koa-router";
import { Controller, Method } from "./src/ClassifyKoaRouterDecorator";
import { ScanControllerOpts } from "./src/util";
export declare type OtherOpts = {
    logRoute?: boolean;
};
export default function ClassifyKoaRouter(router: Router, scanController: ScanControllerOpts, otherOpts?: OtherOpts): (ctx: ParameterizedContext, next: Next) => Promise<void>;
export { Controller, Method };
