export interface CreateBankDetailInput {
  accountNumber: string;
  bankCode: string;
}

export interface CreateBankDetailData {
  accountNumber: string;
  accountName: string;
  bankCode: string;
  bankName: string;
  recipientCode: string;
  userId: string;
}
