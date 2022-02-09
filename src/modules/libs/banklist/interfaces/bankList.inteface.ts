export interface IBank {
	id: number;
	name: string;
	code: string;
}
export interface IBankList {
	fetchBankList(): Promise<IBank[]>;
}

export interface IConfig {
	vendor: string;
}

export interface IConfiguration {
	setConfig(config: IConfig);
}
