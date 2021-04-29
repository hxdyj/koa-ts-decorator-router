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
var ClassifyKoaRouterDecorator_1 = require("./ClassifyKoaRouterDecorator");
var requireAll = require('require-all');
function registerRoute(router, controller) {
    var _this = this;
    Object.getOwnPropertyNames(controller).forEach(function (key) {
        var value = Reflect.get(controller, key);
        var excludeKeys = ['length', 'prototype', 'path'];
        if (!excludeKeys.includes(key) && value instanceof Function) {
            var func_1 = value;
            var controllerPath = Reflect.get(controller, 'path');
            controllerPath = controllerPath ? '/' + controllerPath + '/' : '/';
            var methodPath = ClassifyKoaRouterDecorator_1.fixPath(func_1.path || key); // 没有写注解的method默认取方法名
            var path = controllerPath + methodPath;
            router[func_1.method || 'get'](path, function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                var error_1, body, param, paramType, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            if (!(func_1.rateLimitInstance && func_1.rateLimitConsumeFn)) return [3 /*break*/, 2];
                            return [4 /*yield*/, func_1.rateLimitConsumeFn.call(null, func_1.rateLimitInstance, ctx)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            ctx.status = 429;
                            ctx.body = 'Too Many Requests';
                            return [3 /*break*/, 4];
                        case 4:
                            if (ctx.status == 429)
                                return [2 /*return*/];
                            body = Reflect.get(ctx.request, 'body');
                            param = body || ctx.request.query || {};
                            if (!(param instanceof Array)) {
                                if (Object.prototype.toString.call(body) === '[object Object]') {
                                    Object.assign(param, ctx.request.query);
                                }
                            }
                            paramType = Object.prototype.toString.call(param);
                            if (paramType === '[object Object]' || paramType === '[object Array]') {
                                Object.keys(param).forEach(function (key) {
                                    var val = param[key];
                                    //auto transform param value string to number.
                                    if (Object.prototype.toString.call(val) === "[object String]" && /^(-|\+)?\d+\.?\d*$/g.test(val)) {
                                        try {
                                            if (/\./.test(val)) {
                                                param[key] = parseFloat(val);
                                            }
                                            else {
                                                param[key] = parseInt(val);
                                            }
                                        }
                                        catch (error) {
                                        }
                                    }
                                });
                            }
                            return [4 /*yield*/, func_1.call(null, param, ctx.request)];
                        case 5:
                            result = _a.sent();
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
function scanControllerAndRegister(router, scanControllerOpts) {
    var allControllers = requireAll(scanControllerOpts);
    var controllers = [];
    function recursionGetControllerClass(object) {
        Object.values(object).forEach(function (item) {
            var i = item;
            if (i.hasOwnProperty('default') && i.hasOwnProperty('__esModule') && Reflect.get(i, '__esModule') === true) {
                controllers.push(Reflect.get(i, 'default'));
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
