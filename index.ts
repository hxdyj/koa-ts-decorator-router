import { Next, ParameterizedContext } from "koa";
import Router from "koa-router";
import {
  Controller,
  Method,
  GET,
  POST,
  PUT,
  DELETE,
  PATCH,
  ALL,
  Path,
  MethodType,
  CustomConf,
} from "./src/Decorator";
import {
  scanControllerAndRegister,
  ScanControllerOpts,
} from "./src/ScanController";

type BeforeCallMethodConf<T> = {
  fullPath: string;
  method: MethodType;
  customConf?: T;
};

type OnBeforeCallMethodFunc<T> = {
  (ctx: ParameterizedContext, methodConf: BeforeCallMethodConf<T>): unknown;
};

export type OtherOpts<T> = {
  assignQuery?: boolean;
  logRoute?: boolean;
  /**
   * if return ture, will be call method. else not call method and ctx.body will be set to you function return value.
   *  */
  onBeforeCallMethod?: OnBeforeCallMethodFunc<T>;
};

export default function ClassifyKoaRouter<T>(
  router: Router,
  scanController: ScanControllerOpts,
  otherOpts?: OtherOpts<T>,
) {
  Object.assign(global, {
    __otherOpts: otherOpts || {},
  });
  scanControllerAndRegister(router, scanController);

  // tansfor rotuer to next.
  return async function (ctx: ParameterizedContext, next: Next) {
    let fn = router.routes();
    await fn(
      ctx as unknown as ParameterizedContext<
        any,
        Router.IRouterParamContext<any, {}>,
        any
      >,
      () => {
        return Promise.resolve();
      },
    );
    await next();
  };
}
export {
  Controller,
  Method,
  GET,
  POST,
  PUT,
  DELETE,
  PATCH,
  ALL,
  Path,
  CustomConf,
  BeforeCallMethodConf,
};
