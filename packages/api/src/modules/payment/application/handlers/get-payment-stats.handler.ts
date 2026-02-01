import { GetPaymentStatsQuery } from '../queries/get-payment-stats.query';
import { PaymentStats } from '../queries/get-payment-stats.query';
import { IPaymentRepository } from '../../domain/repositories/payment.repository.interface';

export class GetPaymentStatsHandler {
  constructor(private paymentRepository: IPaymentRepository) {}

  async handle(_query: GetPaymentStatsQuery): Promise<PaymentStats> {
    return await this.paymentRepository.getStats();
  }
}