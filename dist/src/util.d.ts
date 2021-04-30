import Router from "koa-router";
export declare type ScanControllerOpts = {
    dirname: string;
    filter: RegExp;
};
export declare function scanControllerAndRegister(router: Router, scanControllerOpts: ScanControllerOpts): void;
