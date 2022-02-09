import { Transaction } from "../entities/transaction.entity";
import { CreateTransactionData } from "../interfaces/wallet.interface";

export class TransactionFactory {
    static createNew(data: CreateTransactionData): Transaction {
        const transaction = new Transaction();

        for (const [key, value] of Object.entries(data)) {
            transaction[key] = value;
        }

        return transaction;
    }
} 