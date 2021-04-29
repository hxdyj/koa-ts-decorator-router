import { Next, ParameterizedContext } from "koa";
import Router from "koa-router";
import { Controller, Method } from "./src/ClassifyKoaRouterDecorator";
import { ScanControllerOpts } from "./src/util";
export default function ClassifyKoaRouter(router: Router, scanController: ScanControllerOpts): (ctx: ParameterizedContext, next: Next) => Promise<void>;
export { Controller, Method };
