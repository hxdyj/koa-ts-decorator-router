# [koa-ts-decorator-router](https://github.com/hxdyj/koa-ts-decorator-router)

> You can via typescript class and decorator to difine your [koa-router](https://github.com/koajs/router)'s routes middleware for [Koa](https://github.com/koajs/koa).


## Features

You can define your koa-router's routes by es6 class. like this
``` ts
@Controller({
    path: 'user'
})
export class UserController {

    login({ name }: User) {
        console.log('param', name);
        return name
    }

    @Method({
        path:'myRegister',
        method: "post"
    })
    async register({ name, pass }: User) {
        const user = new User()
        user.name = name
        user.pass = pass
        await mysql().getRepository(User).save(user)
        return user
    }
}
```
This will be transfer to koa-route like:
``` js
const Router = require('@koa/router');
const router = new Router();

router.get('/user/login',async (ctx, next) => {
    ctx.body = name;//name is abave class UserController static login returned
    await next()
})

router.post('/user/myRegister',async (ctx, next) => {
    ctx.body = user;
    await next()
})

```

## Installation

```bash
# npm .. 
npm i koa-ts-decorator-router
# yarn .. 
yarn add koa-ts-decorator-router
```

## API

### ClassifyKoaRouter ⏏
**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| [router] | <code>Object</code> |  instance of koa-router|
| [scanController] | <code>Ojbect</code> | scan controller config |
| [otherOpts] | <code>Ojbect</code> | other config |

#### scanController Type
```ts
type ScanControllerOpts = {
    dirname: string,  // your Controller ts file dir
    filter: RegExp,  //filter you need regist to koa-router
}
```
#### otherOpts Type
```ts
 type OtherOpts = {
    logRoute?:boolean // console.log register route, while you debug app you can turn on this config.
}
```

### Controller Decorator ([controllerDecoratorOpts])
#### controllerDecoratorOpts Type
```ts
type ControllerDecoratorConf = {
    path?: string
}
```
* Notice: if you not offer path, while register koa-route will it default value will be `/`.

### Controller Method Decorator ([methodDecoratorOpts])
```ts
type MethodDecoratorConf = {
    path?: string,
    method?: MethodType,
    rateLimitInstance?:RateLimiterStoreAbstract,
    rateLimitConsumeFn?:{
       (rateLimitInstance:RateLimiterStoreAbstract,ctx:Koa.ParameterizedContext): Promise<any>;
    };
}
```
If you offer [RateLimiterStoreAbstract](https://github.com/animir/node-rate-limiter-flexible#basic-options), and `rateLimitConsumeFn` you can define you function to consume rateLimit.

Controller 's path and Method's path composition to koa-route's path.

`eg1`:
```ts
export class UserController {
    login({ name }: User) {
        console.log('param', name);
        return name
    }
}
```
koa-route will be `router.get(/login)`

`eg2`:

```ts
@Controller({
    path:'user'
})
export class UserController {
    login({ name }: User) {
        console.log('param', name);
        return name
    }
}
```
koa-route will be `router.get(/user/login)`

`eg3`:

```ts
export class UserController {
    @Method({
        method:'post'
    })
    login({ name }: User) {
        console.log('param', name);
        return name
    }
}
```
koa-route will be `router.post(/login)`

`eg5`:

```ts
@Controller({
    path:'////user//'
})
export class UserController {
    @Method({
        method:'post',
        path:'//login////'
    })
    login({ name }: User) {
        console.log('param', name);
        return name
    }
}
```
koa-route will be `router.post(/user/login)`
`eg6`:

```ts
@Controller({
    path:'user'
})
export class UserController {
    @Method({
        method:'post',
        path:'login/:id'
    })
    login({ name }: User) {
        console.log('param', name);
        return name
    }
}
```
koa-route will be `router.post(/user/login/:id)`

### Controller Method Param

* request.body is `Array`, It will be call `login(request.body, ctx.request)`
* request.body is `Object`,It will be call `login(Object.assign(request.body,request.query), ctx.request)`
* If method `First param` is `Array` or `Object` ,we will try to   auto recursion transform param value, convert `string` to `number` or `float`.

**Example**  
Basic usage:

`The directory structure`
```
.
├── controllers
│   ├── FileController.ts
│   └── UserController.ts
├── index.ts
```

`index.ts`
```ts
import Koa from 'koa'
import Router from 'koa-router'
import KoaBody from 'koa-body'

app.use(KoaBody({
    multipart: true
}))

const router = new Router()

app.use(ClassifyKoaRouter(
    router,
    {
        dirname: path.join(__dirname + './controllers'),  // your Controller ts file dir
        filter: /(.*Controller)\.ts$/,  //filter you need regist to koa-router
    }
))
```
`UserController.ts`
```ts
@Controller({
    path: 'user'
})
export class UserController {

    login({ name }: User) {
        console.log('param', name);
        return name
    }

    @Method({
        path:'myRegister',
        method: "post"
    })
    async register({ name, pass }: User) {
        const user = new User()
        user.name = name
        user.pass = pass
        await mysql().getRepository(User).save(user)
        return user
    }
}
```
Upload usage:

`FileController`
```ts
@Controller({
    path: 'file'
})
export class FileController {
    @Method({
        method: 'post'
    })
    upload(params:any,{ files }: { files:Files }) {
        return saveFiles(files).map(i=>{
            delete i.filePath
            return i
        })
    }
}
```

## Notice

* Use this lib must be cooperation with [koa-body](https://github.com/dlau/koa-body) and [koa-router](https://github.com/koajs/router).

* Because lib use typescript decorator, you need allow options at `tsconfig.json`

```json
"experimentalDecorators": true, /* Enables experimental support for ES7 decorators. */
"emitDecoratorMetadata": true, /* Enables experimental support for emitting type metadata for decorators. */
```

## Contributing

Please submit all issues and pull requests to the [hxdyj/koa-ts-decorator-router](https://github.com/hxdyj/koa-ts-decorator-router) repository!

## Support

If you have any problem or suggestion please open an issue [here](https://github.com/hxdyj/koa-ts-decorator-router/issues).

### License

[MIT](LICENSE)