import { PaymentGateway } from "../../../../shared/enums/payment-gateways.enum";

export interface ICardPayment {
	initiateCardPayment(data): Promise<InitiatedCardPayment>;
	verifyPayment(reference: string): Promise<any>;
}

export interface IConfig {
	vendor: PaymentGateway;
}

export interface IConfiguration {
	setConfig(config: IConfig);
}

export interface InitiatedCardPayment {
	authorizationUrl: string;
	reference: string;
	accessCode?: string;
}
