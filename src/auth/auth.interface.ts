import { ModuleMetadata } from "@nestjs/common";

export interface IAuthOptions {
    secretKey: string
}

export interface IAuthModuleAsyncOptions extends Pick<ModuleMetadata, "imports"> {
    useFactory: (...args: any[]) => Promise<IAuthOptions> | IAuthOptions;
    inject?: any[];
}