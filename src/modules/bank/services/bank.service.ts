import { Inject, Injectable } from "@nestjs/common";
import BankList from "../../libs/banklist/bankList";
import { PaymentGateway } from "../../../shared/enums/payment-gateways.enum";
import { Bank } from "../interfaces/bank.interface";

@Injectable()
export class BankService {
  constructor(
    @Inject('BankList') private readonly bankList: BankList,
  ) {
    this.bankList.setConfig({ vendor: PaymentGateway.PAYSTACK });
  }

  async fetchAll(): Promise<Bank[]> {
    return this.bankList.fetchBankList();
  }
}
