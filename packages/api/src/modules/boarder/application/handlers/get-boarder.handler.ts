import { GetBoarderQuery } from '../queries/get-boarder.query';
import { Boarder } from '../../domain/entities/boarder.entity';
import { IBoarderRepository } from '../../domain/repositories/boarder.repository.interface';

export class GetBoarderHandler {
  constructor(private boarderRepository: IBoarderRepository) {}

  async handle(query: GetBoarderQuery): Promise<Boarder | null> {
    return await this.boarderRepository.findById(query.id);
  }
}