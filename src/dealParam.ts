import { ParameterizedContext } from "koa"
import { getType,isNumberString } from "./baseUtil"
//auto transform param value string to number.
function tryToTransfromStringToNumber(str:string):string|number{
    let result:string|number = str
        try {
            if (/\./.test(str)) {
                result = parseFloat(str)
            } else {
                result = parseInt(str)
            }
        } catch (error) {
        }
    return result
}

function recursionDealParam(obj:any){
    let objType = getType(obj)
    if(objType==='Object'||objType==='Array'){
        Object.keys(obj).forEach(key => {
            let val = obj[key]
            if(isNumberString(val)){
                obj[key] = tryToTransfromStringToNumber(val)
            }else{
                recursionDealParam(val)
            }
        })
    }else{
        return
    }
}
export function  dealParam(ctx:ParameterizedContext) {
    let body = Reflect.get(ctx.request,'body')
    let param = body || ctx.request.query || {}
    if (!(param instanceof Array)) {
        //merge body and query param.
        if(getType(body)==='Object'){
            Object.assign(param, ctx.request.query)
        }
    }
    recursionDealParam(param)
    return param
}
