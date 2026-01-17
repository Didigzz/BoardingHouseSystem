import { MarkPaymentPaidCommand } from '../commands/mark-payment-paid.command';
import { Payment } from '../../domain/entities/payment.entity';
import { IPaymentRepository } from '../../domain/repositories/payment.repository.interface';
import { PaymentService } from '../../domain/services/payment.service';

export class MarkPaymentPaidHandler {
  constructor(
    private paymentRepository: IPaymentRepository,
    private paymentService: PaymentService
  ) {}

  async handle(command: MarkPaymentPaidCommand): Promise<Payment> {
    // Find payment
    const payment = await this.paymentRepository.findById(command.id);
    if (!payment) {
      throw new Error(`Payment with id ${command.id} not found`);
    }

    // Check if payment can be marked as paid
    const canMarkAsPaid = await this.paymentService.canMarkAsPaid(command.id);
    if (!canMarkAsPaid) {
      throw new Error('Payment cannot be marked as paid');
    }

    // Mark as paid
    payment.markAsPaid(command.paidDate);

    // Save payment
    return await this.paymentRepository.save(payment);
  }
}