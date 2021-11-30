import { RateLimiterStoreAbstract } from "rate-limiter-flexible";
import { ParameterizedContext } from "koa";
import trimChars from "lodash/fp/trimChars";
type ControllerDecoratorConf = {
  path?: string;
};

export type MethodType = "GET" | "PUT" | "POST" | "DELETE" | "PATCH" | "ALL";

type MethodDecoratorConf<T> = {
  path?: string;
  method?: MethodType;
  customConf?: T;
  rateLimitInstance?: RateLimiterStoreAbstract;
  rateLimitConsumeFn?: {
    (
      rateLimitInstance: RateLimiterStoreAbstract,
      ctx: ParameterizedContext,
    ): Promise<any>;
  };
};

export type ControllerType = Function & ControllerDecoratorConf;
export type ControllerMethod<T> = Function &
  MethodDecoratorConf<T> & {
    method: MethodType;
  };

export function fixPath(path: string | undefined) {
  let result = path || "";
  return trimChars("/", result);
}

export function Controller(conf?: ControllerDecoratorConf) {
  return function (target: Function) {
    Object.assign(target, {
      path: fixPath(conf?.path) || Reflect.get(target, "path"),
    });
  };
}
export function Method<T>(conf?: MethodDecoratorConf<T>) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    let value = target[propertyKey];
    let path = fixPath(conf?.path || value.path || propertyKey);
    Object.assign(target[propertyKey], {
      path: path,
      method: conf?.method || value.method || "GET",
      rateLimitConsumeFn: conf?.rateLimitConsumeFn || value.rateLimitConsumeFn,
      rateLimitInstance: conf?.rateLimitInstance || value.rateLimitInstance,
      customConf: conf?.customConf || value.customConf,
    });
  };
}

export function Path(path: string) {
  return function (
    target: any,
    propertyKey?: string,
    descriptor?: PropertyDescriptor,
  ) {
    if (propertyKey && descriptor) {
      Method({ path })(target, propertyKey, descriptor);
    } else {
      Controller({ path })(target);
    }
  };
}

export function CustomConf<T>(customConf: T) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    Method({ customConf })(target, propertyKey, descriptor);
  };
}

export function POST(path?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    Method({ method: "POST", path })(target, propertyKey, descriptor);
  };
}

export function GET(path?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    Method({ method: "GET", path })(target, propertyKey, descriptor);
  };
}

export function PUT(path?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    Method({ method: "PUT", path })(target, propertyKey, descriptor);
  };
}

export function DELETE(path?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    Method({ method: "DELETE", path })(target, propertyKey, descriptor);
  };
}

export function PATCH(path?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    Method({ method: "PATCH", path })(target, propertyKey, descriptor);
  };
}

export function ALL(path?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    Method({ method: "ALL", path })(target, propertyKey, descriptor);
  };
}
