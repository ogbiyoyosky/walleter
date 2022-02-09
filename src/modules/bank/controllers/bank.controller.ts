import { Controller, forwardRef, Get, Inject } from "@nestjs/common";
import { SuccessResponse } from "src/shared/utils/response.utils";
import { BankService } from "../services/bank.service";

@Controller('api/banks')
export class BankController {
  constructor(
    @Inject(forwardRef(() => BankService)) private readonly bankService: BankService,
  ) {}

  @Get()
  async fetchBanks() {
    const banks = await this.bankService.fetchAll();
    return SuccessResponse('Query successful', banks);
  }
}
