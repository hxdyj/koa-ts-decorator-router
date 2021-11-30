import {
  Controller,
  CustomConf,
  GET,
  Method,
  Path,
  POST,
} from "../../src/Decorator";

@Controller({
  path: "////test//",
})
export default class TestController {
  static staticgetthis(param: any) {
    return param;
  }
  static get({ name }: { name: string }) {
    if (!name) {
      ("缺少姓名");
    }
    return this.staticgetthis(name);
  }

  getthis(param: any) {
    return param;
  }

  @GET()
  @CustomConf({
    test: true,
  })
  callthis() {
    return this.getthis("test this");
  }
}

/* @Controller({
    path: 'test1'
}) */
@Path("test1")
export class Test1 {
  @POST()
  @Path("nostatic1")
  async nostatic(list: any) {
    return list;
  }
}
