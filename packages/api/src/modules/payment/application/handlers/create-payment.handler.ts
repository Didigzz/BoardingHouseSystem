import { CreatePaymentCommand } from '../commands/create-payment.command';
import { Payment } from '../../domain/entities/payment.entity';
import { PaymentType } from '../../domain/value-objects/payment-type.vo';
import { IPaymentRepository } from '../../domain/repositories/payment.repository.interface';
import { PaymentService } from '../../domain/services/payment.service';

export class CreatePaymentHandler {
  constructor(
    private paymentRepository: IPaymentRepository,
    private paymentService: PaymentService
  ) {}

  async handle(command: CreatePaymentCommand): Promise<Payment> {
    // Validate payment data
    const validation = this.paymentService.validatePaymentData(command);
    if (!validation.valid) {
      throw new Error(validation.errors.join(', '));
    }

    // Create payment entity
    const payment = Payment.create({
      boarderId: command.boarderId,
      amount: command.amount,
      type: PaymentType.fromString(command.type),
      dueDate: command.dueDate,
      description: command.description,
    });

    // Save payment
    return await this.paymentRepository.save(payment);
  }
}