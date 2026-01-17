import { Boarder } from '../domain/entities/boarder.entity';
import { BoarderStats } from '../../../shared/src/features/boarder-management/model/types';

export interface IBoarderApi {
  createBoarder(data: any): Promise<Boarder>;
  updateBoarder(id: string, data: any): Promise<Boarder>;
  deleteBoarder(id: string): Promise<void>;
  getBoarderById(id: string): Promise<Boarder | null>;
  listBoarders(filters?: any): Promise<Boarder[]>;
  assignRoom(boarderId: string, roomId: string | null): Promise<Boarder>;
  getBoarderStats(): Promise<BoarderStats>;
}