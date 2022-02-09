import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { BankDetail } from '../../entities/bank-detail.entity';
import { ServiceMethodOptions } from '../../../../shared/interfaces/service-method-options.interface';
import { VerifyAccountNumberInput, IVerifiedAccountNumber } from '../../../libs/account-verification/interfaces/account-verification.inteface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import AccountNumberVerification from '../../../libs/account-verification/account-verification';
import { PaymentGateway } from '../../../../shared/enums/payment-gateways.enum';

@Injectable()
export class BankDetailService {
  constructor(
    @InjectRepository(BankDetail) private readonly bankDetailRepo: Repository<BankDetail>,
    @Inject('AccountNumberVerification') private readonly accountNumberVerification: AccountNumberVerification, 
  ) {
    this.accountNumberVerification.setConfig({ vendor: PaymentGateway.PAYSTACK });
  }

  buildFilter(query) {
    const filter = {};

    if (query.userId) {
      filter['userId'] = query.userId;
    }

    if (query.bankCode) {
      filter['bankCode'] = query.bankCode;
    }

    if (query.accountNumber) {
      filter['accountNumber'] = query.accountNumber;
    }

    return filter;
  }

  async verify(id: string): Promise<BankDetail> {
    const detail = await this.findById(id);
    if (!detail) throw new NotFoundException('Bank detail not found');
    return detail;
  }

  async find(options: ServiceMethodOptions): Promise<BankDetail[]> {
    const filter = this.buildFilter(options.query);
    return this.bankDetailRepo.find({ where: { ...filter } });
  }

  async findByUserId(userId: string): Promise<BankDetail[]> {
    return this.bankDetailRepo.find({ where: { userId } });
  }

  async save(bankDetail: BankDetail): Promise<BankDetail> {
    return this.bankDetailRepo.save(bankDetail);
  }
  
  /**
   * Fetches a single bank detail document by ID. Returns `null` if no
   * matching document is found in the  database.
   * @param { string } id - The ID of a bank detail document
   */
  async findById(id: string): Promise<BankDetail> {
    return this.bankDetailRepo.findOne({ where: { id } });
  }

  async delete(id: string, options: ServiceMethodOptions): Promise<void> {
    const bankDetail = await this.bankDetailRepo.findOne({ where: { id: id, userId: options.currentUser.id } });

    if (!bankDetail || bankDetail.isDeleted) {
      throw new NotFoundException('Bank detail not found');
    }

    // check if the bank detail is associated to a withdrawal record
    // const withdrawal = await this.withdrawalService.findByBankDetailId(bankDetail.id, {
    //   pagination: { limit: 1, page: 1, }
    // });

    // if (withdrawal.total) {
    //   await this.bankDetailRepo.updateOne({ _id: id }, { isDeleted: true });
    // } else {
    //   await this.paystack.deleteTransferRecipient(bankDetail.recipientCode);
    //   await this.bankDetailRepo.deleteOne({ _id: id });
    // }
  }

  async resolveAccountNumber(input: VerifyAccountNumberInput): Promise<IVerifiedAccountNumber> {
    return this.accountNumberVerification.verifyAccountNumber(input);
  }
}
