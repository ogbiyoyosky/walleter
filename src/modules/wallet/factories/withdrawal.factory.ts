import { Withdrawal } from "../entities/withdrawal.entity";
import { CreateWithdrawalData } from "../interfaces/wallet.interface";

export class WithdrawalFactory {
    static createNew(data: CreateWithdrawalData): Withdrawal {
        const withdrawal = new Withdrawal();

        for (const [key, value] of Object.entries(data)) {
            withdrawal[key] = value;
        }

        return withdrawal;
    }
} 