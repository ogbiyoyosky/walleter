import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AccountNumberVerification from '../libs/account-verification/account-verification';
import TransferRecipient from '../libs/transfer-recipient/transfer-recipient';
import { UserModule } from '../user/user.module';
import { BankDetailController } from './controllers/bank-detail.controller';
import { BankDetail } from './entities/bank-detail.entity';
import { BankDetailService } from './services/bank-detail-service/bank-detail.service';
import { CreateBankDetailService } from './services/create-bank-detail-service/create-bank-detail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BankDetail]),
    forwardRef(() => UserModule),
  ],
  controllers: [BankDetailController],
  providers: [
    BankDetailService, 
    BankDetailController,
    CreateBankDetailService,
    {
      provide: 'TransferRecipient',
      useClass: TransferRecipient,
    },
    {
      provide: 'AccountNumberVerification',
      useClass: AccountNumberVerification,
    },
  ],
  exports: [BankDetailService, CreateBankDetailService]
})
export class BankDetailModule {}
