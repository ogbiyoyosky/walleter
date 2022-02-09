import { InternalServerErrorException } from '@nestjs/common';
import { PaystackChargeWebhookData } from '../../../shared/interfaces/paystack-charge-webhook-data.interface';
import { InitiatedCardPayment, ICardPayment } from './interfaces/CardPayment.interface';

export class CardPaymentContext implements ICardPayment{
	public strategy: ICardPayment;

	constructor(private config: any) {}

	public setStrategy(strategy: ICardPayment) {
		this.strategy = strategy;
	}

	public async initiateCardPayment(
		requestData: any,
	): Promise<InitiatedCardPayment> {
		if (!this.config) {
			const errorMessage = 'Vendor config not set';
			throw new InternalServerErrorException(new Error(errorMessage), errorMessage);
		}

		return this.strategy.initiateCardPayment(requestData);
	}

	public async verifyPayment(
		reference: string,
	): Promise<PaystackChargeWebhookData> {
		if (!this.config) {
			const errorMessage = 'Vendor config not set';
			throw new InternalServerErrorException(new Error(errorMessage), errorMessage);
		}

		return this.strategy.verifyPayment(reference);
	}
}
