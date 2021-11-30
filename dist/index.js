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
exports.CustomConf = exports.Path = exports.ALL = exports.PATCH = exports.DELETE = exports.PUT = exports.POST = exports.GET = exports.Method = exports.Controller = void 0;
var Decorator_1 = require("./src/Decorator");
Object.defineProperty(exports, "Controller", { enumerable: true, get: function () { return Decorator_1.Controller; } });
Object.defineProperty(exports, "Method", { enumerable: true, get: function () { return Decorator_1.Method; } });
Object.defineProperty(exports, "GET", { enumerable: true, get: function () { return Decorator_1.GET; } });
Object.defineProperty(exports, "POST", { enumerable: true, get: function () { return Decorator_1.POST; } });
Object.defineProperty(exports, "PUT", { enumerable: true, get: function () { return Decorator_1.PUT; } });
Object.defineProperty(exports, "DELETE", { enumerable: true, get: function () { return Decorator_1.DELETE; } });
Object.defineProperty(exports, "PATCH", { enumerable: true, get: function () { return Decorator_1.PATCH; } });
Object.defineProperty(exports, "ALL", { enumerable: true, get: function () { return Decorator_1.ALL; } });
Object.defineProperty(exports, "Path", { enumerable: true, get: function () { return Decorator_1.Path; } });
Object.defineProperty(exports, "CustomConf", { enumerable: true, get: function () { return Decorator_1.CustomConf; } });
var ScanController_1 = require("./src/ScanController");
function ClassifyKoaRouter(router, scanController, otherOpts) {
    Object.assign(global, {
        __otherOpts: otherOpts || {},
    });
    ScanController_1.scanControllerAndRegister(router, scanController);
    // tansfor rotuer to next.
    return function (ctx, next) {
        return __awaiter(this, void 0, void 0, function () {
            var fn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fn = router.routes();
                        return [4 /*yield*/, fn(ctx, function () {
                                return Promise.resolve();
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, next()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
}
exports.default = ClassifyKoaRouter;
