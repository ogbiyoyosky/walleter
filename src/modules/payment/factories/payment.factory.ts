import { Payment } from "../entities/payment.entity";
import { CreatePaymentData } from "../interfaces/payment.interface";

export class PaymentFactory {
    static createNew(data: CreatePaymentData): Payment {
        const payment = new Payment();

        for (const [key, value] of Object.entries(data)) {
            payment[key] = value;
        }

        return payment;
    }
} 