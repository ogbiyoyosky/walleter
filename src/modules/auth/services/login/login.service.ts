import {  Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../../dto/login.dto';
import { User } from '../../../user/entities/user.entity';
import { UserService } from '../../../user/services/user/user.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UserFactory } from '../../../user/factories/user.factor';



@Injectable()
export class LoginService {
    constructor(
        private readonly userService: UserService, 
        private readonly config: ConfigService, 
       ){}

    public async execute(data: LoginDto) {
      return await this.processPasswordAuthentication(data);  
    }


    private async processPasswordAuthentication({ email, password }: LoginDto) {
        const user = await this.userService.findByEmail( email );

        if (!user) throw new UnauthorizedException("Invalid credentials");

        const isValidPassword = await user.comparePassword(password);

        if(!isValidPassword) throw new UnauthorizedException("Invalid credentials");

        return this.generateJwtToken(user);

    }

    public async generateJwtToken(user: User): Promise<string> {
        const userJwtAttributePayload = UserFactory.generateUserForJwt(user);

        return jwt.sign(
            userJwtAttributePayload,
            this.config.get('jwt.JWT_AUTH_SECRET'),
            { expiresIn: this.config.get('jwt.EXPIRES_IN') }
          );
    }


}
