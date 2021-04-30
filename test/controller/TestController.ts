import { Controller, Method } from "../../src/ClassifyKoaRouterDecorator"

@Controller({
    path: '////test//'
})
export default class TestController {
    static staticgetthis(param: any) {
        return param
    }
    static get({ name }: { name: string }) {
        if (!name) {
            '缺少姓名'
        }
        return this.staticgetthis(name)
    }

    getthis(param: any) {
        return param
    }

    callthis() {
        return this.getthis('test this')
    }
}


@Controller({
    path: 'test1'
})
export class Test1 {
    @Method({
        method: 'POST'
    })
    async nostatic(list: any) {
        return list
    }
}

