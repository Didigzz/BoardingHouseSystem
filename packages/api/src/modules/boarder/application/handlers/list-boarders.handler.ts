import { ListBoardersQuery } from '../queries/list-boarders.query';
import { Boarder } from '../../domain/entities/boarder.entity';
import { IBoarderRepository, BoarderFilters } from '../../domain/repositories/boarder.repository.interface';

export class ListBoardersHandler {
  constructor(private boarderRepository: IBoarderRepository) {}

  async handle(query?: ListBoardersQuery): Promise<Boarder[]> {
    const filters: BoarderFilters = {};

    if (query?.isActive !== undefined) {
      filters.isActive = query.isActive;
    }

    if (query?.search) {
      filters.search = query.search;
    }

    if (query?.roomId) {
      filters.roomId = query.roomId;
    }

    return await this.boarderRepository.findAll(filters);
  }
}