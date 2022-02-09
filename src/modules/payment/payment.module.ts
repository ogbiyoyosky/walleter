import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CardPayment from '../libs/card-payment/cardPayment';
import { UserModule } from '../user/user.module';
import { WalletModule } from '../wallet/wallet.module';
import { PaymentController } from './controllers/payment.controller';
import { Payment } from './entities/payment.entity';
import { CreatePaymentService } from './services/create-payment-service/create-payment.service';
import { PaymentService } from './services/payment-service/payment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    forwardRef(() => UserModule),
    forwardRef(() => WalletModule),
  ],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    PaymentController,
    CreatePaymentService,
    {
      provide: 'CardPayment',
      useClass: CardPayment,
    }
  ],
  exports: [PaymentService, CreatePaymentService,]
})
export class PaymentModule { }
