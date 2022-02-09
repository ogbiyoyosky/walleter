import axios from 'axios';
import { PaystackChargeWebhookData } from '../../../../shared/interfaces/paystack-charge-webhook-data.interface';
import {
	ICardPayment, InitiatedCardPayment,
} from '../interfaces/CardPayment.interface';

export class PaystackCardPayment implements ICardPayment {
	constructor(private config: any) {}

	public async initiateCardPayment(requestData: any): Promise<InitiatedCardPayment> {
		const { secretKey, endpoints } = this.config;
		let { metadata } = requestData;
		const {
			email,
			amount,
			reference,
		} = requestData;

		if (!metadata) {
			metadata = {};
		}

		const payloadData = {
			email,
			metadata,
			reference,
			amount: amount * 100,
			channel: ['card'],
			currency: 'NGN',
			callback_url: `${process.env.FRONTEND_URL}/payment-verification`,
		};
		try {
			if (!payloadData.channel) {
				delete payloadData.channel;
			}

			const response: any = await axios({
				method: 'post',
				url: endpoints.initiatePayment,
				data: payloadData,
				headers: {
					authorization: `Bearer ${secretKey}`,
				},
			});
			const { data } = response.data;

			return {
				authorizationUrl: data.authorization_url,
				accessCode: data.access_code,
				reference: data.reference,
			};
		} catch (error) {
			throw error;
		}
	}

	public async verifyPayment(reference: string): Promise<PaystackChargeWebhookData> {
		const { secretKey, endpoints } = this.config;

		try {
			const response: any = await axios({
				method: 'get',
				url: `${endpoints.paymentVerification}/${reference}`,
				headers: {
					authorization: `Bearer ${secretKey}`,
				},
			});
			const { data } = response.data;
			data['amount'] = data.amount / 100;
			return data;
		} catch (error) {
			throw error;
		}
	}
}
