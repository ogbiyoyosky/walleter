import { AccountVerificationContext } from './account-verification.context';
import {
	IAccountNumberVerification,
	VerifyAccountNumberInput,
	IVerifiedAccountNumber,
	IConfig,
	IConfiguration,
} from './interfaces/account-verification.inteface';
import vendors from './index';
import configs from '../../../config/configuration';
import { Injectable } from '@nestjs/common';

const { paymentGatewayConfigs } = configs();

@Injectable()
class AccountNumberVerification
	implements IAccountNumberVerification, IConfiguration
{
	config: IConfig;

	public setConfig(config: IConfig) {
		this.config = config;
	}

	public getConfig() {
		return this.config;
	}

	public async verifyAccountNumber(
		input: VerifyAccountNumberInput,
	): Promise<IVerifiedAccountNumber> {
		const context = new AccountVerificationContext(this.config);
		const SelectedVendorImplementation = vendors[this.config.vendor];
		context.setStrategy(new SelectedVendorImplementation(paymentGatewayConfigs[this.config.vendor]));
		return context.verifyAccountNumber(input);
	}
}
export default AccountNumberVerification;
