import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SuccessResponse } from '../../../../shared/utils/response.utils';
import { CreateUserDto } from '../../dto/create-user.dto';
import { CreateUserService } from '../../services/create-user/create-user.service';

@Controller('/api/users')
export class UserController {
    constructor(private readonly createUserService: CreateUserService){}

    @Post()
    @HttpCode(201)
    public async registerUser(@Body() data: CreateUserDto) {
        const user = await this.createUserService.execute(data);

        return SuccessResponse("Successfully created an account", user);
    }
    

}
