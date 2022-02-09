import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as randomstring from 'randomstring';
import { InitiatePaymentInput, InitiatedPayment } from '../../interfaces/payment.interface';
import CardPayment from '../../../libs/card-payment/cardPayment';
import { ServiceMethodOptions } from '../../../../shared/interfaces/service-method-options.interface';
import { PaymentFactory } from '../../factories/payment.factory';
import { InitiatedCardPayment } from '../../../libs/card-payment/interfaces/CardPayment.interface';
import { PaymentService } from '../payment-service/payment.service';
import { PaymentGateway } from '../../../../shared/enums/payment-gateways.enum';

@Injectable()
export class CreatePaymentService {
    constructor(
        @Inject('CardPayment') private readonly cardPayment: CardPayment,
        @Inject(forwardRef(() => PaymentService)) private readonly paymentService: PaymentService,
    ) {
        cardPayment.setConfig({ vendor: PaymentGateway.PAYSTACK });
    }

    /**
     * process card payment
     */
    private async processCardPayment(input: InitiatePaymentInput): Promise<InitiatedCardPayment> {
        const paymentResponseData = await this.cardPayment.initiateCardPayment({
            email: input.email,
            amount: input.amount,
            reference: input.reference,
            metadata: input.metadata,
        });

        return paymentResponseData;
    }

    /**
     * Initiates a payment for an order
     */
    public async initiatePayment(input: InitiatePaymentInput, metadata?: any, options?: ServiceMethodOptions): Promise<InitiatedPayment> {
        const reference = randomstring.generate(32);
        const paymentInitiationResponse = await this.processCardPayment({ ...input, reference, });
        const payment = PaymentFactory.createNew({ ...input, reference: paymentInitiationResponse.reference });
        await this.paymentService.save(payment);

        return {
            reference,
            paymentUrl: paymentInitiationResponse.authorizationUrl,
            status: payment.status,
        }
    }
}
