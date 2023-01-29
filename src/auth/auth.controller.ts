import {Controller, Get, Inject} from '@nestjs/common';
import {AUTH_MODULE_OPTIONS} from "./auth.constants";
import {IAuthOptions} from "./auth.interface";

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AUTH_MODULE_OPTIONS) private readonly options: IAuthOptions
    ) {
    }

    @Get("")
    index() {
        return 'Hello, Secret key is ' + this.options.secretKey;
    }
}
