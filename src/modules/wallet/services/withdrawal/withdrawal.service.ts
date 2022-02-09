import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ServiceMethodOptions } from "src/shared/interfaces/service-method-options.interface";
import { Repository } from "typeorm";
import { Withdrawal } from "../../entities/withdrawal.entity";
import { WithdrawalFactory } from "../../factories/withdrawal.factory";

@Injectable()
export class WithdrawalService {
    constructor(
        @InjectRepository(Withdrawal) private readonly withdrawalRepo: Repository<Withdrawal>
    ) {}

    async create(input: any): Promise<Withdrawal> {
        const withdrawal = WithdrawalFactory.createNew(input);
        await this.withdrawalRepo.save(withdrawal);
        return withdrawal;
    }

    buildFilter(query) {
        const filter = {};

        if (query.bankDetailId) {
            filter['bankDetailId'] = query.bankDetailId;
        }

        if (query.userId) {
            filter['userId'] = query.userId;
        }

        return filter;
    }

    async find(options: ServiceMethodOptions): Promise<Withdrawal[]> {
        const filter = this.buildFilter(options.query);
        return this.withdrawalRepo.find({ where: { ...filter } });
    }
}
