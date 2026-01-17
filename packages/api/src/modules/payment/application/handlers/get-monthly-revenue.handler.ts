import { GetMonthlyRevenueQuery } from '../queries/get-monthly-revenue.query';
import { MonthlyRevenue } from '../queries/get-monthly-revenue.query';
import { IPaymentRepository } from '../../domain/repositories/payment.repository.interface';

export class GetMonthlyRevenueHandler {
  constructor(private paymentRepository: IPaymentRepository) {}

  async handle(query: GetMonthlyRevenueQuery): Promise<MonthlyRevenue> {
    const year = query.year ?? new Date().getFullYear();
    return await this.paymentRepository.getMonthlyRevenue(year);
  }
}