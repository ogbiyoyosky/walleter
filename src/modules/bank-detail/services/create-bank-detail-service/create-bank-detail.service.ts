import { BadRequestException, forwardRef, Inject, Injectable } from "@nestjs/common";
import TransferRecipient from "../../../libs/transfer-recipient/transfer-recipient";
import { ServiceMethodOptions } from "../../../../shared/interfaces/service-method-options.interface";
import { BankDetail } from "../../entities/bank-detail.entity";
import { BankDetailFactory } from "../../factories/bank-detail.factor";
import { CreateBankDetailInput } from "../../interfaces/bank-detail.interface";
import { BankDetailService } from "../bank-detail-service/bank-detail.service";
import { PaymentGateway } from "../../../../shared/enums/payment-gateways.enum";

@Injectable()
export class CreateBankDetailService {
  constructor(
    @Inject(forwardRef(() => BankDetailService)) private readonly bankDetailService: BankDetailService,
    @Inject('TransferRecipient') private readonly transferRecipient: TransferRecipient,
  ) {
    this.transferRecipient.setConfig({ vendor: PaymentGateway.PAYSTACK });
  }

  async create(input: CreateBankDetailInput, options: ServiceMethodOptions): Promise<BankDetail> {
    const results = await this.bankDetailService.find({
      query: {
        userId: options.currentUser.id,
        accountNumber: input.accountNumber,
        bankCode: input.bankCode,
      }
    });

    const existingUserBankDetail = results[0];
    
    if (existingUserBankDetail) {
      if (existingUserBankDetail.isDeleted) {
        return this.bankDetailService.save({ ...existingUserBankDetail, isDeleted: false });
      }

      throw new BadRequestException('You already saved this account detail');
    }

    const resolvedAccountDetail = await this.bankDetailService.resolveAccountNumber({
      accountNumber: input.accountNumber,
      bankCode: input.bankCode,
    });

    const transferRecipient = await this.transferRecipient.createRecipient({
      ...input,
      accountName: resolvedAccountDetail.accountName,
    });

    let bankDetail = BankDetailFactory.createNew({
      ...input,
      accountName: resolvedAccountDetail.accountName,
      recipientCode:transferRecipient.recipientCode,
      bankName:transferRecipient.bankName,
      userId: options.currentUser.id,
    });

    return this.bankDetailService.save(bankDetail);
  }
}