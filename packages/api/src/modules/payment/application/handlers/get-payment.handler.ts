import { GetPaymentQuery } from '../queries/get-payment.query';
import { Payment } from '../../domain/entities/payment.entity';
import { IPaymentRepository } from '../../domain/repositories/payment.repository.interface';

export class GetPaymentHandler {
  constructor(private paymentRepository: IPaymentRepository) {}

  async handle(query: GetPaymentQuery): Promise<Payment | null> {
    return await this.paymentRepository.findById(query.id);
  }
}