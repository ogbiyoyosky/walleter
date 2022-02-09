import { Controller, forwardRef, Get, Inject, Param } from "@nestjs/common";
import { PaymentService } from "../services/payment-service/payment.service";

@Controller('api/payments')
export class PaymentController {
  constructor(
    @Inject(forwardRef(() => PaymentService)) private readonly paymentService: PaymentService,
  ) {}

  @Get(':reference/verification')
  async handlePaystackWebhooks(
    @Param('reference') reference: string,
  ): Promise<any> {
    const result = await this.paymentService.verifyPayment(reference);

    return {
      status: 'success',
      message: 'Verification successful',
      data: result,
    }
  }
}
