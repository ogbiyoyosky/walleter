import { ConflictException, Injectable } from '@nestjs/common';
import { Wallet } from 'src/modules/wallet/entities/wallet.entity';
import { WalletService } from 'src/modules/wallet/services/wallet/wallet.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UserFactory } from '../../factories/user.factor';
import { UserService } from '../user/user.service';

@Injectable()
export class CreateUserService {
    constructor(
        private readonly userService: UserService, private readonly  walletService: WalletService
        ){}
    public async execute(data: CreateUserDto) {
        if (await this.isExistingUserName(data.email)) throw new ConflictException("Email already exist");
        let wallet = new Wallet()
        const newWallet =await this.walletService.save(wallet)

        const userAttribute = UserFactory.createNew(data)
        userAttribute.wallet = newWallet

        return await this.userService.save(userAttribute)
    }


    private async isExistingUserName(email: string): Promise<boolean> {
        const user = await this.userService.findByEmail(email);

        return user ? true : false;
    }
}
