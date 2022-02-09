import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class CreateBankDetailDto {  
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  bankCode: string;
}

export class ResolveAccountNumberDto {  
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  bankCode: string;
}
