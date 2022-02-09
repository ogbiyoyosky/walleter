import { Module } from "@nestjs/common";
import BankList from "../libs/banklist/bankList";
import { BankController } from "./controllers/bank.controller";
import { BankService } from "./services/bank.service";

@Module({
  controllers: [BankController],
  providers: [
    BankService,
    BankController,
    {
      useClass: BankList,
      provide: 'BankList',
    }
  ],
  exports: [BankService],
})
export class BankModule {}
