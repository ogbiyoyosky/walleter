import { ITransferRecipient, CreatedTransferRecipient, CreateTransferRecipientInput } from "../interfaces/transfer-recipient.inteface"
import axios from "axios";
import * as _ from 'lodash';

export class PaystackTransferRecipient implements ITransferRecipient {
    private config;
    constructor(config) {
        this.config = config
    }

    /**
     * Saves a new transfer recipient on paystack. If successful, this method returns the recipient
     * code from Paystack. The recipient code will be used later to initiate a transfer to the saved bank
     * account.
     * 
     * @param { CreateTransferRecipientInput } input - An object containing an account number, account name,
     * and a bank code.
     */
    async createRecipient(input: CreateTransferRecipientInput): Promise<CreatedTransferRecipient> {
        const { secretKey, endpoints } = this.config;

        try {
            const response: any = await axios({
                method: 'post',
                url: endpoints['createTransferRecipient'],
                headers: {
                    'authorization': `Bearer ${secretKey}`,
                },
                data: {
                    type: 'nuban',
                    name: input.accountName,
                    account_number: input.accountNumber,
                    bank_code: input.bankCode,
                    currency: input.currency || 'NGN',
                }
            });

            const { data } = response.data;
            return {
                accountName: data.name,
                accountNumber: data.details.account_number,
                bankCode: data.details.bank_code,
                bankName: data.details.bank_name,
                recipientCode: data.recipient_code,
            };
        } catch (error) {
            throw error;
        }
    }
}
