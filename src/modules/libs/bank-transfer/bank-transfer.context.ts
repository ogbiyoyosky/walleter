import { IBankTransfer, InitiatedBankTransfer, InitiateSingleBankTransferInput } from "./interfaces/bank-transfer.inteface";

export class BankTransferContext {
    public strategy: IBankTransfer;
    public config;

    constructor(config: any) {
        this.config = config;
    }

    public setStrategy(strategy: IBankTransfer) {
        this.strategy = strategy;
    }

    public async initiateSingleTransfer(input: InitiateSingleBankTransferInput): Promise<InitiatedBankTransfer> {
        if (!this.config) {
            throw new Error("Vendor config not set");
        }

        return await this.strategy.initiateSingleTransfer(input);
    }
}