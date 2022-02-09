export interface VerifyAccountNumberInput {
	accountNumber: string;
	bankCode: string;
}

export interface IConfig {
	vendor: string;
}
export interface IConfiguration {
	setConfig(config: IConfig);
}

export interface IVerifiedAccountNumber {
	accountName: string;
	accountNumber: string;
}
export interface IAccountNumberVerification {
	verifyAccountNumber(
		input: VerifyAccountNumberInput,
	): Promise<IVerifiedAccountNumber>;
}
