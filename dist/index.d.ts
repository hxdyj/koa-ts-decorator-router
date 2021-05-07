import { Next, ParameterizedContext } from "koa";
import Router from "koa-router";
import { Controller, Method, GET, POST, PUT, DELETE, PATCH, ALL, Path } from "./src/Decorator";
import { ScanControllerOpts } from "./src/ScanController";
export declare type OtherOpts = {
    logRoute?: boolean;
};
export default function ClassifyKoaRouter(router: Router, scanController: ScanControllerOpts, otherOpts?: OtherOpts): (ctx: ParameterizedContext, next: Next) => Promise<void>;
export { Controller, Method, GET, POST, PUT, DELETE, PATCH, ALL, Path };
