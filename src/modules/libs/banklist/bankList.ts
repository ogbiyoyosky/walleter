import { BankListContext } from './bank.context';
import {
	IBankList,
	IBank,
	IConfig,
	IConfiguration,
} from './interfaces/bankList.inteface';
import vendors from './index';
import configs from '../../../config/configuration';
import { Injectable } from '@nestjs/common';

const { paymentGatewayConfigs } = configs();

@Injectable()
class BankList implements IBankList, IConfiguration {
	config;

	public setConfig(config: IConfig) {
		this.config = config;
	}

	public getConfig() {
		return this.config;
	}

	public async fetchBankList(): Promise<IBank[]> {
		const context = new BankListContext(this.config);
		const SelectedVendorImplementation = vendors[this.config.vendor];
		context.setStrategy(new SelectedVendorImplementation(paymentGatewayConfigs[this.config.vendor]));
		return context.fetchBankList();
	}
}
export default BankList;
