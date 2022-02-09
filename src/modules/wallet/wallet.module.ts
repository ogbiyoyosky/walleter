import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankDetailModule } from '../bank-detail/bank-detail.module';
import BankTransfer from '../libs/bank-transfer/bank-transfer';
import { PaymentModule } from '../payment/payment.module';
import { UserModule } from '../user/user.module';
import { WalletController } from './controllers/wallet.controller';
import { Transaction } from './entities/transaction.entity';
import { Wallet } from './entities/wallet.entity';
import { Withdrawal } from './entities/withdrawal.entity';
import { WalletService } from './services/wallet/wallet.service';
import { WithdrawalService } from './services/withdrawal/withdrawal.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Wallet, Transaction, Withdrawal]),
        forwardRef(() => PaymentModule),
        forwardRef(() => UserModule),
        forwardRef(() => BankDetailModule),
    ],
    providers: [
        WalletService,
        WithdrawalService,
        {
            provide: 'BankTransfer',
            useClass: BankTransfer,
        }
    ],
    controllers: [WalletController],
    exports: [WalletService]
})
export class WalletModule {}
