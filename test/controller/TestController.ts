import { Controller, Method } from "../../src/ClassifyKoaRouterDecorator"

@Controller({
    path: '////test//'
})
export default class TestController {
    static get({ name }: {name:string}) {
        if(!name){
            '缺少姓名'
        }
        return name
    }
}


@Controller({
    path:'test1'
})
export class Test1 {
    @Method({
        method:"post"
    })
    async nostatic(list:any){
        return list
    }
}

