import axios from 'axios';
import { IBankList } from '../interfaces/bankList.inteface';

export class PaystackBankList implements IBankList {
	private config;

	constructor(config) {
		this.config = config;
	}

	public async fetchBankList(): Promise<any> {
		const { secretKey, endpoints } = this.config;
		try {
			const response: any = await axios({
				method: 'get',
				url: endpoints.bankList,
				headers: {
					authorization: `Bearer ${secretKey}`,
				},
			});
			const { data } = response.data;
			const banks = data.map(({ id, name, code }) => ({ id, name, code }));
			return Promise.resolve(banks);
		} catch (error) {
			throw error;
		}
	}
}
