"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOtherOpts = exports.isNumberString = exports.getType = exports.ObjectToString = void 0;
exports.ObjectToString = Object.prototype.toString;
function getType(object) {
    var result = exports.ObjectToString.call(object);
    return result.slice(8, result.length - 1);
}
exports.getType = getType;
function isNumberString(input) {
    return getType(input) === 'String' && input.length <= 14 && /^(-|\+)?(\d+(\.\d+)|(\d*))$/g.test(input);
}
exports.isNumberString = isNumberString;
function getOtherOpts() {
    return Reflect.get(global, '__otherOpts') || {};
}
exports.getOtherOpts = getOtherOpts;
//# sourceMappingURL=BaseUtil.js.map