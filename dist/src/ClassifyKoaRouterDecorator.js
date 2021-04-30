"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Method = exports.Controller = exports.fixPath = void 0;
var trimChars_1 = __importDefault(require("lodash/fp/trimChars"));
function fixPath(path) {
    var result = path || '';
    return trimChars_1.default('/', result);
}
exports.fixPath = fixPath;
function Controller(conf) {
    return function (target) {
        Object.assign(target, {
            path: fixPath(conf === null || conf === void 0 ? void 0 : conf.path)
        });
    };
}
exports.Controller = Controller;
function Method(conf) {
    return function (target, propertyKey, descriptor) {
        var path = fixPath((conf === null || conf === void 0 ? void 0 : conf.path) || propertyKey);
        Object.assign(target[propertyKey], {
            path: path,
            method: (conf === null || conf === void 0 ? void 0 : conf.method) || 'get',
            rateLimitConsumeFn: conf === null || conf === void 0 ? void 0 : conf.rateLimitConsumeFn,
            rateLimitInstance: conf === null || conf === void 0 ? void 0 : conf.rateLimitInstance
        });
    };
}
exports.Method = Method;
