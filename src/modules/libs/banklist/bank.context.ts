import { InternalServerErrorException } from '@nestjs/common';
import { IBank, IBankList } from './interfaces/bankList.inteface';

export class BankListContext {
	public strategy: IBankList;

	public config;

	constructor(config: any) {
		this.config = config;
	}

	public setStrategy(strategy: IBankList) {
		this.strategy = strategy;
	}

	public async fetchBankList(): Promise<IBank[]> {
		if (!this.config) {
			const errorMessage = 'Vendor config not set';
			throw new InternalServerErrorException(new Error(errorMessage), errorMessage);
		}

		return this.strategy.fetchBankList();
	}
}
