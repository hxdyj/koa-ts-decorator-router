"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dealParam = void 0;
var BaseUtil_1 = require("./BaseUtil");
//auto transform param value string to number.
function tryToTransfromStringToNumber(str) {
    var result = str;
    try {
        if (/\./.test(str)) {
            result = parseFloat(str);
        }
        else {
            result = parseInt(str);
        }
    }
    catch (error) { }
    return result;
}
function recursionDealParam(obj) {
    var objType = BaseUtil_1.getType(obj);
    if (objType === "Object" || objType === "Array") {
        Object.keys(obj).forEach(function (key) {
            var val = obj[key];
            if (BaseUtil_1.isNumberString(val)) {
                obj[key] = tryToTransfromStringToNumber(val);
            }
            else {
                recursionDealParam(val);
            }
        });
    }
    else {
        return;
    }
}
function dealParam(ctx) {
    var body = Reflect.get(ctx.request, "body");
    var param = body || ctx.request.query || {};
    var otherOpts = BaseUtil_1.getOtherOpts();
    if (!(param instanceof Array)) {
        //merge body and query param.
        if (BaseUtil_1.getType(body) === "Object") {
            if (otherOpts.assignQuery) {
                Object.assign(param, ctx.request.query);
            }
        }
    }
    if (otherOpts.convertDigital) {
        recursionDealParam(param);
    }
    return param;
}
exports.dealParam = dealParam;
