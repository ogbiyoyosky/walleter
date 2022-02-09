import {  Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginController } from './controllers/login/login.controller';
import { LoginService } from '../auth/services/login/login.service';
import { UserService } from '../user/services/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [LoginController],
  providers: [LoginService, UserService, Logger]
})
export class AuthModule {}
