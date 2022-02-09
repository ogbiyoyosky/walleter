export interface IBankTransfer {
    initiateSingleTransfer(input: InitiateSingleBankTransferInput): Promise<InitiatedBankTransfer>;
    verifyTransferStatus(transferReference: string): Promise<BankTransferStatusVerification>;
}

export interface IConfiguration {
    setConfig(config: IConfig);
}

export interface InitiatedBankTransfer {
    amount: number;
    fee?: number;
    currency: string;
    source?: string;
    reason: string;
    status: string;
    vendorReference: string;
    transferReference: string;
    createdAt: Date;
}

export interface BankTransferStatusVerification {
    amount: number;
    currency: string;
    source: string;
    reason: string;
    status: string;
    transferReference: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface TransferRecipient {
    status: string;
}

export interface TransferStatusVerification {
    accountName: string;
    accountNumber: string;
    bankCode: string;
    reference: string;
    vendorId?: string;
}

export interface CreateTransferRecipientInput {
    accountName: string;
    accountNumber: string;
    bankCode: string;
}

export interface InitiateSingleBankTransferInput {
    accountNumber?: string;
    bankCode?: string;
    recipientCode?: string;
    amount: number;
    currency?: string;
    reason?: string;
    /**
     * 
     * The source on client's vendor account from which the transfer will be made.
     * This field is optional since most vendors have a default. For example, Paystack
     * makes a deduction from the client's `balance`
     * 
     */
    source?: string;
    /** A unique custom reference for this transfer  */
    reference?: string;
}

export interface InitiateBulkBankTransferInput {
    accountName?: string;
    accountNumber?: string;
    bankCode?: string;
    recipient?: string;
    amount: number;
    currency?: string;
    /** A unique custom reference for this transfer  */
    reference?: string;
    vendorId: string;
}

export interface IConfig {
    vendor: string;
}