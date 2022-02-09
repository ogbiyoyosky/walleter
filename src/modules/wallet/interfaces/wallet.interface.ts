export interface UpdateWalletBalanceInput {
    amount: number,
    remark?: string,
}


export interface CreateTransactionInput {
    amount: number;
    walletId: string;
    remark?: string;
}

export interface CreateTransactionData extends CreateTransactionInput {}

export interface CreateWithdrawalnput {
    amount: number;
    walletId: string;
    userId: string;
    bankDetailId: string;
}

export interface CreateWithdrawalData extends CreateWithdrawalnput {}
