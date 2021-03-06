"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanControllerAndRegister = void 0;
var BaseUtil_1 = require("./BaseUtil");
var Decorator_1 = require("./Decorator");
var DealParam_1 = require("./DealParam");
var requireAll = require("require-all");
function register(router, controller, isInstance) {
    var _this = this;
    if (isInstance === void 0) { isInstance = false; }
    var currentController = isInstance
        ? Reflect.get(controller, "__proto__")
        : controller;
    Object.getOwnPropertyNames(currentController).forEach(function (key) {
        var value = Reflect.get(currentController, key);
        var excludeKeys = ["length", "prototype", "path", "constructor"];
        if (!excludeKeys.includes(key) && value instanceof Function) {
            var func_1 = value;
            var controllerPath = Reflect.get(isInstance ? currentController.constructor : currentController, "path");
            controllerPath = controllerPath ? "/" + controllerPath + "/" : "/";
            var methodPath = Decorator_1.fixPath(func_1.path || key); // ??????????????????method??????????????????
            var path_1 = controllerPath + methodPath;
            var method_1 = (func_1.method || "GET").toLowerCase();
            if (BaseUtil_1.getOtherOpts().logRoute) {
                console.log(method_1.padEnd(8) + " : " + path_1);
            }
            var routerFunc = Reflect.get(router, method_1);
            routerFunc.call(router, path_1, function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                var beforeMethodCallHookFn, methodConf, hookResult, hookFlag, _a, error_1, param, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            beforeMethodCallHookFn = BaseUtil_1.getOtherOpts().onBeforeCallMethod;
                            if (!(beforeMethodCallHookFn &&
                                typeof beforeMethodCallHookFn === "function")) return [3 /*break*/, 4];
                            methodConf = {
                                fullPath: path_1,
                                method: method_1,
                                customConf: func_1.customConf,
                            };
                            hookResult = beforeMethodCallHookFn(ctx, methodConf);
                            if (!(hookResult instanceof Promise)) return [3 /*break*/, 2];
                            return [4 /*yield*/, hookResult];
                        case 1:
                            _a = _b.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _a = hookResult;
                            _b.label = 3;
                        case 3:
                            hookFlag = _a;
                            if (hookFlag !== true) {
                                ctx.body = hookFlag;
                                return [2 /*return*/];
                            }
                            _b.label = 4;
                        case 4:
                            _b.trys.push([4, 7, , 8]);
                            if (!(func_1.rateLimitInstance && func_1.rateLimitConsumeFn)) return [3 /*break*/, 6];
                            return [4 /*yield*/, func_1.rateLimitConsumeFn.call(null, func_1.rateLimitInstance, ctx)];
                        case 5:
                            _b.sent();
                            _b.label = 6;
                        case 6: return [3 /*break*/, 8];
                        case 7:
                            error_1 = _b.sent();
                            ctx.status = 429;
                            ctx.body = "Too Many Requests";
                            return [3 /*break*/, 8];
                        case 8:
                            if (ctx.status == 429)
                                return [2 /*return*/];
                            param = DealParam_1.dealParam(ctx);
                            return [4 /*yield*/, func_1.call(controller, param, ctx.request, router)];
                        case 9:
                            result = _b.sent();
                            if (result instanceof Promise) {
                                result.catch(function (err) {
                                    return err;
                                });
                            }
                            ctx.body = result;
                            return [2 /*return*/];
                    }
                });
            }); });
        }
    });
}
function registerRoute(router, controller) {
    //????????????????????????
    register(router, controller);
    //????????????????????????
    var instance = new controller.prototype.constructor();
    register(router, instance, true);
}
function scanControllerAndRegister(router, scanControllerOpts) {
    var allControllers = requireAll(scanControllerOpts);
    var controllers = [];
    function recursionGetControllerClass(object) {
        Object.values(object).forEach(function (item) {
            var i = item;
            var keys = Object.getOwnPropertyNames(i);
            var exludeKeys = ["__esModule"];
            if (i.hasOwnProperty("__esModule") &&
                Reflect.get(i, "__esModule") === true) {
                keys.forEach(function (key) {
                    if (!exludeKeys.includes(key)) {
                        controllers.push(Reflect.get(i, key));
                    }
                });
            }
            else {
                recursionGetControllerClass(i);
            }
        });
    }
    recursionGetControllerClass(allControllers);
    controllers.forEach(function (controller) {
        registerRoute(router, controller);
    });
}
exports.scanControllerAndRegister = scanControllerAndRegister;
