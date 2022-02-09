import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { LoginService } from 'src/modules/auth/services/login/login.service';
import { SuccessResponse } from 'src/shared/utils/response.utils';

@Controller('api/login')
export class LoginController {
    constructor(private readonly loginUserService: LoginService ){}

    @Post()
    @HttpCode(200)
    public async loginUser(@Body() data: LoginDto) {
        const accessToken = await this.loginUserService.execute(data);

        return SuccessResponse("successfully logged in", {
            accessToken 
        });
    }
}
