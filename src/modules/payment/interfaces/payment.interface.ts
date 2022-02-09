import { PaymentStatus } from "../enum/payment.enum";

export interface InitiatePaymentInput {
  reference?: string;
  amount: number;
  userId: string;
  email: string;
  metadata: any;
}

export interface CreatePaymentData extends InitiatePaymentInput {}

export interface PaymentUpdateInput {
  amount?: number;
  status?: PaymentStatus;
  reference?: string;
  metadata?: any;
  message?: string;
}

export interface InitiatedPayment {
  status: PaymentStatus;
  reference: string;
  paymentUrl: string;
}

