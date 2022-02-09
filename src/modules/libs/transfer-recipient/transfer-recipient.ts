import { TransferRecipientContext } from "./transfer-recipient.context"
import { CreateTransferRecipientInput, CreatedTransferRecipient, IConfig, IConfiguration, ITransferRecipient } from "./interfaces/transfer-recipient.inteface"
import vendors from './index'
import configs from '../../../config/configuration';
import { Injectable } from '@nestjs/common';

const { paymentGatewayConfigs } = configs();

@Injectable()
class TransferRecipient implements ITransferRecipient, IConfiguration {
    config: IConfig;
    public setConfig(config: IConfig) {
        this.config = config;
    }

    public getConfig() {
        return this.config;
    }

    public async createRecipient(input: CreateTransferRecipientInput): Promise<CreatedTransferRecipient> {
        const context = new TransferRecipientContext(this.config);
        const SelectedVendorImplementation = vendors[this.config.vendor];
		context.setStrategy(new SelectedVendorImplementation(paymentGatewayConfigs[this.config.vendor]));
        return context.createRecipient(input);
    }
}
export default TransferRecipient;
