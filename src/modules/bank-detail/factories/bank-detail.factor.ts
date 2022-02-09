import { BankDetail } from "../entities/bank-detail.entity";
import { CreateBankDetailData } from "../interfaces/bank-detail.interface";

export class BankDetailFactory {
    static createNew(data: CreateBankDetailData): BankDetail {
        const bankDetail = new BankDetail();

        for (const [key, value] of Object.entries(data)) {
            bankDetail[key] = value;
        }

        return bankDetail;
    }
} 