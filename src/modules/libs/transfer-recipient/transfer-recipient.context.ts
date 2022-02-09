import { ITransferRecipient, CreatedTransferRecipient, CreateTransferRecipientInput } from "./interfaces/transfer-recipient.inteface";


export class TransferRecipientContext {
    public strategy: ITransferRecipient;
    public config;

    constructor(config: any) {
        this.config = config;
    }

    public setStrategy(strategy: ITransferRecipient) {
        this.strategy = strategy;
    }

    public async createRecipient(input: CreateTransferRecipientInput): Promise<CreatedTransferRecipient> {
        if (!this.config) {
            throw new Error('Vendor config not set');
        }

        return await this.strategy.createRecipient(input);
    }
}
