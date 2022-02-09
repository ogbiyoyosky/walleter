import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import ObjectLiteral from '../../../shared/interfaces/object-literal.interface';
import { SuccessResponse } from '../../../shared/utils/response.utils';
import { RefillWalletDto, WalletWithdrawalDto } from '../dto/wallet.dto';
import { WalletService } from '../services/wallet/wallet.service';

@Controller('/api/wallets')
export class WalletController {
    constructor(
        private readonly walletService: WalletService,
    ){}

    @Post('refill')
    @UseGuards(AuthGuard)
    @HttpCode(200)
    public async initiatWalletRefill(
        @Body() data: RefillWalletDto,
        @Req() req: ObjectLiteral,
    ) {
        const result = await this.walletService.initiateRefill(data, { currentUser: req.user });
        return SuccessResponse("Refill initiated successfully", result);
    }

    @Post('withdraw')
    @UseGuards(AuthGuard)
    @HttpCode(200)
    public async withdraw(
        @Body() data: WalletWithdrawalDto,
        @Req() req: ObjectLiteral,
    ) {
        const wallet = await this.walletService.withdraw(data, { currentUser: req.user });
        return SuccessResponse("Withdrawal was queued successfully", wallet);
    }
}
