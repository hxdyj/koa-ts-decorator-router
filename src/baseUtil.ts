import { OtherOpts } from "../index"

export const ObjectToString = Object.prototype.toString

export function getType(object:any):string {
    let result = ObjectToString.call(object)
    return result.slice(8,result.length-1)
}

export function isNumberString(input:any):boolean {
    return  getType(input)==='String' && /^(-|\+)?\d+\.?\d*$/g.test(input)
}


export function getOtherOpts():OtherOpts{
    return Reflect.get(global,'__otherOpts') 
}