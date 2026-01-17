import { GetBoarderStatsQuery } from '../queries/get-boarder-stats.query';
import { BoarderStats } from '../queries/get-boarder-stats.query';
import { IBoarderRepository } from '../../domain/repositories/boarder.repository.interface';

export class GetBoarderStatsHandler {
  constructor(private boarderRepository: IBoarderRepository) {}

  async handle(_query: GetBoarderStatsQuery): Promise<BoarderStats> {
    return await this.boarderRepository.getStats();
  }
}