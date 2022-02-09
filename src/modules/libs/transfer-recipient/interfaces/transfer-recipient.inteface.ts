import { PaymentGateway } from "../../../../shared/enums/payment-gateways.enum";

export interface ITransferRecipient {
    createRecipient(input: CreateTransferRecipientInput): Promise<CreatedTransferRecipient>;
}

export interface IConfiguration {
    setConfig(config: IConfig);
}

export interface CreatedTransferRecipient {
    accountName: string;
    accountNumber: string;
    bankCode: string;
    bankName?: string;
    recipientCode: string;
}

export interface CreateTransferRecipientInput {
    accountName: string;
    accountNumber: string;
    bankCode: string;
    currency?: string;
}

export interface IConfig {
    vendor: PaymentGateway;
}
