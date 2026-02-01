// Common shared types

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type SortOrder = "asc" | "desc";
