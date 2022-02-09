import { Body, Controller, Delete, forwardRef, Get, Inject, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../shared/guards/auth.guard';
import { CreateBankDetailDto, ResolveAccountNumberDto } from '../dto/bank-detail.dto';
import { BankDetailService } from '../services/bank-detail-service/bank-detail.service';
import { CreateBankDetailService } from '../services/create-bank-detail-service/create-bank-detail.service';

@Controller('api/bank-details')
export class BankDetailController {
  constructor(
    @Inject(forwardRef(() => BankDetailService)) private readonly bankDetailService: BankDetailService,
    @Inject(forwardRef(() => CreateBankDetailService)) private readonly createbankDetailService: CreateBankDetailService,
  ) {}

  @Post('resolve')
  @UseGuards(AuthGuard)
  async resolveAccountNumber(
    @Body() body: ResolveAccountNumberDto,
  ) {
    const resolvedAccountNumber = await this.bankDetailService.resolveAccountNumber(body);

    return {
      status: 'success',
      message: 'Account detail was resolved successfully',
      data: resolvedAccountNumber,
    }
  }
  
  @Post()
  @UseGuards(AuthGuard)
  async createBankDetail(
    @Req() req: any,
    @Body() body: CreateBankDetailDto,
  ) {
    const bankDetail = await this.createbankDetailService.create({
      ...body,
    }, { currentUser: req.user });

    return {
      status: 'success',
      message: 'Bank detail was added successfully',
      data: bankDetail,
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async fetchBankDetails(
    @Req() req: any,
  ) {
    const bankDetail = await this.bankDetailService.find({
      currentUser: req.user,
      query: {
        userId: req.user.id,
      }
    });

    return {
      status: 'success',
      message: 'Bank detail was added successfully',
      data: bankDetail,
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async removeBankDetail(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    await this.bankDetailService.delete(id, { currentUser: req.user });

    return {
      status: 'success',
      message: 'Bank detail was removed successfully',
    }
  }
}
