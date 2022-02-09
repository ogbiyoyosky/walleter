import { BadRequestException, ConflictException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InitiatedPayment } from '../../../payment/interfaces/payment.interface';
import { Repository } from 'typeorm';
import { Wallet } from '../../entities/wallet.entity';
import { UpdateWalletBalanceInput } from '../../interfaces/wallet.interface';
import { ServiceMethodOptions } from '../../../../shared/interfaces/service-method-options.interface';
import { CreatePaymentService } from '../../../payment/services/create-payment-service/create-payment.service';
import { Transaction } from '../../entities/transaction.entity';
import { TransactionFactory } from '../../factories/transaction.factory';
import BankTransfer from '../../../libs/bank-transfer/bank-transfer';
import { BankDetailService } from '../../../bank-detail/services/bank-detail-service/bank-detail.service';
import { WithdrawalService } from '../withdrawal/withdrawal.service';
import { PaymentGateway } from '../../../../shared/enums/payment-gateways.enum';


@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(Wallet)private readonly walletRepo: Repository<Wallet>,
        @InjectRepository(Transaction)private readonly transactionRepo: Repository<Transaction>,
        @Inject(forwardRef(() => CreatePaymentService)) private readonly createPaymentService: CreatePaymentService,
        @Inject('BankTransfer') private readonly bankTransfer: BankTransfer,
        @Inject(forwardRef(() => BankDetailService)) private readonly bankDetailService: BankDetailService,
        @Inject(forwardRef(() => WithdrawalService)) private readonly withdrawalService: WithdrawalService,
    ) {
        bankTransfer.setConfig({ vendor: PaymentGateway.PAYSTACK });
    }

   async verify(id: string): Promise<Wallet> {
        const wallet = await this.walletRepo.findOne({ where: { id } });
        if (!wallet) throw new NotFoundException('Wallet not found');
        return wallet;
   }

    async save(wallet: Wallet): Promise<Wallet> {
        return await this.walletRepo.save(wallet);
    }

    async update(wallet: Wallet, data) {
        return await this.walletRepo.save({ ...wallet,...data });
    }

    async initiateRefill(input: any, options: ServiceMethodOptions): Promise<InitiatedPayment> {
        return this.createPaymentService.initiatePayment({
            amount: input.amount,
            userId: options.currentUser.id,
            email: options.currentUser.email,
            metadata: {
                walletId: options.currentUser.wallet.id,
            }
        });
    }

    async withdraw(input: any,  options: ServiceMethodOptions): Promise<Wallet> {
        const { currentUser } = options;

        let wallet = await this.verify(currentUser.wallet.id);
        if (Number(wallet.balance) < input.amount) {
            throw new BadRequestException('Insufficient funds');
        }

        const bankDetail = await this.bankDetailService.verify(input.bankDetailId);

        const transferResponse = await this.bankTransfer.initiateSingleTransfer({
            amount: input.amount,
            recipientCode: bankDetail.recipientCode,
            reason: input.reason || 'Wallet payout',
        });

        await this.withdrawalService.create({
            walletId: wallet.id,
            amount: input.amount,
            userId: currentUser.id,
            bankDetailId: input.bankDetail,
        });

        await this.debit(wallet.id, {
            amount: input.amount,
            remark: input.reason,
        });

        return this.save({ ...wallet, balance: wallet.balance - input.amount });
    }

    async credit(id: string, input: UpdateWalletBalanceInput): Promise<Wallet> {
        let wallet = await this.verify(id);
        const balance = Number(wallet.balance) + input.amount;
        console.log({input, id, wallet, balance});
        await this.walletRepo.save({ ...wallet, balance });
        const transaction = TransactionFactory.createNew({
            walletId: wallet.id,
            amount: input.amount,
            remark: input.remark || 'Wallet refill',
        });
        await this.transactionRepo.save(transaction);
        return wallet;
    }

    async debit(id: string, input: UpdateWalletBalanceInput): Promise<Wallet> {
        let wallet = await this.verify(id);
        const balance = Number(wallet.balance) + input.amount;
        wallet = await this.update(wallet, { balance });
        const transaction = TransactionFactory.createNew({
            walletId: wallet.id,
            amount: -input.amount,
            remark: input.remark || 'Wallet payout',
        });
        await this.transactionRepo.save(transaction);
        return wallet;
    }
}
