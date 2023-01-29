import {DynamicModule, Module, Provider} from '@nestjs/common';
import {IAuthModuleAsyncOptions, IAuthOptions} from "./auth.interface";
import {AUTH_MODULE_OPTIONS} from "./auth.constants";
import {AuthController} from './auth.controller';
import {JwtModule, JwtModuleOptions} from "@nestjs/jwt";

@Module({
    controllers: [AuthController],
    imports: [
        JwtModule.registerAsync({
            inject: [AUTH_MODULE_OPTIONS],
            useFactory: (options: IAuthOptions): JwtModuleOptions => {
                return {
                    secretOrPrivateKey: options.secretKey
                };
            }
        })
    ]
})
export class AuthModule {
    static forRootAsync(options: IAuthModuleAsyncOptions): DynamicModule {
        const AuthOptionsProvider = this.createAsyncOptionsProvider(options);

        return {
            module: AuthModule,
            imports: options.imports,
            providers: [
                AuthOptionsProvider,
            ],
            exports: [
                AuthOptionsProvider,
            ]
        };
    }

    private static createAsyncOptionsProvider(options: IAuthModuleAsyncOptions): Provider {
        return {
            provide: AUTH_MODULE_OPTIONS,
            useFactory: async (...args: any[]) => options.useFactory(...args),
            inject: options.inject || []
        };
    }
}
