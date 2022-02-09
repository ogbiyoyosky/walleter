import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Payment } from '../../entities/payment.entity';
import { PaymentUpdateInput } from '../../interfaces/payment.interface';
import { WalletService } from '../../../wallet/services/wallet/wallet.service';
import CardPayment from '../../../libs/card-payment/cardPayment';
import { PaystackChargeWebhookData } from '../../../../shared/interfaces/paystack-charge-webhook-data.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentStatus } from '../../enum/payment.enum';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)private readonly paymentRepo: Repository<Payment>,
        @Inject(forwardRef(() => WalletService)) private readonly walletService: WalletService,
        @Inject('CardPayment') private readonly cardPayment: CardPayment,
    ) { }

    /**
     * Fetches all payments associated with a user
     * 
     * @param { string } id - The ID of an user
     */
    async fetchByUserID(userId: string): Promise<Payment[]> {
        return this.paymentRepo.find({ userId });
    }

    async findByReference(reference: string): Promise<Payment> {
        const payment = this.paymentRepo.findOne({ where: { reference } })
        if (!payment) throw new NotFoundException('Payment not found');
        return payment;
    }

    async handlePaymentSuccess(input: PaymentUpdateInput): Promise<Payment> {
        const payment = await this.findByReference(input.reference);
        if (payment?.status !== PaymentStatus.PENDING) return payment;
        if (payment.metadata?.walletId) {
            await this.walletService.credit(payment.metadata.walletId, {
                amount: payment.amount,
            });
        }

        delete payment.metadata;
        return this.paymentRepo.save({ ...payment, status: PaymentStatus.SUCCESS });
    }

    async handlePaymentFailure(input: PaymentUpdateInput): Promise<Payment> {
        const payment = await this.findByReference(input.reference);
        if (payment?.status == PaymentStatus.FAILURE) return payment;
        let failureReason = input.message;
        if ((input.amount / 100) !== payment.amount) {
            failureReason = 'Wrong Amount Paid';
        }

        return this.paymentRepo.save({ ...payment, status: PaymentStatus.FAILURE, failureReason });
    }

    /**
     * Handles the webhook data from paystack
     */
    async updatePayment(input: any): Promise<Payment> {
        try {
            if (input.status === 'failure') {
                return this.handlePaymentFailure(input as any);
            } else if (input.status === 'success') {
                return this.handlePaymentSuccess(input as any);
            }
        } catch (error) {
            throw error;
        }
    }

    async save(payment: Payment): Promise<Payment> {
        return this.paymentRepo.save(payment);
    }

    /**
     * Verifies payment's status
     * 
     * @param { string } reference - A payment reference
     */
    async verifyPayment(reference: string): Promise<any> {
        const payment = await this.findByReference(reference);

        if (payment.status == 'success' || payment.status == 'failure') {
            return payment;
        }

        const paystackResponse = await this.cardPayment.verifyPayment(reference);
        return this.updatePayment(paystackResponse);
    }
}
