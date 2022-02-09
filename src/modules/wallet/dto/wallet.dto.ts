import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";

export class RefillWalletDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(10)
    amount: number;
}

export class WalletWithdrawalDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(10)
    amount: number;

    @IsString()
    @IsNotEmpty()
    bankDetailId: string;

    @IsString()
    @IsOptional()
    reason?: string;
}
