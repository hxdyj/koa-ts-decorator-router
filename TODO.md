* 递归处理数字
* 将class 非static方法解析成路由

 let instance: any
    eval(`instance  = new ${controller.prototype.constructor}()`)
    if (instance) {
        let b = Object.getOwnPropertyNames(Reflect.get(instance, '__proto__'))
    }