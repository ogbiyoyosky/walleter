import { BankTransferStatusVerification, IBankTransfer, InitiatedBankTransfer, InitiateSingleBankTransferInput } from "../interfaces/bank-transfer.inteface"
import axios from "axios";
import { BadRequestException, HttpStatus } from "@nestjs/common";
import * as _ from 'lodash';

export class PaystackBankTransfer implements IBankTransfer {
    private config;
    constructor(config) {
        this.config = config
    }

    async initiateSingleTransfer(input: InitiateSingleBankTransferInput): Promise<InitiatedBankTransfer> {
        const { secretKey, endpoints } = this.config;

        try {
            const response: any = await axios({
                method: 'post',
                url: endpoints['initiateSingleBankTransfer'],
                headers: {
                    'authorization': `Bearer ${secretKey}`,
                },
                data: {
                    source: input.source || 'balance',
                    reason: input.reason,
                    amount: input.amount * 100,
                    recipient: input.recipientCode,
                    reference: input.reference,
                }
            });

            const { data } = response.data;
            return {
                amount: data.amount,
                fee: data.fee || 0,
                currency: data,
                source: data.source,
                reason: data.reason,
                status: data.status,
                vendorReference: data.reference,
                transferReference: data.reference,
                createdAt: data.createdAt,
            };
        } catch (error) {
            throw new BadRequestException(error.response?.data?.message || "Unable to initiate a transfer");
        }
    }

    verifyTransferStatus(transferReference: string): Promise<BankTransferStatusVerification> {
        throw new Error("Method not implemented.");
    }
}
