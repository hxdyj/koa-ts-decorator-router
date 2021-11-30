"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL = exports.PATCH = exports.DELETE = exports.PUT = exports.GET = exports.POST = exports.CustomConf = exports.Path = exports.Method = exports.Controller = exports.fixPath = void 0;
var trimChars_1 = __importDefault(require("lodash/fp/trimChars"));
function fixPath(path) {
    var result = path || "";
    return trimChars_1.default("/", result);
}
exports.fixPath = fixPath;
function Controller(conf) {
    return function (target) {
        Object.assign(target, {
            path: fixPath(conf === null || conf === void 0 ? void 0 : conf.path) || Reflect.get(target, "path"),
        });
    };
}
exports.Controller = Controller;
function Method(conf) {
    return function (target, propertyKey, descriptor) {
        var value = target[propertyKey];
        var path = fixPath((conf === null || conf === void 0 ? void 0 : conf.path) || value.path || propertyKey);
        Object.assign(target[propertyKey], {
            path: path,
            method: (conf === null || conf === void 0 ? void 0 : conf.method) || value.method || "GET",
            rateLimitConsumeFn: (conf === null || conf === void 0 ? void 0 : conf.rateLimitConsumeFn) || value.rateLimitConsumeFn,
            rateLimitInstance: (conf === null || conf === void 0 ? void 0 : conf.rateLimitInstance) || value.rateLimitInstance,
            customConf: (conf === null || conf === void 0 ? void 0 : conf.customConf) || value.customConf,
        });
    };
}
exports.Method = Method;
function Path(path) {
    return function (target, propertyKey, descriptor) {
        if (propertyKey && descriptor) {
            Method({ path: path })(target, propertyKey, descriptor);
        }
        else {
            Controller({ path: path })(target);
        }
    };
}
exports.Path = Path;
function CustomConf(customConf) {
    return function (target, propertyKey, descriptor) {
        Method({ customConf: customConf })(target, propertyKey, descriptor);
    };
}
exports.CustomConf = CustomConf;
function POST(path) {
    return function (target, propertyKey, descriptor) {
        Method({ method: "POST", path: path })(target, propertyKey, descriptor);
    };
}
exports.POST = POST;
function GET(path) {
    return function (target, propertyKey, descriptor) {
        Method({ method: "GET", path: path })(target, propertyKey, descriptor);
    };
}
exports.GET = GET;
function PUT(path) {
    return function (target, propertyKey, descriptor) {
        Method({ method: "PUT", path: path })(target, propertyKey, descriptor);
    };
}
exports.PUT = PUT;
function DELETE(path) {
    return function (target, propertyKey, descriptor) {
        Method({ method: "DELETE", path: path })(target, propertyKey, descriptor);
    };
}
exports.DELETE = DELETE;
function PATCH(path) {
    return function (target, propertyKey, descriptor) {
        Method({ method: "PATCH", path: path })(target, propertyKey, descriptor);
    };
}
exports.PATCH = PATCH;
function ALL(path) {
    return function (target, propertyKey, descriptor) {
        Method({ method: "ALL", path: path })(target, propertyKey, descriptor);
    };
}
exports.ALL = ALL;
