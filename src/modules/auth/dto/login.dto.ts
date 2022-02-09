import { IsEmail, IsNotEmpty, IsOptional, isString, IsString } from "class-validator";

export class LoginDto {

    @IsString()
    @IsNotEmpty()
    password?: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email?: string;
}