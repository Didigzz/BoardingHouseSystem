import { Boarder } from '../entities/boarder.entity';

export interface BoarderFilters {
  isActive?: boolean;
  search?: string;
  roomId?: string;
}

export interface BoarderStats {
  total: number;
  active: number;
  inactive: number;
}

/**
 * Boarder Repository Interface
 * Defines the contract for boarder data access
 */
export interface IBoarderRepository {
  findById(id: string): Promise<Boarder | null>;
  findByAccessCode(accessCode: string): Promise<Boarder | null>;
  findAll(filters?: BoarderFilters): Promise<Boarder[]>;
  save(boarder: Boarder): Promise<Boarder>;
  delete(id: string): Promise<void>;
  getStats(): Promise<BoarderStats>;
  existsByEmail(email: string, excludeId?: string): Promise<boolean>;
}