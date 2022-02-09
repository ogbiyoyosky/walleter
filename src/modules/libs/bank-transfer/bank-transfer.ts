import { BankTransferContext } from "./bank-transfer.context"
import { InitiateSingleBankTransferInput, InitiatedBankTransfer, IConfig, IConfiguration, IBankTransfer, BankTransferStatusVerification } from "./interfaces/bank-transfer.inteface"
import vendors from './index'
import configs from '../../../config/configuration';

const { paymentGatewayConfigs } = configs();

class BankTransfer implements IBankTransfer, IConfiguration {
    config: IConfig;
    public setConfig(config: IConfig) {
        this.config = config;
    }

    public getConfig() {
        return this.config;
    }

    public async initiateSingleTransfer(input: InitiateSingleBankTransferInput): Promise<InitiatedBankTransfer> {
        const context = new BankTransferContext(this.config);
        const selectedVendorImplementation = vendors[this.config.vendor];
        context.setStrategy(new selectedVendorImplementation(paymentGatewayConfigs[this.config.vendor]));
        return context.initiateSingleTransfer(input);
    }

    public async verifyTransferStatus(transferReference: string): Promise<BankTransferStatusVerification> {
        return
    }
}
export default BankTransfer;