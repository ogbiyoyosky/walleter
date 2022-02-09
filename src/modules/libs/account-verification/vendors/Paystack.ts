import axios from 'axios';
import { HttpStatus } from '@nestjs/common';
import {
	IVerifiedAccountNumber,
	IAccountNumberVerification,
	VerifyAccountNumberInput,
} from '../interfaces/account-verification.inteface';

export class PaystackAccountNumberVerification
	implements IAccountNumberVerification
{
	private config;

	constructor(config) {
		this.config = config;
	}

	public async verifyAccountNumber(
		input: VerifyAccountNumberInput,
	): Promise<IVerifiedAccountNumber> {
		const { secretKey, endpoints } = this.config;
		try {
			const response: any = await axios({
				method: 'get',
				url: endpoints.accountNumberVerification,
				headers: {
					authorization: `Bearer ${secretKey}`,
				},
				params: {
					account_number: input.accountNumber,
					bank_code: input.bankCode,
				},
			});

			const { data } = response.data;
			return {
				accountName: data.account_name,
				accountNumber: data.account_number,
			};
		} catch (error) {
			throw new Error('Unable to verify account number at the moment');
		}
	}
}
