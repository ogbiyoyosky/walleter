import { CardPaymentContext } from './cardPayment.context';
import {
	InitiatedCardPayment,
	ICardPayment,
	IConfig,
	IConfiguration,
} from './interfaces/CardPayment.interface';
import vendors from './index';
import configs from '../../../config/configuration';
import { Injectable } from '@nestjs/common';

const { paymentGatewayConfigs } = configs();

@Injectable()
class CardPayment implements ICardPayment, IConfiguration {
	config: IConfig;

	public setConfig(config: IConfig) {
		this.config = config;
	}

	public getConfig() {
		return this.config;
	}

	public async initiateCardPayment(requestData): Promise<InitiatedCardPayment> {
		const context = new CardPaymentContext(this.config);
		const SelectedVendorImplementation = vendors[this.config.vendor];
		context.setStrategy(new SelectedVendorImplementation(paymentGatewayConfigs[this.config.vendor]));
		return context.initiateCardPayment(requestData);
	}

	public async verifyPayment(reference: string): Promise<any> {
		const context = new CardPaymentContext(this.config);
		const SelectedVendorImplementation = vendors[this.config.vendor];
		context.setStrategy(new SelectedVendorImplementation(paymentGatewayConfigs[this.config.vendor]));
		return context.verifyPayment(reference);
	}
}
export default CardPayment;
