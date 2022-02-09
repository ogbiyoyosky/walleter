import {
	IVerifiedAccountNumber,
	IAccountNumberVerification,
	VerifyAccountNumberInput,
} from './interfaces/account-verification.inteface';

export class AccountVerificationContext {
	public strategy: IAccountNumberVerification;

	public config;

	constructor(config: any) {
		this.config = config;
	}

	public setStrategy(strategy: IAccountNumberVerification) {
		this.strategy = strategy;
	}

	public async verifyAccountNumber(
		input: VerifyAccountNumberInput,
	): Promise<IVerifiedAccountNumber> {
		if (!this.config) {
			throw new Error('Vendor config not set');
		}

		return this.strategy.verifyAccountNumber(input);
	}
}
